/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Base fish class which will be inherited from
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false */

function Fish(renderableObj) {
    GameObject.call(this, renderableObj);
    this.mMoveRate = 5;
    this.mIsHooked = false;
}

gEngine.Core.inheritPrototype(Fish, GameObject);

Fish.prototype.update = function () {
    // insert fish updating here
};
