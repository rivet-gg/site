import Player from '../../shared/player';
import ClientGameState from '../client-gamestate';
import Score, { calcScore, orderPlayersByScoreDesc } from '../../shared/score';

import drawGameObjects from './game/wholegame';
import grid from './grid';
import score from './score';
import scoreboard from './scoreboard';
import instructions from './instructions';

export default function game(
  ctx: CanvasRenderingContext2D,
  game: ClientGameState,

  selfPlayer: Player | undefined,

  screenSize: { w: number; h: number },
  screenScale: number
): void {
  // Save at initial state
  ctx.save();

  // Black out the screen
  ctx.fillStyle = 'rgba(9, 9, 9)';
  ctx.fillRect(0, 0, screenSize.w, screenSize.h);

  {
    // Translate the screen to center around (0, 0)
    // TODO: Center vertical
    // ctx.translate(screenSize.w / 2, screenSize.h / 2);
    ctx.scale(screenScale, screenScale);

    // Draw level-relative objects
    // grid(ctx, game, screenScale);
    drawGameObjects(ctx, game.clientGameState, selfPlayer?.id, screenScale);
  }
  // Restore to initial state
  ctx.restore();

  // scoreboard(ctx, orderPlayersByScoreDesc(game.clientGameState), screenSize);
  // if (selfPlayer) score(ctx, calcScore(selfPlayer.score));
  instructions(ctx, screenSize);
}
