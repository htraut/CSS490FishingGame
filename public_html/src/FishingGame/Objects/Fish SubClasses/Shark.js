/*
 * @auth: Herbert Traut
 * @file: Shark.js
 * @date: 11-28-15
 * @brief: Shark which chases fishing hook when the hook is nearby
 */


/* global GameObject, gEngine, Fish */

'use strict';

function Shark(texture){
    
    Fish.call(this, texture);
    this.mFish.setElementPixelPositions(35, 100, 250, 270);
    this.mChaseDist = 10;
    this.mRotateRate = 1;
    this.mSpeed = 1.5;
}
gEngine.Core.inheritPrototype(Shark, Fish);

Shark.eStatus = Object.freeze({
    eChase: 8
});

Shark.prototype.update = function (){
    
    if(this.mStatus === Fish.eStatus.eDespawn){
        this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    }else{
        if(this.mStatus === Fish.eStatus.eCollideRight){
            this.mSpeed *= -1;
            this.mStatus = 0;
        }else if(this.mStatus === Fish.eStatus.eCollideLeft){
            this.mSpeed *= -1;
            this.mStatus = 0;
        }
        this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    }
};

