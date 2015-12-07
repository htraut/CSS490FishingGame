/*
 * @auth: Herbert Traut
 * @file: Fisherman.js
 * @date: 11-27-15
 * @brief: The fisherman controlled by the player character
 */

/* global GameObject, gEngine */

'use strict';

function Fisherman(texture) {
    this.kDelta = 0.5;
    
    this.mFisherman = new LightRenderable(texture);
    this.mFisherman.setColor([1,1,1,0]);
    this.mFisherman.getXform().setPosition(0,0);
    this.mFisherman.getXform().setSize(6,13);
    this.mFisherman.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mFisherman);
}
gEngine.Core.inheritPrototype(Fisherman, GameObject);

Fisherman.prototype.update = function(){
    
};

