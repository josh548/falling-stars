import { Spark } from "./Spark";
import { Star } from "./Star";

import {
    minimumDistanceBetweenFixedStars,
    numberOfFixedStars,
    sparkLifeSpanInFrames,
    starCreationIntervalInFrames,
    starGravity,
    starInitialVelocity,
} from "./constants";

import {
    getDistanceBetweenPoints,
    Point,
} from "./Point";

export class Scene {
    private readonly context: CanvasRenderingContext2D;
    private currentFrame: number = 0;
    private readonly fixedStars: Star[] = [];
    private readonly sparks: Spark[] = [];
    private fallingStars: Star[] = [];

    public constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.createFixedStars();
    }

    private createFixedStars(): void {
        const fixedStarPoints: Point[] = [];
        while (fixedStarPoints.length < numberOfFixedStars) {
            const randomPoint: Point = new Point(
                Math.floor(Math.random() * this.context.canvas.width),
                Math.floor(Math.random() * this.context.canvas.height),
            );
            let addPoint: boolean = true;
            for (const point of fixedStarPoints) {
                if (getDistanceBetweenPoints(point, randomPoint) <
                        minimumDistanceBetweenFixedStars) {
                    addPoint = false;
                    break;
                }
            }
            if (addPoint) {
                fixedStarPoints.push(randomPoint);
            }
        }

        for (const point of fixedStarPoints) {
            const randomRadius: number =
                Math.floor(Math.random() * (Math.min(this.context.canvas.width,
                                                     this.context.canvas.height) / 200));
            this.fixedStars.push(
                new Star(this.context, point.x, point.y, randomRadius, 0, 0, 0, this.sparks),
            );
        }
    }

    public update(): void {
        this.currentFrame++;
        if (this.currentFrame % starCreationIntervalInFrames === 0) {
            this.fallingStars.push(this.createFallingStar());
        }

        for (const star of this.fixedStars) {
            star.update();
        }
        for (const star of this.fallingStars) {
            star.update();
        }
        for (const spark of this.sparks) {
            spark.update();
        }

        // Remove falling stars that have become too small
        const minimumRadius: number =
            (Math.min(this.context.canvas.width, this.context.canvas.height) / 200);
        this.fallingStars = this.fallingStars.filter((star: Star) => star.radius > minimumRadius);

        // Remove sparks that are too old
        while (true) {
            let removedSpark: boolean = false;
            for (let i: number = 0; i < this.sparks.length; i++) {
                if (this.sparks[i].currentFrame > sparkLifeSpanInFrames) {
                    this.sparks.splice(i, 1);
                    removedSpark = true;
                    break;
                }
            }
            if (!removedSpark) {
                break;
            }
        }
    }

    private createFallingStar(): Star {
        const randomX: number = Math.floor(Math.random() * this.context.canvas.width);
        const randomY: number = -Math.floor(Math.random() * (this.context.canvas.height / 4));
        const minRadius: number =
            Math.min(this.context.canvas.width, this.context.canvas.height) / 50;
        // Generate an angle between 17pi/12 and 19pi/12
        const randomAngle: number = (Math.PI * (17 / 12)) + (Math.random() * (Math.PI / 6));

        return new Star(this.context, randomX, randomY, minRadius, starInitialVelocity, randomAngle,
                        starGravity, this.sparks);
    }

    public draw(): void {
        this.context.fillStyle = "#0f0f0f";
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = "#f0f0f0";
        for (const star of this.fixedStars) {
            star.draw();
        }
        for (const star of this.fallingStars) {
            star.draw();
        }
        for (const spark of this.sparks) {
            spark.draw();
        }
    }
}
