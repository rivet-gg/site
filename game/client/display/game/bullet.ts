import Bullet from '../../../shared/bullet';

export default function drawBullet(ctx: CanvasRenderingContext2D, bullet: Bullet, thisPlayerId: string | undefined, screenScale: number) {
  ctx.save();
  ctx.translate(bullet.posX, bullet.posY);

  ctx.fillStyle = thisPlayerId === bullet.playerId ? 'cyan' : 'red';

  const drawSize = 2 / screenScale;

  ctx.beginPath();
  ctx.ellipse(0, 0, drawSize, drawSize, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
