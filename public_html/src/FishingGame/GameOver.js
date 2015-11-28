/*
 * @auth: Joey Guinasso
 * @file: GameOver.js
 * @date: 11-27-15
 * @brief: Scene for when the player runs out of hooks
 */

/* global Scene, gEngine, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);


GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 960],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.mMsg = new FontRenderable("Game Over");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mMsg.setText("You lose");
    this.mMsg.getXform().setPosition(10, 55);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Score Goes Here");
    this.mMsg.getXform().setPosition(10, 45);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameOver.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
};

GameOver.prototype.unloadScene = function() {
    var nextLevel = new StartScreen("Start");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};