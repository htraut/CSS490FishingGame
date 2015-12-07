/*
 * @auth: Joey Guinasso
 * @file: FishingLevel.js
 * @date: 11-27-15
 * @brief: Scene for gameplay
 */

/* global Scene, gEngine, vec2, Fish, Shark, Angler, AnglerFish, Light, vec3 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishingLevel() {
    //Sprites
    this.kSpriteNames = "assets/sprite_names.png";
    this.kBG = "assets/water.png";
    this.kParticleTexture = "assets/particle.png";
    this.kBoat = "assets/Fisherman.png";
    this.kFish_R = "assets/Fish_R.png";
    this.kFish01_R = "assets/Fish01_R.png";
    this.kFish02_R = "assets/Fish02_R.png";
    this.kFish03_R = "assets/Fish03_R.png";
    this.mFishes = [];
    this.kHook = "assets/Hook.png";
    this.kAnglerUC = "assets/Angler_UC.png";
    this.kShark_R = "assets/Shark_R.png";
    this.kCloud3UC = "assets/Cloud 3.png";
    this.kFishingLine = "assets/Line.png";
    //this.kBoatNorm = "assets/Fisherman_Norm.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMiniCam = null;
    this.mMsg = null;
    this.mBoat = null;
    this.mFish = null;
    this.mBoatSet = null;
    this.mShark = null;
    this.mAngler = null;
    this.mCloud = null;
    this.mSpawner = null;
    this.mBG = null;
    this.mHook = null;
    this.mFishingLine = null;
    this.mDirectLight = null;
    //this.mHooks = null;
    //Status Variables
    this.mLives = null;
    this.mScore = null;
    this.mInvuln = false;
    this.mCount = 0;
    this.mSpawnLimit = 3;
    this.mHooked = false;
    this.mPause = false;
}
gEngine.Core.inheritPrototype(FishingLevel, Scene);

FishingLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kFishingLine);
    //gEngine.Textures.loadTexture(this.kBoatNorm);
    gEngine.Textures.loadTexture(this.kAnglerUC);
    gEngine.Textures.loadTexture(this.kShark_R);
    gEngine.Textures.loadTexture(this.kFish_R);
    gEngine.Textures.loadTexture(this.kFish01_R);
    gEngine.Textures.loadTexture(this.kFish02_R);
    gEngine.Textures.loadTexture(this.kFish03_R);
    gEngine.Textures.loadTexture(this.kHook);
    gEngine.Textures.loadTexture(this.kCloud3UC);
    gEngine.Textures.loadTexture(this.kSpriteNames);
    gEngine.Textures.loadTexture(this.kSpriteNames);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kBoat);
    gEngine.Textures.loadTexture(this.kParticleTexture);
};

FishingLevel.prototype.unloadScene = function() {
    gEngine.ResourceMap.asyncLoadRequested("score");
    gEngine.ResourceMap.asyncLoadCompleted("score", this.mScore);
    var nextLevel = new GameOver("GameOver");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

FishingLevel.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([0.3, 0.3, 0.3, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                        // width of camera
        [0, 0, 960, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mBG = new TextureObject(this.kBG, 0, -44, 200, 150);
    
    this.mMiniCam = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        10,                        // width of camera
        [20, 40, 100, 100],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mMiniCam.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mDirectLight = new Light();
    this.mDirectLight.setLightType(Light.eLightType.eDirectionalLight);
    this.mDirectLight.setColor([0.2, 0.2, 0.2, 0.2]);
    this.mDirectLight.setXPos(0);
    this.mDirectLight.setYPos(0);      
    this.mDirectLight.setZPos(0);
    var dir = vec3.fromValues(0, 0, 1);
    this.mDirectLight.setDirection(dir);
    this.mDirectLight.setNear(10);
    this.mDirectLight.setFar(20);
    this.mDirectLight.setInner(0.1);
    this.mDirectLight.setOuter(0.2);
    this.mDirectLight.setIntensity(1.0);
    this.mDirectLight.setDropOff(1.0);
    
    this.mFishes.push(this.kFish_R);
    this.mFishes.push(this.kFish01_R);
    this.mFishes.push(this.kFish02_R);
    this.mFishes.push(this.kFish03_R);
    
    this.mSpawner = new Spawner(this.mBG, this.mCamera);
    this.mFish = this.mSpawner.populate(1, "Fish", this.mFishes[0], this.mFishes[1], this.mFishes[2], this.mFishes[3]);
    this.mHook = this.mSpawner.populate(1, "Hook", this.kHook);
    this.mCloud = this.mSpawner.populate(3, "Cloud", this.kCloud3UC, null, null, null, this.kParticleTexture);
    this.mShark = this.mSpawner.populate(1, "Shark", this.kShark_R);
    this.mAngler = this.mSpawner.populate(3, "Angler", this.kAnglerUC);
    
    this.mBoat = new FishingBoat(this.kBoat);
    this.mHook = new Hook(this.kHook);
    this.mFishingLine = new FishingLine(this.kFishingLine);
    this.mBoatSet = new FishingBoatSet();
    this.mBoatSet.addToSet(this.mBoat);
    this.mBoatSet.addToSet(this.mHook);
    this.mBoatSet.addToSet(this.mFishingLine);
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 14);
    this.mMsg.setTextHeight(2);
    this.mLives = 3;
    this.mScore = 0;
    
    this.mCamera.setBackground(this.mBG);
    this.mMiniCam.setBackground(this.mBG);
    
    var i = 0;
    for(i = 0; i < this.mAngler.length; i++){
        this.mBG.getRenderable().addLight(this.mAngler[i].getLight());
    }
    this.mBG.getRenderable().addLight(this.mBoat.getLight());
    this.mBG.getRenderable().addLight(this.mDirectLight);
    this.mBoat.getRenderable().addLight(this.mDirectLight);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FishingLevel.prototype.draw = function () {
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    //this.mBoat.draw(this.mCamera);
    //this.mHook.draw(this.mCamera);
    this.mBoatSet.draw(this.mCamera);
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
    
    this.mMiniCam.setupViewProjection();
    this.mBG.draw(this.mMiniCam);
    //this.mBoat.draw(this.mMiniCam);
    //this.mHook.draw(this.mMiniCam);
    this.mBoatSet.draw(this.mMiniCam);
    var i;
    for(i = 0; i< this.mFish.length; i++){
        this.mFish[i].draw(this.mMiniCam);
    }
    for(i = 0; i< this.mCloud.length; i++){
        this.mCloud[i].draw(this.mMiniCam);
    }
    for(i = 0; i< this.mShark.length; i++){
        this.mShark[i].draw(this.mMiniCam);
    }
    
    for(i = 0; i< this.mAngler.length; i++){
        this.mAngler[i].draw(this.mMiniCam);
    }
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FishingLevel.prototype.update = function () {
    var result = vec2.create();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)){
       if(this.mPause === true){
           this.mPause = false;
       }else{
           this.mPause = true;
       }
    }
    if(this.mPause === true){return;}
        
        
    if(this.mLives <= 0) gEngine.GameLoop.stop();
    if(this.mInvuln === true && this.mCount <= 180){ //180/60 = 3 seconds
        this.mCount++;
    }else{
        this.mInvuln = false;
        this.mCount = 0;
    }
    
    this.checkNPCcount();
    
    this.mHook.update();
    this.mBoatSet.update();
    
    this.mCamera.clampAtSides(this.mBoatSet.getXform(), 0.8);
    this.mBoatSet.moveSet();
    this.mCamera.setWCCenter(this.mHook.getXform().getXPos(), this.mHook.getXform().getYPos());
    this.mCamera.update();
    this.mMiniCam.setWCCenter(this.mHook.getXform().getXPos(), this.mHook.getXform().getYPos());
    this.mMiniCam.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
    
    var i;
    for(i = 0; i < this.mFish.length; i++){
        this.mFish[i].statusCheck(this.mBG, this.mHook);
        this.mFish[i].update();
        if((this.mFish[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn && 
                (this.mFish[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            this.mScore += this.mFish[i].getScore();
            this.mFish.splice(i, 1);
        }
    }
    for(i = 0; i < this.mCloud.length; i++){
        this.mCloud[i].update();
    }
    for(i = 0; i < this.mShark.length; i++){
        if((this.mShark[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            if(this.mHook.pixelTouches(this.mShark[i], result)){
                this.sharkHooked();
            }
            if(this.mShark[i].despawn(this.mBG)){
                this.mShark.splice(i, 1);
            }
        }else if((this.mShark[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked /*| Shark.eStatus.eChase*/){
            this.mShark[i].resetStatus();
            this.mShark[i].updateStatus(Fish.eStatus.eDespawn);
            this.sharkHooked();
        }else{
            this.mShark[i].chase(this.mBG, this.mHook);
        }
    }
    
    for(i = 0; i< this.mAngler.length; i++){
        this.mAngler[i].statusCheck(this.mBG, this.mHook);
        this.mAngler[i].update();
         if((this.mAngler[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn && 
                (this.mAngler[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            this.mScore += this.mAngler[i].getScore();
            this.mAngler.splice(i, 1);
            this.mHook.setLineLength(this.mHook.getLineLength()*1.2);
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
            +/*
            "BOATX" + this.mBoat.getXform().getXPos().toFixed(4) +
            "CAM X" + this.mCamera.getWCCenter()[0].toFixed(4) + 
            "CAM Y" + this.mCamera.getWCCenter()[1].toFixed(4);
            +
            
            "Hook X: " + this.mHook.getXform().getXPos().toFixed(2) +
            " Hook Y: " + this.mHook.getXform().getYPos().toFixed(2); 
            
            "BoatSet X " + this.mBoatSet.getXform().getXPos().toFixed(2) +
            " BoatSet Y " + this.mBoatSet.getXform().getYPos().toFixed(2);
            /*
            "FishingLine X " + this.mFishingLine.getXform().getXPos().toFixed(2) +
            " FishingLine Y " + this.mFishingLine.getXform().getYPos().toFixed(2) +
            " FishingLine Height " + this.mFishingLine.getXform().getHeight().toFixed(2);
            */
            
            
    this.mMsg.setText(msg);
};

FishingLevel.prototype.checkNPCcount = function(){
    var batch = null;
    var i = 0;
    
    if(this.mFish.length < this.mSpawnLimit){
        var amount = this.mSpawnLimit - this.mFish.length;
        batch = this.mSpawner.populate(amount, "Fish", this.mFishes[0], this.mFishes[1], this.mFishes[2], this.mFishes[3]);
        for(i = 0; i < batch.length; i++){
            this.mFish.push(batch[i]);
        }
    }
    
    if(this.mShark.length < this.mSpawnLimit){
        var amount = this.mSpawnLimit - this.mShark.length;
        batch = this.mSpawner.populate(amount, "Shark", this.kShark_R);
        for(i = 0; i < batch.length; i++){
            this.mShark.push(batch[i]);
        }
    }
};

FishingLevel.prototype.clearHook = function(){
    var i = 0;
    
    for(i = 0; i < this.mFish.length; i++){
        if((this.mFish[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked){
            this.mFish.splice(i, 1);
        }
    }
    
    i = 0;
    
    for(i = 0; i < this.mAngler.length; i++){
        if((this.mAngler[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked){
            this.mAngler.splice(i, 1);
        }
    }

    var spawnPos = vec2.fromValues(this.mBoat.getXform().getXPos()-(this.mBoat.getXform().getWidth()/2), 0);
    var hook = this.mBoatSet.getMember(1);
    hook.getXform().setPosition(spawnPos[0], spawnPos[1]);
    hook.setStatus(0);
};

FishingLevel.prototype.sharkHooked = function(){
    if(!this.mInvuln){
        this.mCamera.shake(-2, -2, 20, 30);
        this.mLives -= 1;
        this.mInvuln = true;
        this.clearHook();
    }
};
