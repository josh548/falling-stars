import { Scene } from "./Scene";

const canvas: HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const scene: Scene = new Scene(context);

function animate(): void {
    scene.update();
    scene.draw();
    window.requestAnimationFrame(animate);
}

animate();
