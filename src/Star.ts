import {
    frictionFactor,
    numberOfSparksCreatedOnImpact,
    starBounceFactor,
} from "./constants";

import { Spark } from "./Spark";

export class Star {
    private readonly context: CanvasRenderingContext2D;
    private currentFrame: number = 0;
    public cx: number;
    public cy: number;
    public radius: number;
    public vx: number;
    public vy: number;
    public readonly acceleration: number;
    private readonly sparks: Spark[];

    public constructor(context: CanvasRenderingContext2D, initialX: number, initialY: number,
                       radius: number, initialVelocity: number, angle: number,
                       acceleration: number, sparks: Spark[]) {
        this.context = context;
        this.cx = initialX;
        this.cy = initialY;
        this.radius = radius;
        this.vx = initialVelocity * Math.cos(angle);
        this.vy = -initialVelocity * Math.sin(angle);
        this.acceleration = acceleration;
        this.sparks = sparks;
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
            this.vx = -this.vx * starBounceFactor;
        }
        if (this.cx + this.radius >= this.context.canvas.width && this.vx > 0) {
            this.cx = this.context.canvas.width - this.radius;
            this.vx = -this.vx * starBounceFactor;
        }
        if (this.cy - this.radius < 0 && this.vy < 0) {
            this.cy = this.radius;
            this.vy = -this.vy * starBounceFactor;
        }
        if (this.cy + this.radius >= this.context.canvas.height && this.vy > 0) {
            this.cy = this.context.canvas.height - this.radius;
            this.vy = -this.vy * starBounceFactor;
            if (Math.abs(this.vy) < 1) {
                this.vx *= frictionFactor;
            }
            this.radius *= 0.5;
            this.createSparks();
        }
    }

    private createSparks(): void {
        for (let i: number = 0; i < numberOfSparksCreatedOnImpact; i++) {
            const sparkVelocity: number = Math.sqrt((this.vx ** 2) + (this.vy ** 2)) * 2;
            const sparkAngle: number = (Math.random() * Math.PI * 0.75) + (Math.PI * 0.25);
            const spark: Spark = new Spark(this.context, this.cx, this.cy, 1, sparkVelocity,
                                           sparkAngle, 5);
            this.sparks.push(spark);
        }
    }

    public draw(): void {
        this.context.beginPath();
        this.context.fillStyle = "#ffffff";
        this.context.shadowBlur = Math.floor(this.radius * 5);
        this.context.shadowColor = "#ffffff";
        this.context.arc(Math.floor(this.cx), Math.floor(this.cy), Math.floor(this.radius), 0,
                         Math.PI * 2);
        this.context.fill();
    }
}
