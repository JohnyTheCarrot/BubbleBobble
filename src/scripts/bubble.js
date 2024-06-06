const SCRIPT_NAME = "Bubble";

const constants = require("constants.js");

var timeout;
var transform;

const BUBBLE_SPEED = 800;
const TTL_S = 0.25;

var speedFactor = 1;
var age = 0;

function Init() {
    transform = current.addComponent("Transform", 100, 100);
    current.addComponent("Rect", 35, 50);
    current.addComponent("RectRenderer");
    current.setEnabled(false);
}

function startFloating() {
    current.setEnabled(false);
}

function OnEnabled() {
}

function OnDisabled() {
    age = 0;
}

function Update(dt) {
    age += dt;
    if (age >= TTL_S) {
        startFloating();
        return;
    }

    transform.translate(speedFactor * BUBBLE_SPEED * dt, 0);
}

function spawn(x, y, facingDir) {
    transform.setLocalPosition(x, y);
    speedFactor = facingDir === constants.FACING_LEFT ? -1 : 1;
    current.setEnabled(true);
}

script.api = {
    spawn,
};
