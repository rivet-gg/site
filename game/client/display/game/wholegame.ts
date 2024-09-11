import GameState, { asteroids, bullets, particleSets, players } from '../../../shared/gamestate';

import drawAsteroid from './asteroid';
import drawBullet from './bullet';
import drawPlayer from './player';
import drawParticles from './particles';

export default function drawGameObjects(
  ctx: CanvasRenderingContext2D,
  game: GameState,
  selfId: string | undefined,
  screenScale: number
): void {
  for (const asteroid of asteroids(game)) drawAsteroid(ctx, asteroid, screenScale);
  for (const bullet of bullets(game)) drawBullet(ctx, bullet, selfId, screenScale);
  for (const player of players(game)) drawPlayer(ctx, player, player.id === selfId, screenScale);
  for (const particleSet of particleSets(game))
    drawParticles(ctx, particleSet, particleSet.playerId === selfId, screenScale);
}
