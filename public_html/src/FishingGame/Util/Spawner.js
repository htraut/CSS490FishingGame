/*
 * @auth: Herbert Traut
 * @file: Spawner.js
 * @date: 11-27-15
 * @brief: Spawn controller for objects
 * 
 */


/* global Camera, Fish */

function Spawner(camera){
    this.mLocation = camera.getWCCenter();
    this.mWidth = camera.getWCWidth();
    this.mHeight = camera.getWCHeight();
};

/*
 * @amount: the amount to spawn
 * @type: the object type to be spawned
 * @texture: the sprite sheet for the object
 */
Spawner.prototype.populate = function (amount, type, texture){
    
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
                w = Math.floor((Math.random()*10) + 1);
                h = w * Math.random();
                h += 1;
                objXform.setSize(w, h);
                object.setScore(w * h);
                x = this._generateXPos(Math.round(Math.random()));
                y = this._generateYPos(0) - 5;
                objXform.setPosition(x, y);
                population.push(object);
                continue;
            case "Shark":
                object = new Shark(texture);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*10) + 1);
                h = w * Math.random();
                h += 1;
                objXform.setSize(w, h);
                object.setScore(0);
                x = this._generateXPos(Math.round(Math.random()));
                y = this._generateYPos(0) - 5;
                objXform.setPosition(x, y);
                population.push(object);
                continue;
            case "Angler":
                object = new AnglerFish(texture);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*10) + 1);
                h = w * Math.random();
                h += 1;
                objXform.setSize(w, h);
                object.setScore(0);
                x = this._generateXPos(Math.round(Math.random()));
                y = this._generateYPos(0) - 5;
                objXform.setPosition(x, y);
                population.push(object);
                continue;    
            case "Cloud":
                object = new Cloud(texture);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*10) + 1);
                h = w * 0.5;
                objXform.setSize(w, h);
                x = this._generateXPos(Math.round(Math.random()));
                y = this._generateYPos(1);
                y += 15;
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
        x = (this.mLocation[0] + (this.mWidth/3))*disp;
    }else{
         x = (this.mLocation[0] - (this.mWidth/3))*disp;
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
        y = (this.mLocation[0] + (this.mHeight/3))*disp;
    }else{
        y = (this.mLocation[0] - (this.mHeight/3))*disp;
    }
    return y;
};