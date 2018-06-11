export class Point {
    public readonly x: number;
    public readonly y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export function getDistanceBetweenPoints(point1: Point, point2: Point): number {
    return Math.sqrt(((point2.x - point1.x) ** 2) + ((point2.y - point1.y) ** 2));
}
