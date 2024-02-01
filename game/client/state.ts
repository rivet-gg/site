import Player, {
  PlayerInput,
  canShootBullet,
  shootBullet,
} from '../shared/player';
import ClientGameState, { update } from './client-gamestate';
import { MAP_WIDTH, MAP_HEIGHT } from '../shared/gamestate';
import Connection, {
  createConnection,
  sendInput,
  sendShoot,
  setupListeners
} from './connection';
import debug from './display/debug';
import blackScreen from './display/black_screen';
import game from './display/game';
import ConnectionTarget, { getConnectionTarget } from './matchmaker';
import { resizeClient } from './screensize';
import ParticleSet, { PARTICLE_TIME, fromPlayer } from '../shared/particles';
import fade from '../client/display/fade';
import { clamp, delerp } from '../shared/utils';

export default interface Client {
  findingServer: boolean;
  dying: boolean;
  connectionTarget: ConnectionTarget | null;
  connection: Connection | null;

  game: ClientGameState | null;
  id: string | null;

  screenSize: { w: number; h: number };
  screenScale: number;
  /// Position in the world where the pointer. This is used to determine where the player should move.
  worldPointer: { x: number; y: number };
  lastSendInputTs: number,
  canvas: HTMLCanvasElement;
  performance: Performance;
}

export function initClient(canvas: HTMLCanvasElement): Client {
  const client: Client = {
    game: null,
    connection: null,
    connectionTarget: null,
    findingServer: false,
    dying: false,
    screenSize: { w: 0, h: 0 },
    screenScale: 0,
    // Random initial move position in case the player joins before the mouse moves
    worldPointer: { x: Math.round(Math.random() * MAP_WIDTH), y: Math.round(Math.random() * MAP_HEIGHT) },
    lastSendInputTs: 0,

    performance: window.performance,

    canvas,

    id: null
  };

  resizeClient(client);

  // TODO: Fix this
  setInterval(() => resizeClient(client), 1000);

  startClientDrawloop(client);
  createInputEventListener(client);
  window.addEventListener('resize', () => resizeClient(client));

  setup(client);

  return client;
}

export function startClientDrawloop(client: Client): () => void {
  const stopDrawLoopController = new AbortController();
  const stopSignal = stopDrawLoopController.signal;

  const loop = () => {
    if (!stopSignal.aborted) {
      if (client.connection) {
        const prevTime = client.connection.lastPhysicsUpdate ?? 0;
        const newTime = client.performance.now();
        client.connection.lastPhysicsUpdate = newTime;

        if (client.game?.running && client.id) {
          if (client.game.clientGameState.players[client.id]) {
            setPlayerInput(client, getPlayerInputForMouseLocation(client, client.worldPointer.x, client.worldPointer.y));
          }

          update(client.game, client.id, newTime - prevTime, newTime);
        }
      }

      drawScreen(client);
      requestAnimationFrame(loop);
    }
  };
  requestAnimationFrame(loop);

  return () => stopDrawLoopController.abort();
}

export async function setup(client: Client) {
  const gamemode = sessionStorage.getItem('gamemode') ?? 'default';
  sessionStorage.setItem('gamemode', gamemode);

  client.findingServer = true;
  const target = await getConnectionTarget(gamemode);
  client.connectionTarget = target;

  client.connection = createConnection(target, client.performance.now());
  setupListeners(client.connection, client, client.performance);
  client.connection.socket.connect();
}

function createInputEventListener(client: Client) {
  client.canvas.addEventListener('mousedown', async () => {
    switch (getClientState(client)) {
      // case ClientState.INITIAL:
      //   await setup(client);
      //   console.log('Connection established');
      //   break;

      // case ClientState.WAITING_RESPAWN:
      //   await respawn(client);
      //   console.log('Connection established');
      //   break;

      case ClientState.PLAYING:
        await tryShoot(client);
        break;
    }
  });
  window.addEventListener('mousemove', async ev => {
    [client.worldPointer.x, client.worldPointer.y] = convertScreenToWorld(client, ev.clientX, ev.clientY);
  });
}

// export async function respawn(client: Client) {
//   if (getClientState(client) !== ClientState.WAITING_RESPAWN) return;
//   if (!client.connection) return location.reload();

//   sendRespawn(client.connection, client);
// }

export async function setPlayerInput(client: Client, input: PlayerInput) {
  // Rate limit inputs
  let now = Date.now();
  if (now - client.lastSendInputTs < 50) {
    return;
  }
  client.lastSendInputTs = now;

  const connection = client.connection;
  const game = client.game;
  const playerId = client.id;

  if (!connection) throw new Error('Connection must be initialized before setting player input.');
  if (!game || !game.running) {
    console.log('Game not running, cancelling player input...');
    return;
  }
  if (!playerId) {
    console.log('Player ID not confirmed, cancelling player input...');
    return;
  }
  const clientPlayer = game.clientGameState.players[playerId];
  const serverPlayer = game.serverGameState.players[playerId];

  if (!clientPlayer || !serverPlayer) {
    client.dying = true;
    delete game.clientGameState.players[playerId];
    delete game.serverGameState.players[playerId];
  }

  await sendInput(connection, playerId, { ...input }, client.performance.now());
  clientPlayer.playerInput = { ...input };
  serverPlayer.playerInput = { ...input };
}

export async function tryShoot(client: Client) {
  const connection = client.connection;
  const game = client.game;
  const playerId = client.id;

  if (!connection) throw new Error('Connection must be initialized before shooting a bullet.');
  if (!game) {
    console.log('Game not initialized, cancelling player bullet...');
    return;
  }
  if (!playerId) {
    console.log('Player ID not confirmed, cancelling player bullet...');
    return;
  }

  const player = game.clientGameState.players[playerId];

  if (canShootBullet(player, game.clientGameState)) {
    const id = await sendShoot(connection, playerId, game.clientGameState.physicsTime);
    if (!id) return;

    const clientBullet = shootBullet(player, game.clientGameState);
    const serverBullet = shootBullet(player, game.serverGameState);
    if (!clientBullet || !serverBullet) return;

    clientBullet.id = id;
    serverBullet.id = id;

    game.clientGameState.bullets[clientBullet.id] = clientBullet;
    game.serverGameState.bullets[serverBullet.id] = serverBullet;
  }
}

export function drawScreen(client: Client) {
  const size = client.screenSize;
  const scale = client.screenScale;

  const ctx = client.canvas.getContext('2d');
  if (!ctx) throw new Error('Unable to get a 2d context for the target canvas');
  ctx.save();
  ctx.imageSmoothingQuality = 'low';

  const state = getClientState(client);
  const player = getThisPlayer(client);
  const particleSet = getThisParticleSet(client);

  // Game running
  if (client.game) {
    game(
      ctx,
      client.game,

      player,

      size,
      scale
    );
  }

  switch (state) {
    case ClientState.INITIAL:
      // Idling in start state
      // blackScreen(ctx, 'ASTEROIDS', size);
      break;

    case ClientState.FINDING_SERVER:
      // Requesting from matchmaker
      // blackScreen(ctx, 'Looking for server...', size);
      break;

    case ClientState.CONNECTING:
      // Connection established, waiting for init message
      // blackScreen(ctx, 'Connecting...', size);
      break;

    case ClientState.WAITING_FOR_SPAWN:
      // Socket is connected, waiting to recieve client info.
      blackScreen(ctx, 'Spawning...', size);
      break;

    case ClientState.PLAYING:
      if (!client.game || !player) throw new Error('Unreachable condition');

      // // Game running
      // game(
      //   ctx,
      //   client.game,

      //   player.id,
      //   player.score,

      //   size,
      //   scale
      // );
      break;

    case ClientState.DEAD_IN_GAME:
      if (!client.game || !client.id || !particleSet) throw new Error('Unreachable condition');

      // Dying
      // game(
      //   ctx,
      //   client.game,

      //   client.id,
      //   { asteroids: 0, players: 0 },

      //   size,
      //   scale
      // );
      // fade(ctx, { r: 0, g: 0, b: 0 }, 1 - particleSet.timeLeft / PARTICLE_TIME, size);
      break;

    case ClientState.WAITING_RESPAWN:
      // Player is dead, waiting for respawn
      // blackScreen(ctx, '[Click to spawn]', size);
      break;

    case ClientState.UNKNOWN:
      // Unknown state, reloading
      // window.location.reload();
      break;
  }


  // Overlay gradient for title
  let gradientW = 1000;
  let gradientH = 300;
  let gradientSize = 100;
  ctx.save();
  let gradient = ctx.createRadialGradient(gradientSize / 2, gradientSize / 2, 0, gradientSize / 2, gradientSize / 2, gradientSize / 2);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.translate(client.canvas.width / 2 - gradientW / 2, client.canvas.height / 2 - gradientH / 2);
  ctx.scale(gradientW / gradientSize, gradientH / gradientSize);
  ctx.fillRect(0, 0, gradientSize, gradientSize);
  ctx.restore();

  debug(ctx, client);
  ctx.restore();
}

export function getThisPlayer(client: Client): Player | undefined {
  const playerId = client.id;
  if (!playerId) return undefined;

  const player = client.game?.clientGameState.players[playerId];
  if (!player) return undefined;

  return player;
}

function getThisParticleSet(client: Client): ParticleSet | null {
  const playerId = client.id;
  if (!playerId) return null;

  const particleSet = client.game?.clientGameState.particleSets[playerId];
  if (!particleSet) return null;

  return particleSet;
}

export enum ClientState {
  INITIAL,
  FINDING_SERVER,
  CONNECTING,

  WAITING_RESPAWN,
  WAITING_FOR_SPAWN,
  PLAYING,
  DEAD_IN_GAME,

  UNKNOWN
}

export function getClientState(client: Client): ClientState {
  const findingServer = client.findingServer;
  const hasConnTarget = !!client.connectionTarget;
  const hasId = !!client.id;
  const hasGame = !!client.game;
  const playerExists = !!client.game && !!client.id && !!client.game.clientGameState.players[client.id];
  const particlesExist =
    !!client.game && !!client.id && !!client.game.clientGameState.particleSets[client.id];

  if (!findingServer) return ClientState.INITIAL;
  if (!hasConnTarget) return ClientState.FINDING_SERVER;
  if (!hasId) return ClientState.CONNECTING;

  if (playerExists) return ClientState.PLAYING;
  if (particlesExist) return ClientState.DEAD_IN_GAME;

  if (hasGame && !playerExists) return ClientState.WAITING_RESPAWN;

  return ClientState.UNKNOWN;
}

export function convertScreenToWorld(client: Client, screenX: number, screenY: number): [number, number] {
  const canvasRect = client.canvas.getBoundingClientRect();
  const canvasX = screenX - canvasRect.left;
  const canvasY = screenY - canvasRect.top;

  const worldX = canvasX / client.screenScale;
  const worldY = canvasY / client.screenScale;

  return [worldX, worldY];
}

export function getPlayerInputForMouseLocation(client: Client, worldX: number, worldY: number): PlayerInput {
  if (!client.id) return { angle: 0, speedScalar: 0 };

  const clientPlayer = client.game?.clientGameState.players[client.id];
  if (!clientPlayer) return { angle: 0, speedScalar: 0 };

  // Get direction
  const diffX = worldX - clientPlayer.posX;
  const diffY = worldY - clientPlayer.posY;
  const dist = Math.hypot(diffX, diffY);

  const speedScalar = clamp(0, delerp(100, 200, dist), 1);

  const angle = Math.atan2(diffY, diffX);

  return { angle, speedScalar };
}

