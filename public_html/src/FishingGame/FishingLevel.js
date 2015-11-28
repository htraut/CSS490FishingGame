/*
 * @auth: Joey Guinasso
 * @file: FishingLevel.js
 * @date: 11-27-15
 * @brief: Scene for gameplay
 */

/* global Scene, gEngine, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishingLevel() {
    //Sprites
    this.kSpriteNames = "assets/sprite_names.png";
    this.kBG = "assets/water.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBoat = null;
    this.mFish = null;
    this.mFishSpawner = null;
    this.mBG = null;
}
gEngine.Core.inheritPrototype(FishingLevel, Scene);

FishingLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpriteNames);
    gEngine.Textures.loadTexture(this.kBG);
};

FishingLevel.prototype.unloadScene = function() {

    var nextLevel = new GameOver("GameOver");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

FishingLevel.prototype.initialize = function () {
    // set ambient lighting
    //gEngine.DefaultResources.setGlobalAmbientColor([0.2, 0.2, 0.2, 1]);
    //gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 960],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mBoat = new FishingBoat(this.kSpriteNames);
    /*
    var tempFish = new SpriteRenderable(this.kSpriteNames);
    tempFish.setColor([1, 1, 1, 0]);
    tempFish.getXform().setPosition(0, -10);
    tempFish.getXform().setSize(10, 5);
    tempFish.setElementPixelPositions(35, 90, 450, 470);*/
    
    //this.mFish = new Fish(this.kSpriteNames);
    //this.mFish.setSpeed(0.1);
    
    this.mFishSpawner = new Spawner(this.mCamera);
    this.mFish = this.mFishSpawner.populate(3, "Fish", this.kSpriteNames);
    
    
    
    
    this.mBG = new TextureObject(this.kBG, 0, 0, 100, 75);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FishingLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mBoat.draw(this.mCamera);
    var i = 0;
    for(i; i< this.mFish.length; i++){
        this.mFish[i].draw(this.mCamera);
    }
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FishingLevel.prototype.update = function () {
    this.mBoat.update();
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
    
    var i = 0;
    for(i; i< this.mFish.length; i++){
        this.mFish[i].statusCheck(this.mBG, this.mBoat);
        this.mFish[i].update();
    }
};

