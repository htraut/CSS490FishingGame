/*
 * @auth: Herbert Traut
 * @file: FishingBoat.js
 * @date: 11-27-15
 * @brief: FishingBoat for the player character
 */


/* global gEngine, GameObject */

'use strict';

function FishingBoat(renderableObj){
    this.kDelta = 0.5;
    
    renderableObj.setColor([1,1,1,0]);
    renderableObj.getXform().setPosition(0,0);
    renderableObj.getXform().setSize(13,6);
    renderableObj.setElementPixelPositions(320, 490, 0, 170);
    GameObject.call(this, renderableObj);
}
gEngine.Core.inheritPrototype(FishingBoat, GameObject);

FishingBoat.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)){
        this.getXform().incYPosBy(this.kDelta);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
        this.getXform().incYPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)){
        this.getXform().incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)){
        this.getXform().incXPosBy(this.kDelta);
    }
};