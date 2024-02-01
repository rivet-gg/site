export default function instructions(ctx: CanvasRenderingContext2D, screenSize: { w: number; h: number }) {
  ctx.save();

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.font = '500 1.5rem "Silkscreen"';
  ctx.translate(screenSize.w / 2, screenSize.h - 10);

  // ctx.fillText('[ Click to shoot ]', 0, 0);
  // ctx.fillText('[ Use mouse to conrol ship ]', 0, -40);

  ctx.restore();
}
