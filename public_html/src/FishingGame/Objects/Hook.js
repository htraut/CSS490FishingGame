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
    this.mHook.getXform().setPosition(-15, -15);
    this.mHook.getXform().setSize(13,6);
    this.mHook.setElementPixelPositions(35, 80, 350, 370);
    GameObject.call(this, this.mHook);
    this.mLength = 20;
    this.mStatus = 0;
    this.mSpeed = 0.1;
}
gEngine.Core.inheritPrototype(Hook, GameObject);

Hook.prototype.update = function (){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        if(this.getXform().getYPos() < 0){
            this.getXform().incXPosBy(this.mSpeed);
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        if(this.getXform().getYPos() > (this.mLength * (-1))){
            this.getXform().incXPosBy(-this.mSpeed);
        }
    }
};

Hook.prototype.setLineLength = function (length) {
    this.mLength = length;
};

Hook.prototype.getLineLength = function () {
    return this.mLength;
};

