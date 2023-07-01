export class Utilities {
  public static font(size: number, weight = 600): string {
    return `${weight} ${size}px Silkscreen`;
  }

  public static lerp(a: number, b: number, t: number): number {
    return (b - a) * t + a;
  }
}
