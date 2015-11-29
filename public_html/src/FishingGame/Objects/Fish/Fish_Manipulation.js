/*
 * @auth: Caleb Larson
 * @file: Fish_Manipulation.js
 * @date: 11-27-15
 * @brief: This class will change the fish behaviour when they interact with other objects
 */

/*jslint node: true, vars: true */
/*global gEngine, Fish, vec2, Shark, BoundingBox*/

"use strict";

Fish.prototype.statusCheck = function(theBG, theHook){
    var fishBB = this.getBBox();
    var BGBB = theBG.getBBox();
    var result = vec2.create();
    var fishXform = null;
    var hookCenter = null;
    
    // to prevent us from calling pixel collision if the fish is already hooked,
    // we check the fish's status first
    if(this.getStatus() === Fish.eStatus.eHooked || this.pixelTouches(theHook, result)){
        this.updateStatus(Fish.eStatus.eHooked);
        fishXform = this.getXform();
        hookCenter = theHook.getXform().getPosition();
        fishXform.setPosition(hookCenter[0], hookCenter[1]);
        if(hookCenter[1] > -0.5){
            this.updateStatus(Fish.eStatus.eDespawn);
        }
    }
    if(fishBB.boundCollideStatus(BGBB) === 13){
        this.updateStatus(Fish.eStatus.eCollideRight);
    }
    if(fishBB.boundCollideStatus(BGBB) === 14){
        this.updateStatus(Fish.eStatus.eCollideLeft);
    }
};

Fish.prototype.chase = function(hook){
    var hookPos = hook.getXform().getPosition();
    var result = vec2.create();
    if(hook.getStatus() === 0 && this.getStatus() === Shark.eStatus.eChase) {  
        this.updateStatus(Fish.eStatus.eDespawn);
        return; //Reeled in
    }
    var dir = vec2.create();
    vec2.subtract(dir, hookPos, this.getXform().getPosition());
    var len = vec2.length(dir);
    if(len > this.mChaseDist){
        return; //Too far, don't care
    }else if(this.pixelTouches(hook, result)){
        this.updateStatus(Fish.eStatus.eHooked);
        return;
    }else{
        this.updateStatus(Shark.eStatus.eChase);
        this.rotateObjPointTo(hookPos, this.mRotateRate);
        var pos = this.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    }
};

Fish.prototype.despawn = function (theBG){
    if(this.getStatus() !== Fish.eStatus.eDespawn) return;
    var fishBB = this.getBBox();
    var BGBB = theBG.getBBox();
    if(fishBB.boundCollideStatus(BGBB) === BoundingBox.eboundCollideStatus.eOutside){
        return true;
    }
    return false; //not out of sight yet
};


