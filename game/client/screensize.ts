import Client from './state';
import { MAP_WIDTH, MAP_HEIGHT } from '../shared/gamestate';

function getZoomValue(): number {
  return (window.outerWidth - 10) / window.innerWidth;
}

export function getPixelScalar(): number {
  return 1;
  // if (IS_SAFARI) return getZoomValue() * window.devicePixelRatio;
  // else return window.devicePixelRatio;
}

export function resizeClient(client: Client) {
  if (client.shutdown) return;

  let canvasParent = client.canvas.parentElement
  if (!canvasParent) {
    console.warn("No canvas parent");
    return;
  }
  const parentRect = canvasParent.getBoundingClientRect();

  // Fit canvas witin parent with map size's ratio
  const scale = Math.min(parentRect.width * getPixelScalar() / MAP_WIDTH, parentRect.height * getPixelScalar() / MAP_HEIGHT);
  const canvasWidth = Math.floor(MAP_WIDTH * scale);
  const canvasHeight = Math.floor(MAP_HEIGHT * scale);

  // Skip if already the same size
  if (canvasWidth === client.canvas.width && canvasHeight === client.canvas.height) return;

  client.canvas.width = canvasWidth;
  client.canvas.height = canvasHeight;

  client.screenSize.w = canvasWidth;
  client.screenSize.h = canvasHeight;

  client.screenScale = scale;
}
