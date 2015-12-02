/*
 * @auth: Joey Guinasso
 * @file: FishingLevel.js
 * @date: 11-27-15
 * @brief: Scene for gameplay
 */

/* global Scene, gEngine, vec2, Fish, Shark, Angler, AnglerFish */

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
    this.mAngler = null;
    this.mCloud = null;
    this.mSpawner = null;
    this.mBG = null;
    this.mHook = null;
    //this.mHooks = null;
    //Status Variables
    this.mLives = null;
    this.mScore = null;
    this.mInvuln = false;
    this.mCount = 0;
    this.mSpawnLimit = 3;
    this.mHooked = false;
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
        [0, 0, 960, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mBG = new TextureObject(this.kBG, 0, 0, 200, 150);
    
    this.mSpawner = new Spawner(this.mBG, this.mCamera);
    this.mFish = this.mSpawner.populate(1, "Fish", this.kSpriteNames);
    this.mCloud = this.mSpawner.populate(3, "Cloud", this.kSpriteNames);
    this.mShark = this.mSpawner.populate(1, "Shark", this.kSpriteNames);
    this.mAngler = this.mSpawner.populate(1, "Angler", this.kSpriteNames);
    
    this.mBoat = new FishingBoat(this.kSpriteNames);
    this.mHook = new Hook(this.kSpriteNames);
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 1, 1]);
    this.mMsg.getXform().setPosition(1, 14);
    this.mMsg.setTextHeight(2);
    this.mLives = 3;
    this.mScore = 0;
    
    this.mCamera.setBackground(this.mBG);
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
    
    for(i = 0; i< this.mAngler.length; i++){
        this.mAngler[i].draw(this.mCamera);
    }
    
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FishingLevel.prototype.update = function () {
    if(this.mLives <= 0) gEngine.GameLoop.stop();
    if(this.mInvuln === true && this.mCount <= 180){ //180/60 = 3 seconds
        this.mCount++;
    }else{
        this.mInvuln = false;
        this.mCount = 0;
    }
    
    this.checkNPCcount();
    
    this.mHook.update();
    this.mBoat.update(this.mHook);
    
    
    //this.mCamera.setWCCenter(this.mHook.getXform().getXPos(), this.mHook.getXform().getYPos());
    this.mCamera.clampAtBoundary(this.mHook.getXform(), 1);
    this.mCamera.panWith(this.mHook.getXform(), 0.15);
    this.mCamera.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
    
    var i;
    for(i = 0; i < this.mFish.length; i++){
        this.mFish[i].statusCheck(this.mBG, this.mHook);
        this.mFish[i].update();
        if((this.mFish[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            this.mScore += this.mFish[i].getScore();
            this.mFish.splice(i, 1);
        }
    }
    for(i = 0; i < this.mCloud.length; i++){
        this.mCloud[i].update();
    }
    for(i = 0; i < this.mShark.length; i++){
        if((this.mShark[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            if(this.mShark[i].despawn(this.mBG)){
                this.mShark.splice(i, 1);
            }
        }else if(this.mShark[i].getStatus() === (Fish.eStatus.eHooked | Shark.eStatus.eChase)){
            this.mShark[i].resetStatus();
            this.mShark[i].updateStatus(Fish.eStatus.eDespawn);
            if(!this.mInvuln){
                this.mLives -= 1;
                this.mInvuln = true;
            }
        }else{
            this.mShark[i].chase(this.mBG, this.mHook);
        }
    }
    
    for(i = 0; i< this.mAngler.length; i++){
        this.mAngler[i].statusCheck(this.mBG, this.mHook);
        this.mAngler[i].update();
         if((this.mAngler[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            this.mScore += this.mAngler[i].getScore();
            this.mAngler.splice(i, 1);
            this.mHook.setLineLength(this.mHook.getLineLength()*1.3);
        }
    }
    
    
    var msg = "";
    this.updateText(msg);
};

FishingLevel.prototype.updateText = function (msg) {
    var textX = (this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth()/2)+ 3;
    var textY = (this.mCamera.getWCCenter()[1] - this.mCamera.getWCHeight()/2) + 3;
    this.mMsg.getXform().setPosition(textX,textY);
    msg +=  "Hooks Left: " + this.mLives +
            " Depth: " + Math.abs(this.mHook.getXform().getYPos().toFixed(0)) +
            " Score: " + this.mScore.toFixed(0);
            /*+
            "BOATX" + this.mBoat.getXform().getXPos().toFixed(0) +
            "CAM X" + this.mCamera.getWCCenter()[0].toFixed(0) + 
            "CAM Y" + this.mCamera.getWCCenter()[1].toFixed(0);
            */
    this.mMsg.setText(msg);
};

FishingLevel.prototype.checkNPCcount = function(){
    var batch = null;
    var i = 0;
    
    if(this.mFish.length < this.mSpawnLimit){
        var amount = this.mSpawnLimit - this.mFish.length;
        batch = this.mSpawner.populate(amount, "Fish", this.kSpriteNames);
        for(i = 0; i < batch.length; i++){
            this.mFish.push(batch[i]);
        }
    }
    
    if(this.mShark.length < this.mSpawnLimit){
        var amount = this.mSpawnLimit - this.mShark.length;
        batch = this.mSpawner.populate(amount, "Shark", this.kSpriteNames);
        for(i = 0; i < batch.length; i++){
            this.mShark.push(batch[i]);
        }
    }
};
