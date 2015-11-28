/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Base fish class which will be inherited from
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false */

"use strict";

function Fish(renderableObj) {
    GameObject.call(this, renderableObj);
    this.mStatus = 0;
}
gEngine.Core.inheritPrototype(Fish, GameObject);

Fish.eStatus = Object.freeze({
    eHooked: 1,
    eCollideRight: 2,
    eCollideLeft: 4
});

Fish.prototype.update = function () {
    if(this.mStatus === Fish.eStatus.eCollideRight || this.mStatus === Fish.eStatus.eCollideLeft){
        this.reverseMovement();
    }
    if(this.mStatus && Fish.eStatus.eHooked !== 1){
        this.mRenderComponent.getXform().incXPosBy(this.mMoveRate);
    }
};

Fish.prototype.reverseMovement = function () {
    this.mMoveRate *= -1;
};

Fish.prototype.updateStatus = function (status){
    this.mStatus |= status;
};

