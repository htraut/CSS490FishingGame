/*
 * @auth: Herbert Traut
 * @file: FishingBoat.js
 * @date: 11-27-15
 * @brief: FishingBoat for the player character
 */


/* global gEngine, GameObject, vec2, Light, vec3 */

'use strict';

function FishingBoat(texture){
    this.kDelta = 1.5;
    
    this.mBoat = new LightRenderable(texture);
    this.mBoat.setSpriteSequence(512, 0, 1024, 512, 3, 0);
    this.mBoat.setAnimationSpeed(3);
    this.mBoat.setColor([1,1,1,0]);
    this.mBoat.getXform().setPosition(0,0);
    this.mFishingBoatState = new FishingBoatState(this.mBoat.getXform().getPosition());
    this.mBoat.getXform().setSize(24, 12);
    
    GameObject.call(this, this.mBoat);
    
    this.mBoatLight = this._createALight(Light.eLightType.eSpotLight,
            [80, 20, 5],            // position
            [-0.5, -0.3, -0.1],     // direction
            [0.5, 0.5, 0.5, 1],     // color
            1, 50,                  // near and far distances
            1.1, 1.25,               // inner outter angles (in radius)
            1.5,                     // intensity
            0.2                     // drop off
            );
    this.mBoat.addLight(this.mBoatLight);
}
gEngine.Core.inheritPrototype(FishingBoat, GameObject);

FishingBoat.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);      
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);

    return light;
};

FishingBoat.prototype.getLight = function (){
    return this.mBoatLight;
};

FishingBoat.prototype.update = function () {
    var xform = this.getXform();
    var pos = vec3.fromValues(
                xform.getXPos() - 1,
                xform.getYPos() + 2.5,
                0);
    this.mBoatLight.set2DPosition(pos);
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
