/*
 * @auth: Joey Guinasso
 * @file: StartScreen.js
 * @date: 11-27-15
 * @brief: Scene for when the player loads up the game
 */

/* global Scene, gEngine, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartScreen() {
    this.kBG = "assets/water.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
}
gEngine.Core.inheritPrototype(StartScreen, Scene);

StartScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBG);
};

StartScreen.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1.0, 1.0, 1.0, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 960, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mBG = new TextureObject(this.kBG, 0, 0, 512, 1024);
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(5);
    
    this.mCamera.setBackground(this.mBG);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StartScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    
    this.mMsg.setText("Welcome to Fishing");
    this.mMsg.getXform().setPosition(5, 55);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Adventure");
    this.mMsg.getXform().setPosition(5, 50);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Press <Space Bar> to");
    this.mMsg.getXform().setPosition(5, 45);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("start fishing!");
    this.mMsg.getXform().setPosition(5, 35);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
StartScreen.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
};

StartScreen.prototype.unloadScene = function() {
    var nextLevel = new FishingLevel("FishingLevel");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};
