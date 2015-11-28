/*
 * @auth: Caleb Larson
 * @file: Fish_Manipulation.js
 * @date: 11-27-15
 * @brief: This class will change the fish behaviour when they interact with other objects
 */

/*jslint node: true, vars: true */
/*global gEngine, Fish*/

"use strict";

Fish.prototype.statusCheck = function(theBG, theHook){
    var fishBB = this.getBBox();
    var BGBB = theBG.getBBox();
    var result = 0;
    var fishXform = null;
    var hookCenter = null;
    
    // to prevent us from calling pixel collision if the fish is already hooked,
    // we check the fish's status first
    if(this.getStatus() === Fish.eStatus.eHooked /*|| this.pixelTouches(theHook, result)*/){
        this.updateStatus(Fish.eStatus.eHooked);
        fishXform = this.getXform();
        hookCenter = theHook.getXform().getPosition();
        fishXform.setPosition(hookCenter[0], hookCenter[1]);
    }
    if(fishBB.boundCollideStatus(BGBB) === 2){
        this.updateStatus(Fish.eStatus.eCollideRight);
    }
    if(fishBB.boundCollideStatus(BGBB) === 1){
        this.updateStatus(Fish.eStatus.eCollideLeft);
    }
};



