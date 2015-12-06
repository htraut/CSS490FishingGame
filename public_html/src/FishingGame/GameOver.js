/*
 * @auth: Joey Guinasso
 * @file: GameOver.js
 * @date: 11-27-15
 * @brief: Scene for when the player runs out of hooks
 */

/* global Scene, gEngine, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    this.kBG = "assets/water.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mScore = null;
    this.mBG = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBG);
};

GameOver.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1.0, 1.0, 1.0, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 960],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mBG = new TextureObject(this.kBG, 0, 0, 512, 1024);
    
    this.mMsg = new FontRenderable("Game Over");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(5);
    
    this.mCamera.setBackground(this.mBG);
};

GameOver.prototype.loadScene = function() {
    this.mScore = gEngine.ResourceMap.retrieveAsset("score");
    gEngine.Textures.loadTexture(this.kBG);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    
    this.mMsg.setText("Game Over");
    this.mMsg.getXform().setPosition(10, 55);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("You Scored: " + this.mScore.toFixed(0));
    this.mMsg.getXform().setPosition(10, 45);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Press Space to");
    this.mMsg.getXform().setPosition(10, 35);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("play again!");
    this.mMsg.getXform().setPosition(10, 25);
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
    var nextLevel = new FishingLevel("FishingLevel");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};