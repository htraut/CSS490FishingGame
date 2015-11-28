/*
 * @auth: Herbert Traut
 * @file: Cloud.js
 * @date: 11-27-15
 * @brief: Clouds for the sky
 * @TODO: needs particle effects and texture
 */

/* global GameObject, gEngine */

'use strict';

function Cloud(texture) {
    this.kDelta = 0.02;
    
    this.mCloud = new SpriteRenderable(texture);
    this.mCloud.setColor([1,1,1,0]);
    //this.mCloud.getXform().setPosition(0,23);
    //this.mCloud.getXform().setSize(6,13);
    this.mCloud.setElementPixelPositions(35, 100, 220, 240);
    GameObject.call(this, this.mCloud);
};
gEngine.Core.inheritPrototype(Cloud, GameObject);

Cloud.prototype.update = function(){
    this.getXform().incXPosBy(this.kDelta);
};