/*
 * @auth: Herbert Traut
 * @file: Shark.js
 * @date: 11-28-15
 * @brief: Shark which chases fishing hook when the hook is nearby
 */


/* global GameObject, gEngine, Fish, vec2 */

'use strict';

function Shark(texture){
    
    this.mFish = new LightRenderable(texture);
    
    this.mFish.setColor([1,1,1,0]);
    
    GameObject.call(this, this.mFish);
    this.mStatus = 0;
    this.mScore = 1;
    this.mBounces = 0;
    
    var front = vec2.fromValues(1, 0);
    
    this.setCurrentFrontDir(front);
    this.mFish.getXform().setRotationInRad(0);
    this.kCycles = 30;
    this.kRate = 4.0; 
    this.mRotation = new Interpolate(this.mFish.getXform().getRotationInRad(), this.kCycles, this.kRate);
    this.mRotationFront = new InterpolateVec2(this.getCurrentFrontDir(), this.kCycles, this.kRate);
    
    this.mFish.setElementPixelPositions(0, 1024, 0, 256);
    this.mFish.setSpriteSequence(256, 0, 1024, 256, 4, 0);
    this.mFish.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mFish.setAnimationSpeed(20);
    
    this.mChaseDist = 20;
    this.mRotateRate = 0.3;
    this.mSpeed = 0.5;
    this.mInPursuit = false;
}
gEngine.Core.inheritPrototype(Shark, Fish);

Shark.eStatus = Object.freeze({
    eChase: 8
});

Shark.prototype.update = function (){
    
    var xform = this.mFish.getXform();
    if((this.mStatus & Fish.eStatus.eCollideRight) === Fish.eStatus.eCollideRight){
        this.mSpeed *= -1;
        xform.setWidth(-xform.getWidth());
        this.mStatus ^= Fish.eStatus.eCollideRight;
    }else if((this.mStatus & Fish.eStatus.eCollideLeft) === Fish.eStatus.eCollideLeft){
        this.mSpeed *= -1;
        xform.setWidth(-xform.getWidth());
        this.mStatus ^= Fish.eStatus.eCollideLeft;
    }
    
    // the following code is to keep the shark oreinted correctly 
    this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    if(this.mSpeed > 0){
        xform.setSize(Math.abs(xform.getWidth()), xform.getHeight());
    }
};

Shark.prototype.animSpeedSix = function(){
    this.mFish.setAnimationSpeed(6);
};

