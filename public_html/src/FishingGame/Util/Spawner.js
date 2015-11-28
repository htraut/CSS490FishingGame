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
                h = Math.floor((Math.random()*10) + 1);
                objXform.setSize(w, h);
                object.setScore(w * h);
                x = this._generateXPos();
                y = this._generateYPos();
                objXform.setPosition(x, y);
                population.push(object);
                continue;
            default: 
                break;
        }
    }
    
    return population;
};

Spawner.prototype._generateXPos = function(){
    var dir = Math.round(Math.random());
    var x;
    var disp = Math.random();
    if(dir === 1){
        x = (this.mLocation[0] + (this.mWidth/2))*disp;
    }else{
         x = (this.mLocation[0] - (this.mWidth/2))*disp;
    }
    return x;
};

Spawner.prototype._generateYPos = function(){
    var dir = Math.round(Math.random());
    var y;
    var disp = Math.random();
    if(dir === 1 && (this.mLocation[0] + (this.mHeight/2)) < -15){
        y = (this.mLocation[0] + (this.mHeight/2))*disp;
    }else{
        y = (this.mLocation[0] - (this.mHeight/2))*disp;
        y += 10;
    }
    return y;
};