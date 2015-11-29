/*
 * @auth: Joey Guinasso
 * @file: FishingLevel.js
 * @date: 11-27-15
 * @brief: Scene for gameplay
 */

/* global Scene, gEngine, vec2, Fish */

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
    this.mShark = null;
    this.mCloud = null;
    this.mSpawner = null;
    this.mBG = null;
    this.mHook = null;
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
    gEngine.DefaultResources.setGlobalAmbientColor([1.0, 1.0, 1.0, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 960],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mBoat = new FishingBoat(this.kSpriteNames);
    
    this.mSpawner = new Spawner(this.mCamera);
    this.mFish = this.mSpawner.populate(3, "Fish", this.kSpriteNames);
    this.mCloud = this.mSpawner.populate(3, "Cloud", this.kSpriteNames);
    this.mShark = this.mSpawner.populate(3, "Shark", this.kSpriteNames);
    
    
    
    
    this.mBG = new TextureObject(this.kBG, 0, 0, 100, 75);
    this.mHook = new Hook(this.kSpriteNames);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FishingLevel.prototype.draw = function () {
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mBoat.draw(this.mCamera);
    this.mHook.draw(this.mCamera);
    var i;
    for(i = 0; i< this.mFish.length; i++){
        this.mFish[i].draw(this.mCamera);
    }
    for(i = 0; i< this.mCloud.length; i++){
        this.mCloud[i].draw(this.mCamera);
    }
    for(i = 0; i< this.mShark.length; i++){
        this.mShark[i].draw(this.mCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FishingLevel.prototype.update = function () {
    this.mBoat.update();
    this.mHook.update(this.mBoat);
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
    
    var i;
    for(i = 0; i < this.mFish.length; i++){
        this.mFish[i].statusCheck(this.mBG, this.mHook);
        this.mFish[i].update();
        if((this.mFish[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            this.mFish.splice(i, 1);
        }
    }
    for(i = 0; i < this.mCloud.length; i++){
        this.mCloud[i].update();
    }
    for(i = 0; i< this.mShark.length; i++){
        if(this.mShark[i].getStatus !== Shark.eStatus.eChase){
            this.mShark[i].statusCheck(this.mBG, this.mBoat);
        }
        this.mShark[i].chase(this.mHook);
        this.mShark[i].update();
    }
};

