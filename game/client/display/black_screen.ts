export default function blackScreen(
  ctx: CanvasRenderingContext2D,
  main: string,
  screenSize: { w: number; h: number }
) {
  // Save at initial state
  ctx.save();

  // Black out the screen
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, screenSize.w, screenSize.h);

  // Set up text style
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.translate(screenSize.w / 2, screenSize.h - 60);

  // Draw first line to screen
  ctx.font = 'normal 2em "Silkscreen"';
  ctx.fillText(main, 0, 0);

  // Restore to initial state
  ctx.restore();
}
