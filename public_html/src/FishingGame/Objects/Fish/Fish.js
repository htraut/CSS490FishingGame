/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Base fish class which will be inherited from
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false */

"use strict";

function Fish(texture) {
    
    this.mFish = new SpriteRenderable(texture);
    this.mFish.setColor([1,1,1,0]);
    this.mFish.getXform().setPosition(0,0);
    this.mFish.getXform().setSize(13,6);
    this.mFish.setElementPixelPositions(35, 80, 350, 370);
    GameObject.call(this, this.mFish);
    this.mStatus = 0;
    this.mScore = 1;
}
gEngine.Core.inheritPrototype(Fish, GameObject);

Fish.eStatus = Object.freeze({
    eHooked: 1,
    eCollideRight: 2,
    eCollideLeft: 4,
    eCaught: 6
});

Fish.prototype.update = function () {
    if(this.mStatus === Fish.eStatus.eCollideRight){
        this.mSpeed *= -1;
        this.mStatus = 0;
    }else if(this.mStatus === Fish.eStatus.eCollideLeft){
        this.mSpeed *= -1;
        this.mStatus = 0;
    }
    
    if(Fish.eStatus.eHooked !== this.mStatus){
        this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    }
};

Fish.prototype.getStatus = function () {
    return this.mStatus;
};

Fish.prototype.updateStatus = function (status){
    this.mStatus |= status;
};

Fish.prototype.setScore = function (value){
    this.mScore = value;
};

Fish.prototype.getScore = function (){
    return this.mScore;
};

