/*
 * @auth: Joey Guinasso
 * @file: AnglerFish.js
 * @date: 11-28-15
 * @brief: AnglerFish is a fish with a light on its head that gives the player
 *         a longer fishing line if caught.
 */


/* global GameObject, gEngine, Fish */

'use strict';

function AnglerFish(texture){
    Fish.call(this, texture);
    this.mFish.setElementPixelPositions(35, 160, 285, 305);
    this.mChaseDist = 10;
    this.mRotateRate = 1;
    this.mSpeed = 1.5;
}
gEngine.Core.inheritPrototype(AnglerFish, Fish);

AnglerFish.eStatus = Object.freeze({
    eChase: 8
});

AnglerFish.prototype.update = function (){
    Fish.prototype.update.call(this);
    /*if(this.mStatus === Fish.eStatus.eDespawn){
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
    }*/
};
