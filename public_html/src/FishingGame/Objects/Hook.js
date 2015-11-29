/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Hook class
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false */

"use strict";

function Hook(texture) {
    
    this.mHook = new SpriteRenderable(texture);
    this.mHook.setColor([1,1,1,0]);
    this.mHook.getXform().setPosition(0, 0);
    this.mHook.getXform().setSize(2,2);
    this.mHook.setElementPixelPositions(35, 95, 315, 350);
    GameObject.call(this, this.mHook);
    this.mLength = 20;
    this.mStatus = 0;
    this.mSpeed = 0.1;
}
gEngine.Core.inheritPrototype(Hook, GameObject);

Hook.prototype.update = function (boat){
    var boatCenter = boat.getXform().getPosition();
    this.getXform().setXPos(boatCenter[0]);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || this.mStatus === 1){
        if(this.getXform().getYPos() < 0){
            this.getXform().incYPosBy(this.mSpeed);
            this.mStatus = 1;
        }else{
            this.mStatus = 0;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) || this.mStatus === 2){
        if(this.getXform().getYPos() > (this.mLength * (-1))){
            this.getXform().incYPosBy(-this.mSpeed);
            this.mStatus = 2;
        }else{
            this.mStatus = 0;
        }
    }
};

Hook.prototype.setLineLength = function (length) {
    this.mLength = length;
};

Hook.prototype.getLineLength = function () {
    return this.mLength;
};

