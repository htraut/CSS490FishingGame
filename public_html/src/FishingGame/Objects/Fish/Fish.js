/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Base fish class which will be inherited from
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject, vec2, vec3: false */

"use strict";

function Fish(texture) {
    
    this.mFish = new SpriteRenderable(texture);
    this.mFish.setColor([1,1,1,0]);
    this.mFish.getXform().setPosition(0,0);
    this.mFish.getXform().setSize(13,6);
    this.mFish.setElementPixelPositions(0, 512, 0, 256);
    //this.mFish.setElementPixelPositions(35, 80, 350, 370);
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
}
gEngine.Core.inheritPrototype(Fish, GameObject);

Fish.eStatus = Object.freeze({
    eHooked: 1,
    eCollideRight: 2,
    eCollideLeft: 4,
    eDespawn: 6
});

Fish.prototype.update = function () {
    var xform = this.mFish.getXform();
    if(this.mStatus === Fish.eStatus.eCollideRight){
        this.mSpeed *= -1;
        xform.setSize(-xform.getWidth(), xform.getHeight());
        this.mStatus = 0;
    }else if(this.mStatus === Fish.eStatus.eCollideLeft){
        this.mSpeed *= -1;
        xform.setSize(-xform.getWidth(), xform.getHeight());
        this.mStatus = 0;
    }
    
    if(this.mBounces > 2){
        this.updateStatus(Fish.eStatus.eDespawn);
    }
    
    if(Fish.eStatus.eHooked !== this.mStatus){
        this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    }
};

Fish.prototype.rotateObjPointTo = function (p, rate){
    
    // Step A: determine if reach the destination position p
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE) {
        return; // we are there.
    }
    vec2.scale(dir, dir, 1 / len);

    // Step B: compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);

    if (cosTheta > 0.999999) { // almost exactly the same direction
        return;
    }

    // Step C: clamp the cosTheda to -1 to 1 
    // in a perfect world, this would never happen! BUT ...
    if (cosTheta > 1) {
        cosTheta = 1;
    } else {
        if (cosTheta < -1) {
            cosTheta = -1;
        }
    }

    // Step D: compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // radian to roate
    if (r3d[2] < 0) {
        rad = -rad;
    }

    // Step E: rotate the facing direction with the angle and rate
    rad *= rate;  // actual angle need to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
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

Fish.prototype.resetStatus = function(){
    this.mStatus = 0;
};

