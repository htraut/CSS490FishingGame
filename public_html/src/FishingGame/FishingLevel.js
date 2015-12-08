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
    this.kBG = "assets/Background.png";
    this.kParticleTexture = "assets/particle.png";
    this.kBoat = "assets/Fisherman.png";
    this.kFish_R = "assets/Fish_R.png";
    this.kFish_R_Norm = "assets/Fish_R_Norm.png";
    this.kFish01_R = "assets/Fish01_R.png";
    this.kFish02_R = "assets/Fish02_R.png";
    this.kFish03_R = "assets/Fish03_R.png";
    this.mFishTextures = [];
    this.mSharkTextures = [];
    this.mAnglerTextures = [];
    this.mCloudTextures = [];
    this.kHook = "assets/Hook.png";
    this.kAngler_R = "assets/Angler_R.png";
    this.kAngler_R_Norm = "assets/Angler_R_Norm.png";
    this.kShark_R = "assets/Shark_R.png";
    this.kShark_R_Norm = "assets/Shark_R_Norm.png";
    this.kCloud = "assets/Cloud 3.png";
    this.kFishingLine = "assets/Line.png";
    this.kSpotlightBase = "assets/SpotlightBase.png";
    this.kSpotlight = "assets/Spotlight.png";
    this.kControlPanel = "assets/controlsPage_fishingAdventure_border.png";
    this.kBgClip = "assets/FishingGameAudio/lake_ambient_noise.mp3";
    this.kCue = "assets/FishingGameAudio/motorboat.mp3";
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
    this.mControlPanel = null;
    this.mHook = null;
    this.mFishingLine = null;
    this.mDirectLight = null;
    //this.mHooks = null;
    //Status Variables
    this.mLives = null;
    this.mScore = null;
    this.mInvuln = false;
    this.mCount = 0;
    this.mSpawnLimit = 15;
    this.mSpawnLimitAngler = 3;
    this.mSpawnLimitShark = 3;
    this.mHooked = false;
    this.mPause = true;
    this.mDrawMini = true;
    this.mLightStorage = [];
    this.mHooks = [];
    this.mSpotlightBase = null;
}
gEngine.Core.inheritPrototype(FishingLevel, Scene);

FishingLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kFishingLine);
    gEngine.Textures.loadTexture(this.kSpotlight);
    gEngine.Textures.loadTexture(this.kSpotlightBase);
    //gEngine.Textures.loadTexture(this.kBoatNorm);
    gEngine.Textures.loadTexture(this.kAngler_R);
    gEngine.Textures.loadTexture(this.kAngler_R_Norm);
    gEngine.Textures.loadTexture(this.kShark_R);
    gEngine.Textures.loadTexture(this.kShark_R_Norm);
    gEngine.Textures.loadTexture(this.kFish_R);
    gEngine.Textures.loadTexture(this.kFish_R_Norm);
    gEngine.Textures.loadTexture(this.kFish01_R);
    gEngine.Textures.loadTexture(this.kFish02_R);
    gEngine.Textures.loadTexture(this.kFish03_R);
    gEngine.Textures.loadTexture(this.kHook);
    gEngine.Textures.loadTexture(this.kCloud);
    gEngine.Textures.loadTexture(this.kSpriteNames);
    gEngine.Textures.loadTexture(this.kSpriteNames);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kBoat);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kControlPanel);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
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
        0
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mBG = new TextureObject(this.kBG, 0, -110.5, 200, 400);
    this.mControlPanel = new TextureObject(this.kControlPanel, 0, 0, 50, 50);
    
    this.mMiniCam = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        10,                        // width of camera
        [10, 610, 100, 100],         // viewport (orgX, orgY, width, height)
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
    
    this.mFishTextures.push(this.kFish_R);
    this.mFishTextures.push(this.kFish01_R);
    this.mFishTextures.push(this.kFish02_R);
    this.mFishTextures.push(this.kFish03_R);
    this.mFishTextures.push(this.kFish_R_Norm);
    
    this.mSharkTextures.push(this.kShark_R);
    this.mSharkTextures.push(this.kShark_R_Norm);
    
    this.mAnglerTextures.push(this.kAngler_R);
    this.mAnglerTextures.push(this.kAngler_R_Norm);
    
    this.mCloudTextures.push(this.kCloud);
    this.mCloudTextures.push(this.kParticleTexture);
    
    this.mSpawner = new Spawner(this.mBG, this.mCamera);
    this.mFish = this.mSpawner.populate(1, "Fish", this.mFishTextures);
    //this.mHook = this.mSpawner.populate(1, "Hook", this.kHook);
    this.mCloud = this.mSpawner.populate(5, "Cloud", this.mCloudTextures);
    this.mShark = this.mSpawner.populate(1, "Shark", this.mSharkTextures);
    this.mAngler = this.mSpawner.populate(3, "Angler", this.mAnglerTextures);
    
    this.mBoat = new FishingBoat(this.kBoat);
    this.mHook = new Hook(this.kHook);
    this.mSpotlight = new Spotlight(this.kSpotlight);
    this.mSpotlightBase = new SpotlightBase(this.kSpotlightBase);
    this.mFishingLine = new FishingLine(this.kFishingLine);
    this.mBoatSet = new FishingBoatSet();
    this.mBoatSet.addToSet(this.mBoat);
    this.mBoatSet.addToSet(this.mHook);
    this.mBoatSet.addToSet(this.mSpotlight);
    this.mBoatSet.addToSet(this.mSpotlightBase);
    this.mBoatSet.addToSet(this.mFishingLine);
    
    
    var i;
    for(i = 0; i < 3; i++){
        this.mHooks.push(new Hook(this.kHook));
    }
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 14);
    this.mMsg.setTextHeight(2);
    this.mLives = 3;
    this.mScore = 0;
    
    this.mCamera.setBackground(this.mBG);
    this.mMiniCam.setBackground(this.mBG);
    
    var i;
    for(i = 0; i < this.mAngler.length; i++){
        this.addLightToAll(this.mAngler[i].getLight());
    }
    
    this.addLightToAll(this.mBoat.getLight());
    this.addLightToAll(this.mDirectLight);
    this.mControlPanel.getRenderable().addLight(this.mDirectLight);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
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
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.0);
    for(i = 0; i< this.mHooks.length; i++){
        this.mHooks[i].draw(this.mCamera);
    }
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mMsg.draw(this.mCamera);
    
    if(this.mPause){
        this.mControlPanel.draw(this.mCamera);
    }
    
    if(!this.mDrawMini)return;
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
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
       if(this.mPause === true){
           this.mPause = false;
       }else{
           this.mPause = true;
       }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        gEngine.GameLoop.stop();
    }
    if(this.mPause === true){
        var camPos = this.mCamera.getWCCenter();
        this.mControlPanel.getXform().setPosition(camPos[0], camPos[1]);
        return;
    }   
        
    if(this.mLives <= 0) gEngine.GameLoop.stop();
    if(this.mInvuln === true && this.mCount <= 180){ //180/60 = 3 seconds
        this.mCount++;
    }else{
        this.mInvuln = false;
        this.mCount = 0;
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M)){
        if(this.mDrawMini === false){
            this.mDrawMini = true;
        }else{
            this.mDrawMini = false;
        }
    }
    
    this.checkNPCcount();
    
    this.mHook.update();
    this.mBoatSet.update(this.kCue);
    
    this.mCamera.clampAtSides(this.mBoatSet.getXform(), 0.8);
    this.mBoatSet.moveSet();
    this.mCamera.setWCCenter(this.mHook.getXform().getXPos(), this.mHook.getXform().getYPos());
    this.mCamera.update();
    this.mMiniCam.setWCCenter(this.mHook.getXform().getXPos(), this.mHook.getXform().getYPos());
    this.mMiniCam.update();
    
    var i;
    for(i = 0; i < this.mFish.length; i++){
        this.mFish[i].statusCheck(this.mBG, this.mHook);
        this.mFish[i].update();
        if(this.mFish[i].getBounces() > 2){
            this.mFish.splice(i, 1);
        }else if((this.mFish[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn && 
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
                this.mShark[i].animSpeedSix();
            }
            if(this.mShark[i].despawn(this.mBG)){
                this.mShark.splice(i, 1);
            }
        }else if((this.mShark[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked /*| Shark.eStatus.eChase*/){
            this.mShark[i].resetStatus();
            this.mShark[i].updateStatus(Fish.eStatus.eDespawn);
            this.mShark[i].animSpeedSix();
            this.sharkHooked();
        }else{
            this.mShark[i].chase(this.mBG, this.mHook);
        }
    }
    
    for(i = 0; i< this.mAngler.length; i++){
        this.mAngler[i].statusCheck(this.mBG, this.mHook);
        this.mAngler[i].update();
        if(this.mAngler[i].getBounces() > 2){
            this.mLightStorage.push(this.mAngler[i].getLight());
            this.mAngler.splice(i, 1);
        }else if((this.mAngler[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn && 
                (this.mAngler[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked){
            this.mScore += this.mAngler[i].getScore();
            this.mLightStorage.push(this.mAngler[i].getLight());
            this.mAngler.splice(i, 1);
            this.mHook.setLineLength(this.mHook.getLineLength()*1.2);
        }
    }
    
    var msg = "";
    this.updateText(msg);
    this.updateHooks();
};

FishingLevel.prototype.updateText = function (msg) {
    var textX = (this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth()/2)+ 3;
    var textY = (this.mCamera.getWCCenter()[1] - this.mCamera.getWCHeight()/2) + 3;
    this.mMsg.getXform().setPosition(textX,textY);
    msg +=  "Hooks Remaining:      " +
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

FishingLevel.prototype.updateHooks = function(){
    var textX = (this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth()/2)+ 3;
    var textY = (this.mCamera.getWCCenter()[1] - this.mCamera.getWCHeight()/2) + 3;
    var offset = 20;
    
    if(this.mLives < this.mHooks.length){
        this.mHooks.pop();
    }
    
    var i;
    for(i = 0; i < this.mHooks.length; i++){
        this.mHooks[i].getXform().setPosition(textX + offset, textY);
        offset += 2;
    }
};

FishingLevel.prototype.checkNPCcount = function(){
    var batch = null;
    var i = 0;
    
    if(this.mFish.length < (this.mSpawnLimit)){
        var amount = this.mSpawnLimit - this.mFish.length;
        batch = this.mSpawner.populate(amount, "Fish", this.mFishTextures);
        for(i = 0; i < batch.length; i++){
            this.mFish.push(batch[i]);
            this.addAllLightsTo(batch[i].getRenderable());
        }
    }
    
    if(this.mShark.length < this.mSpawnLimitShark){
        var amount = this.mSpawnLimitShark - this.mShark.length;
        batch = this.mSpawner.populate(amount, "Shark", this.mSharkTextures);
        for(i = 0; i < batch.length; i++){
            this.mShark.push(batch[i]);
            this.addAllLightsTo(batch[i].getRenderable());
        }
    }
    
    if(this.mAngler.length < this.mSpawnLimitAngler){
        var amount = this.mSpawnLimitAngler - this.mAngler.length;
        batch = this.mSpawner.populate(amount, "Angler", this.mAnglerTextures);
        for(i = 0; i < batch.length; i++){
            batch[i].setLight(this.mLightStorage.pop());
            this.mAngler.push(batch[i]);
            this.addAllLightsTo(batch[i].getRenderable());
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
            this.mLightStorage.push(this.mAngler[i].getLight());
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

// adds the light to everything except the clouds
FishingLevel.prototype.addLightToAll = function (light){

    this.mBG.getRenderable().addLight(light);
    
    var j;
    
    for(j = 0; j < this.mAngler.length; j++){
        this.mAngler[j].getRenderable().addLight(light);
    }
    
    for(j = 0; j < this.mBoatSet.size(); j++){
        this.mBoatSet.getMember(j).getRenderable().addLight(light);
    }
        
    for(j = 0; j < this.mShark.length; j++){
        this.mShark[j].getRenderable().addLight(light);
    }
        
    for(j = 0; j < this.mFish.length; j++){
        this.mFish[j].getRenderable().addLight(light);
    }
    
    for(j = 0; j < this.mCloud.length; j++){
        this.mCloud[j].getRenderable().addLight(light);
    }
    
    for(j = 0; j < this.mHooks.length; j++){
        this.mHooks[j].getRenderable().addLight(light);
    }
};

FishingLevel.prototype.addAllLightsTo = function(renderable){
    var j;
    
    for(j = 0; j < this.mAngler.length; j++){
        renderable.addLight(this.mAngler[j].getLight());
    }
    renderable.addLight(this.mBoat.getLight());
    renderable.addLight(this.mDirectLight);
    
};
