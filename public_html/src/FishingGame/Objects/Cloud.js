/*
 * @auth: Herbert Traut
 * @file: Cloud.js
 * @date: 11-27-15
 * @brief: Clouds for the sky
 * @TODO: needs particle effects and texture
 */

/* global GameObject, gEngine */

'use strict';

function Cloud(texture, world) {
    this.kDelta = 0.02;
    
    this.mCloud = new SpriteRenderable(texture);
    this.mCloud.setColor([1,1,1,0]);
    this.mCloud.setElementPixelPositions(35, 100, 220, 240);
    this.mWorld = world;
    GameObject.call(this, this.mCloud);
};
gEngine.Core.inheritPrototype(Cloud, GameObject);

Cloud.prototype._restartLeft = function(){
    var cloudXform = this.getXform();
    var worldXform = this.mWorld.getXform();
    var minHeight = worldXform.getYPos() + 5;
    var maxHeight = worldXform.getYPos() + 10;
    var tail = cloudXform.getXPos() - (cloudXform.getWidth()/2);
    var worldRight = worldXform.getXPos() + (worldXform.getWidth()/2);
    if(tail > worldRight){
        var spawnX = worldXform.getXPos() - worldXform.getWidth();
        spawnX -= cloudXform.getWidth()/2;
        var delta = (Math.floor((Math.random()*2) + 1)) + (-(Math.floor((Math.random()*2) + 1)));
        var height = cloudXform.getYPos() + delta;
        if(height < minHeight || height > maxHeight) height = cloudXform.getYPos();
        cloudXform.setPosition(spawnX, height);
    }
};

Cloud.prototype._restartRight = function(){
    var cloudXform = this.getXform();
    var worldXform = this.mWorld.getXform();
    var minHeight = worldXform.getYPos() + 5;
    var maxHeight = worldXform.getYPos() + 10;
    var tail = cloudXform.getXPos() + (cloudXform.getWidth()/2);
    var worldLeft = worldXform.getXPos() - (worldXform.getWidth()/2);
    if(tail > worldLeft){
        var spawnX = worldXform.getXPos() + worldXform.getWidth();
        spawnX += cloudXform.getWidth()/2;
        var delta = (Math.floor((Math.random()*2) + 1)) + (-(Math.floor((Math.random()*2) + 1)));
        var height = cloudXform.getYPos() + delta;
        if(height < minHeight || height > maxHeight) height = cloudXform.getYPos();
        cloudXform.setPosition(spawnX, height);
    }
};

Cloud.prototype.update = function(){
    this._restartLeft();
    this.getXform().incXPosBy(this.kDelta);
};