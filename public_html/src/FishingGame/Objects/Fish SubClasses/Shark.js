/*
 * @auth: Herbert Traut
 * @file: Shark.js
 * @date: 11-28-15
 * @brief: Shark which chases fishing hook when the hook is nearby
 */


/* global GameObject, gEngine, Fish, vec2 */

'use strict';

function Shark(texture){
    
    Fish.call(this, texture);
    this.mFish.setElementPixelPositions(35, 100, 250, 270);
    this.mChaseDist = 15;
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

