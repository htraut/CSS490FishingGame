/*
 * @auth: Herbert Traut
 * @file: FishingBoat.js
 * @date: 11-27-15
 * @brief: FishingBoat for the player character
 */


/* global gEngine, GameObject, vec2 */

'use strict';

function FishingBoat(texture){
    this.kDelta = 1.5;
    
    this.mBoat = new SpriteAnimateRenderable(texture);
    this.mBoat.setSpriteSequence(512, 0, 1024, 512, 3, 0);
    this.mBoat.setColor([1,1,1,0]);
    this.mBoat.getXform().setPosition(0,0);
    this.mFishingBoatState = new FishingBoatState(this.mBoat.getXform().getPosition());
    this.mBoat.getXform().setSize(24,12);
    
    GameObject.call(this, this.mBoat);
}
gEngine.Core.inheritPrototype(FishingBoat, GameObject);

FishingBoat.prototype.update = function () {
    
    this.mBoat.updateAnimation();
    //var hookX = hook.getXform().getXPos();
    
    //this.getXform().setXPos(hookX);
    /*
    var pos = this.mFishingBoatState.getCenter();
    var x = pos[0];
    var y = pos[1];
    var nPos = vec2.create();
    nPos[1] = y;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        x -= this.kDelta;
        nPos[0] = x;
        this.mFishingBoatState.setCenter(nPos);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        x += this.kDelta;
        nPos[0] = x;
        this.mFishingBoatState.setCenter(nPos);
    }
    
    this.mFishingBoatState.updateFishingBoatState();
    this.getXform().setXPos(this.mFishingBoatState.getCenter()[0]);
    */
};
