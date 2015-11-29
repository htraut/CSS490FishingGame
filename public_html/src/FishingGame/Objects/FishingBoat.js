/*
 * @auth: Herbert Traut
 * @file: FishingBoat.js
 * @date: 11-27-15
 * @brief: FishingBoat for the player character
 */


/* global gEngine, GameObject */

'use strict';

function FishingBoat(texture){
    this.kDelta = 0.5;
    
    this.mBoat = new SpriteRenderable(texture);
    this.mBoat.setColor([1,1,1,0]);
    this.mBoat.getXform().setPosition(0,0);
    this.mBoat.getXform().setSize(13,6);
    this.mBoat.setElementPixelPositions(35, 90, 450, 470);
    GameObject.call(this, this.mBoat);
}
gEngine.Core.inheritPrototype(FishingBoat, GameObject);

FishingBoat.prototype.update = function (hook) {
    var hookX = hook.getXform().getXPos();
    
    this.getXform().setXPos(hookX);
};
