/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Hook class
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject, vec2: false */

"use strict";

function Hook(texture) {
    this.mHook = new SpriteRenderable(texture);
    this.mHook.setColor([1,1,1,0]);
    this.mHook.getXform().setPosition(0, 0);
    this.mHook.getXform().setSize(2,2);
    this.mHook.setElementPixelPositions(35, 95, 315, 350);
    GameObject.call(this, this.mHook);
    this.mLength = 30;
    this.mStatus = 0;
    this.mSpeed = 0.2;
}
gEngine.Core.inheritPrototype(Hook, GameObject);

Hook.prototype.update = function (){
    
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
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        /*
        var x = this.mHook.getXform().getXPos() - 100;
        var y = this.mHook.getXform().getYPos();
        var c = vec2.fromValues(x, y);
        this.mBoatState.setCenter(c);
        */
        this.getXform().incXPosBy(-this.mSpeed);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        /*
        var x = this.mHook.getXform().getXPos() + 100;
        var y = this.mHook.getXform().getYPos();
        this.mBoatState.setCenter(x,y);
        */
        this.getXform().incXPosBy(this.mSpeed);
    }
};

Hook.prototype.setLineLength = function (length) {
    this.mLength = length;
};

Hook.prototype.getLineLength = function () {
    return this.mLength;
};

Hook.prototype.getStatus = function () {
    return this.mStatus;
};

Hook.prototype.setStatus = function (status) {
    this.mStatus = status;
};

