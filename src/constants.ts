// Fixed stars (background stars)
export const fixedStarCount: number = 50;
export const fixedStarMaxSize: number = 3;
export const minDistanceBetweenFixedStars: number = 25;

// Falling stars
export const fallingStarCreationInterval: number = 60;
export const newFallingStarMinRadius: number = 10;
export const newFallingStarMaxRadius: number = 15;
export const existingFallingStarMinRadius: number = 3;
export const fallingStarInitialVelocity: number = 25;
export const fallingStarGravity: number = 0.25;
export const fallingStarBounceFactor: number = 0.45;
export const numberOfSparksCreatedOnImpact: number = 10;

// Sparks (produced by falling stars)
export const sparkPathLength: number = 3;
export const sparkGravity: number = 1.5;
export const sparkBounceFactor: number = 0.95;
export const sparkMaxVelocity: number = 60;
export const sparkLifeSpanInFrames: number = 60;

// Colors
export const skyGradientStartColor: string = "#020202";
export const skyGradientEndColor: string = "#191919";
export const starColor: string = "#FCFCFC";
export const groundColor: string = "#202020";

// Miscellaneous
export const frictionFactor: number = 0.5;
export const groundHeight: number = 100;
