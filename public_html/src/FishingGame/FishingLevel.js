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
    this.kBG = "assets/FishingBG.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBoat = null;
    this.mFish = null;
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
    
    
    this.mBoat = new FishingBoat(this.kSpriteNames);
    var camX = this.mBoat.getXform().getXPos();
    var camY = this.mBoat.getXform().getYPos();
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        80,                        // width of camera
        [camX, camY, 1280, 960],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mSpawner = new Spawner(this.mCamera);
    this.mFish = this.mSpawner.populate(3, "Fish", this.kSpriteNames);
    this.mCloud = this.mSpawner.populate(3, "Cloud", this.kSpriteNames);
    
    
    
    
    this.mBG = new TextureObject(this.kBG, 0, 0, 100, 75);
    this.mHook = new Hook(this.kSpriteNames);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FishingLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
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
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FishingLevel.prototype.update = function () {
    this.mBoat.update();
    this.mHook.update();
    
    this.mCamera.panWith(this.mBoat.getXform(), 0.7);
    this.mCamera.update();
    //this.mCamera.clampAtBoundary(this.mBoat.getXform(), 1);
    /*
    var camX = this.mBoat.getXform().getXPos();
    var camY = this.mBoat.getXform().getYPos();
    this.mCamera.setWCCenter(camX,camY);
    */
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
    
    var i;
    for(i = 0; i< this.mFish.length; i++){
        this.mFish[i].statusCheck(this.mBG, this.mBoat);
        this.mFish[i].update();
    }
    for(i = 0; i< this.mCloud.length; i++){
        this.mCloud[i].update();
    }
};

