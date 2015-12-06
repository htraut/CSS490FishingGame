/*
 * @auth: Herbert Traut
 * @file: FishingBoat.js
 * @date: 12-5-15
 * @brief: FishingBoatSet for the fishing boat and hook
 */


/* global GameObjectSet, gEngine, vec2 */

function FishingBoatSet(){
    GameObjectSet.call(this);
    this.mFishingBoatState = new FishingBoatState(this.mXform.getPosition());
    this.kDelta = 1.5;
}
gEngine.Core.inheritPrototype(FishingBoatSet, GameObjectSet);

FishingBoatSet.prototype.update = function(){
    this._updateMoveSet();
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
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
    this.moveSet();
};

FishingBoatSet.prototype._updateMoveSet = function (){
    var min = 0, max = 0, w = 0, h = 0;
    min = this._findMinPoint();
    max = this._findMaxPoint();
    w = max[0]-min[0];
    h = max[1]-min[1];
    this.mXform.setPosition(min[0]+(w/2), 0);
    this.mXform.setSize(w,h);
    var gc = this.mXform.getPosition();
    this.posDif = [];
    this.sizeDif = [];
    for(var i = 0; i < this.mSet.length; i++){
        var objXform = this.mSet[i].getXform();
        var pos = objXform.getPosition();
        var xdif = gc[0] - pos[0];
        var ydif = gc[1] - pos[1];
        xdif = xdif/this.mXform.getWidth();
        ydif = ydif/this.mXform.getHeight();
        var pd = vec2.fromValues(xdif, ydif);
        this.posDif.push(pd);
        var wDif = objXform.getWidth()/this.mXform.getWidth();
        var hDif = objXform.getHeight()/this.mXform.getHeight();
        var sDif = vec2.fromValues(wDif, hDif);
        this.sizeDif.push(sDif);
    }
};
