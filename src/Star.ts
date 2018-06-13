import {
    fallingStarBounceFactor,
    frictionFactor,
    groundHeight,
    numberOfSparksCreatedOnImpact,
    sparkGravity,
    starColor,
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
    private readonly acceleration: number;
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
            this.vx = -this.vx * fallingStarBounceFactor;
        }
        if (this.cx + this.radius >= this.context.canvas.width && this.vx > 0) {
            this.cx = this.context.canvas.width - this.radius;
            this.vx = -this.vx * fallingStarBounceFactor;
        }
        if (this.cy - this.radius < 0 && this.vy < 0) {
            this.cy = this.radius;
            this.vy = -this.vy * fallingStarBounceFactor;
        }
        if (this.cy + this.radius >= (this.context.canvas.height - groundHeight) && this.vy > 0) {
            this.cy = (this.context.canvas.height - groundHeight) - this.radius;
            this.vy = -this.vy * fallingStarBounceFactor;
            if (Math.abs(this.vy) < 1) {
                this.vx *= frictionFactor;
            }
            this.radius *= 0.5;
            this.createSparks();
        }
    }

    private createSparks(): void {
        for (let i: number = 0; i < numberOfSparksCreatedOnImpact; i++) {
            const starVelocity: number = Math.sqrt((this.vx ** 2) + (this.vy ** 2));
            const sparkVelocity: number = starVelocity + (Math.random() * starVelocity * 1.5);
            const sparkAngle: number = (Math.random() * Math.PI * 0.5) + (Math.PI * 0.25);
            const spark: Spark = new Spark(this.context, this.cx, this.cy, 1, sparkVelocity,
                                           sparkAngle, sparkGravity);
            this.sparks.push(spark);
        }
    }

    public draw(): void {
        this.context.beginPath();
        this.context.fillStyle = starColor;
        this.context.shadowBlur = Math.round(this.radius * ((Math.random() * 2) + 1));
        this.context.shadowColor = starColor;
        this.context.arc(Math.floor(this.cx), Math.floor(this.cy), Math.floor(this.radius), 0,
                         Math.PI * 2);
        this.context.fill();
    }
}
