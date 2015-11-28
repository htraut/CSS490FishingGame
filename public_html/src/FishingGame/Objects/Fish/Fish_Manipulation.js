/*
 * @auth: Caleb Larson
 * @file: Fish_Manipulation.js
 * @date: 11-27-15
 * @brief: This class will change the fish behaviour when they interact with other objects
 */

/*jslint node: true, vars: true */
/*global gEngine, Fish*/

"use strict";

Fish.prototype.statusCheck = function(theFish, theHook, theBG){
    var fishBB = theFish.getBB();
    var BGBB = theBG.getBB();
    var result = 0;
    var fishXform = null;
    var hookCenter = null;
    
    // to prevent us from calling pixel collision if the fish is already hooked,
    // we check the fish's status first
    if(theFish.getStatus() === Fish.eStatus.eHooked || theFish.pixelTouches(theHook, result)){
        theFish.updateStatus(Fish.eStatus.eHooked);
        fishXform = theFish.getXform();
        hookCenter = theHook.getXform().getPosition();
        fishXform.setPosition(hookCenter[0], hookCenter[1]);
    }
    if(fishBB.boundCollideStatus(BGBB) === 2){
        theFish.updateStatus(Fish.eStatus.eCollideRight);
    }
    if(fishBB.boundCollideStatus(BGBB) === 1){
        theFish.updateStatus(Fish.eStatus.eCollideLeft);
    }
};



