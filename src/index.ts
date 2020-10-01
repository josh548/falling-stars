import { Scene } from "./Scene";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
canvas.width = window.innerWidth / window.devicePixelRatio;
canvas.height = window.innerHeight / window.devicePixelRatio;

const computedWidth: number = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
const computedHeight: number = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
canvas.setAttribute("width", `${computedWidth * window.devicePixelRatio}px`);
canvas.setAttribute("height", `${computedHeight * window.devicePixelRatio}px`);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
const scene: Scene = new Scene(context);

function animate(): void {
    scene.update();
    scene.draw();
    window.requestAnimationFrame(animate);
}

animate();
