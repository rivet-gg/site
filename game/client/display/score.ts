export default function score(ctx: CanvasRenderingContext2D, score: number) {
  ctx.save();

  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = '500 3rem "Silkscreen"';
  ctx.fillText(score.toString(), 10, 10);

  ctx.restore();
}
