/*
 * @auth: Herbert Traut
 * @file: Fisherman.js
 * @date: 11-27-15
 * @brief: The fisherman controlled by the player character
 */

/* global GameObject, gEngine */

'use strict';

function Fisherman(renderableObj) {
    this.kDelta = 0.5;
    
    renderableObj.setColor([1,1,1,0]);
    renderableObj.getXform().setPosition(0,0);
    renderableObj.getXform().setSize(6,13);
    renderableObj.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, renderableObj);
}
gEngine.Core.inheritPrototype(Fisherman, GameObject);

Fisherman.prototype.update = function(){
    
};

