import ClientGameState from '../client-gamestate';

const GRID_SIZE = 100;

export default function grid(ctx: CanvasRenderingContext2D, game: ClientGameState, screenScale: number) {
  const gameW = game.clientGameState.size.w;
  const gameH = game.clientGameState.size.h;

  ctx.save();

  // Map grid
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 2 / screenScale;
  ctx.beginPath();

  // Vertical lines
  let vertLineCount = Math.ceil(gameW / GRID_SIZE);
  let xOffset = -(game.clientGameState.size.w % GRID_SIZE) / 2;
  for (let x = 0; x < vertLineCount; x++) {
    const xVal = x * GRID_SIZE + xOffset;
    ctx.moveTo(xVal, 0);
    ctx.lineTo(xVal, gameH);
  }

  // Horizontal line
  let horLineCount = Math.ceil(gameH / GRID_SIZE);
  let yOffset = -(game.clientGameState.size.h % GRID_SIZE) / 2;
  for (let y = 1; y < horLineCount; y++) {
    let yVal = y * GRID_SIZE + yOffset;
    ctx.moveTo(0, yVal);
    ctx.lineTo(gameW, yVal);
  }

  ctx.stroke();

  // Map Bounding box
  // ctx.strokeStyle = 'white';
  // ctx.lineWidth = lineWidth;
  // ctx.strokeRect(0, 0, gameW, gameH);

  ctx.restore();
}
