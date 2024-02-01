import { ScoreboardEntry } from '../../shared/score';

export default function scoreboard(
  ctx: CanvasRenderingContext2D,
  entries: ScoreboardEntry[],
  screenSize: { w: number; h: number }
) {
  ctx.save();

  const nameOffset = -240;
  let entryY = 10;

  ctx.translate(screenSize.w - 10, 0);

  for (const { scoreNum, player } of entries) {
    ctx.font = '800 1.5rem "Silkscreen"';
    ctx.fillStyle = '#FFFFFFBD ';

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(player.name, nameOffset, entryY);

    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(scoreNum.toString(), 0, entryY);

    entryY += 20;
  }

  ctx.restore();
}
