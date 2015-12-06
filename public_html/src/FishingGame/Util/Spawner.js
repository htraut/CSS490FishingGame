/*
 * @auth: Herbert Traut
 * @file: Spawner.js
 * @date: 11-27-15
 * @brief: Spawn controller for objects
 * 
 */


/* global Camera, Fish */

function Spawner(world, camera){
    this.mWorld = world;
    this.mCenter = world.getXform().getPosition();
    this.mWidth = world.getXform().getWidth();
    this.mHeight = world.getXform().getHeight();
    this.mCamera = camera;
    this.mCamCenter = camera.getWCCenter();
    this.mCamWidth = camera.getWCWidth();
    this.mCamHeight = camera.getWCHeight();
};

/*
 * @amount: the amount to spawn
 * @type: the object type to be spawned
 * @texture: the sprite sheet for the object
 */
Spawner.prototype.populate = function (amount, type, texture, other){
    
    if(amount === 0) return;
    if(type === null) return;
    
    var population = [];
    var i = 0;
    var objXform = null;
    var object = null;
    var w, h, x, y;
    
    for(i; i < amount; i++){
        switch(type){
            case "Fish":
                object = new Fish(texture);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*6) + 3);
                h = w / 2;
                objXform.setSize(w, h);
                object.setScore(w * h);
                x = this._generateXPos(Math.round(Math.random()));
                y = this._generateYPos(0) - 5;
                objXform.setPosition(x, y);
                population.push(object);
                if(w > 3 * h){
                    w = h / 2;
                }
                continue;
            case "Shark":
                object = new Shark(texture);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*6) + 3);
                h = w / 4;
                objXform.setSize(w, h);
                object.setScore(0);
                x = this._generateXPos(Math.round(Math.random()));
                y = this._generateYPos(0) - 10;
                objXform.setPosition(x, y);
                population.push(object);
                continue;
            case "Angler":
                object = new AnglerFish(texture);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*5) + 3);
                h = w;
                objXform.setSize(w, h);
                object.setScore(w * h);
                x = this._generateXPos(Math.round(Math.random()));
                y = this._generateYPos(0) - 10;
                objXform.setPosition(x, y);
                population.push(object);
                continue;    
            case "Cloud":
                object = new Cloud(texture, other, this.mWorld);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*15) + 30);
                h = w * 0.5;
                objXform.setSize(w, h);
                x = this._generateXPos(Math.round(Math.random()));
                y = 0 + (Math.floor((Math.random()*20) + 17));
                objXform.setPosition(x, y);
                population.push(object);
                continue;
            default: 
                break;
        }
    }
    
    return population;
};

/*
 * Coordinates a generated around the camera's center
 * @value: 0 for x coordinate to the left, 1 for x coordinate to the right
 */
Spawner.prototype._generateXPos = function(value){
    var dir = value;
    var x;
    var disp = Math.floor((Math.random()*10)+1)/10;
    if(dir === 1){
        x = (this.mCamCenter[0] + (this.mCamWidth/3))*disp;
    }else{
         x = (this.mCamCenter[0] - (this.mCamWidth/3))*disp;
    }
    return x;
};

/*
 * @value: 0 for y coordinate below, 1 for y coordinate above
 */
Spawner.prototype._generateYPos = function(value){
    var dir = value;
    var y;
    var disp = Math.floor((Math.random()*10)+1)/10;
    if(dir === 1){
        y = (this.mCamCenter[1] + (this.mCamHeight/3))*disp;
    }else{
        y = (this.mCamCenter[1] - (this.mCamHeight/3))*disp;
    }
    return y;
};

Spawner.prototype.updateCameraPos = function(){
    this.mCamCenter = this.mCamera.getWCCenter();
    this.mCamWidth = this.mCamera.getWCWidth();
    this.mCamHeight = this.mCamera.getWCHeight();
};