const SCRIPT_NAME = "Rigidbody";

var transform;
const GRAVITY = 500;
const TERMINAL_VELOCITY_FALLING = 200;

const utils = require("utils.js");

function Init() {
    transform = current.getComponent("Transform");
}

function FixedUpdate() {
    if (script.properties.affectedByGravity) {
        script.properties.speedY -= GRAVITY * roingine.FIXED_UPDATE_DELTATIME;
        script.properties.speedY = script.properties.speedY;
        script.properties.speedY = utils.max(script.properties.speedY, -TERMINAL_VELOCITY_FALLING);
    }
}

function Update() {
    const speedX = script.properties.speedX;
    const speedY = script.properties.speedY;

    utils.translate(transform, speedX, speedY);
}

script.properties = {
    speedX: 0,
    speedY: 0,
    affectedByGravity: true,
};
