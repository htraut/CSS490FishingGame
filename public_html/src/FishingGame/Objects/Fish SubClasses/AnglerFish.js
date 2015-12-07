/*
 * @auth: Joey Guinasso
 * @file: AnglerFish.js
 * @date: 11-28-15
 * @brief: AnglerFish is a fish with a light on its head that gives the player
 *         a longer fishing line if caught.
 */


/* global GameObject, gEngine, Fish, Light, vec3 */

'use strict';

function AnglerFish(texture){
    Fish.call(this, texture);
    this.mFish.setElementPixelPositions(0, 1024, 0, 1024);
    this.mChaseDist = 10;
    this.mRotateRate = 1;
    this.mSpeed = 1.5;
    
    this.mAnglerLight = this._createALight(Light.eLightType.ePointLight,
            [15, 50, 5],         // position
            [-0.2, -0.2, -1],          // Direction 
            [0.6, 0.6, 0.6, 0.5],  // some color
            4, 6,               // near and far distances
            0.5, 1.4,            // inner and outer cones
            3,                   // intensity
            0.5                  // drop off
            );
    this.mFish.addLight(this.mAnglerLight);
}
gEngine.Core.inheritPrototype(AnglerFish, Fish);

AnglerFish.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

AnglerFish.eStatus = Object.freeze({
    eChase: 8
});

AnglerFish.prototype.getLight = function (){
    return this.mAnglerLight;
};

AnglerFish.prototype.update = function (){
    Fish.prototype.update.call(this);
    var xform = this.getXform();
    var pos = vec3.fromValues(
                xform.getXPos() + (xform.getWidth()/2.3),
                xform.getYPos() + (xform.getHeight()/4.5),
                0);
    this.mAnglerLight.set2DPosition(pos);
    /*if(this.mStatus === Fish.eStatus.eDespawn){
        this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    }else{
        if(this.mStatus === Fish.eStatus.eCollideRight){
            this.mSpeed *= -1;
            this.mStatus = 0;
        }else if(this.mStatus === Fish.eStatus.eCollideLeft){
            this.mSpeed *= -1;
            this.mStatus = 0;
        }
        this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    }*/
};
