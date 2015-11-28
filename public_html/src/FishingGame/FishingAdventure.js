/*
 * File: FishingAdventure.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/* find out more about jslint: http://www.jslint.com/help.html */

/* global Scene, gEngine */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishingAdventure() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(FishingAdventure, Scene);


FishingAdventure.prototype.initialize = function () {
   
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FishingAdventure.prototype.draw = function () {
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FishingAdventure.prototype.update = function () {
    
};


FishingAdventure.prototype.unloadScene = function() {
   
};