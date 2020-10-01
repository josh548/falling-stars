import { Point } from "./Point";

import {
    frictionFactor,
    groundHeight,
    sparkBounceFactor,
    sparkLifeSpanInFrames,
    sparkPathLength,
} from "./constants";

export class Spark {
    private readonly context: CanvasRenderingContext2D;
    public currentFrame = 0;
    public cx: number;
    public cy: number;
    public radius: number;
    public vx: number;
    public vy: number;
    private readonly acceleration: number;
    private path: Point[] = [];

    public constructor(context: CanvasRenderingContext2D, initialX: number, initialY: number,
                       radius: number, initialVelocity: number, angle: number,
                       acceleration: number) {
        this.context = context;
        this.cx = initialX;
        this.cy = initialY;
        this.radius = radius;
        this.vx = initialVelocity * Math.cos(angle);
        this.vy = -initialVelocity * Math.sin(angle);
        this.acceleration = acceleration;
    }

    public update(): void {
        this.currentFrame++;
        if (this.currentFrame > 1) {
            this.vy += this.acceleration;
            this.cx += this.vx;
            this.cy += this.vy;
            this.detectCollision();
        }
    }

    private detectCollision(): void {
        if (this.cx - this.radius < 0 && this.vx < 0) {
            this.cx = this.radius;
            this.vx = -this.vx * sparkBounceFactor;
        }
        if (this.cx + this.radius >= this.context.canvas.width && this.vx > 0) {
            this.cx = this.context.canvas.width - this.radius;
            this.vx = -this.vx * sparkBounceFactor;
        }
        if (this.cy - this.radius < 0 && this.vy < 0) {
            this.cy = this.radius;
            this.vy = -this.vy * sparkBounceFactor;
        }
        if (this.cy + this.radius >= (this.context.canvas.height - groundHeight) && this.vy > 0) {
            this.cy = (this.context.canvas.height - groundHeight) - this.radius;
            this.vy = -this.vy * sparkBounceFactor;
            if (Math.abs(this.vy) < 1) {
                this.vx *= frictionFactor;
            }
        }
    }

    public draw(): void {
        this.path.unshift(new Point(this.cx, this.cy));
        if (this.path.length > sparkPathLength) {
            this.path.pop();
        }

        this.context.shadowBlur = this.radius;
        this.context.shadowColor = "#ffffff";
        const baseAlpha: number =
            (sparkLifeSpanInFrames - this.currentFrame) / sparkLifeSpanInFrames;

        // Draw a glow for the first point
        this.context.beginPath();
        this.context.fillStyle = `rgba(255, 255, 255, ${baseAlpha * 0.05})`;
        this.context.arc(Math.floor(this.cx), Math.floor(this.cy), Math.floor(this.radius * 10), 0,
                         Math.PI * 2);
        this.context.fill();

        this.context.shadowBlur = 0;

        // Draw all of the points
        for (let i = 0; i < this.path.length; i++) {
            const point: Point = this.path[i];
            this.context.beginPath();
            const alpha: number = ((this.path.length - i) / this.path.length) * baseAlpha;
            this.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.context.arc(Math.floor(point.x), Math.floor(point.y), Math.floor(this.radius), 0,
                             Math.PI * 2);
            this.context.fill();
        }
    }
}
