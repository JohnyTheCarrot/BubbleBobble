const SCRIPT_NAME = "Bubble";

const constants = require("constants.js");

var timeout;
var transform;

const BUBBLE_SPEED = 800;
const TTL_S = 0.25;

var speedFactor = 1;
var age = 0;

const BUBBLE_WIDTH = 35;
const BUBBLE_HEIGHT = 50;

function Init() {
    transform = current.addComponent("Transform", 100, 100);
    current.addComponent("Rect", BUBBLE_WIDTH, BUBBLE_HEIGHT);
    current.addComponent("RectRenderer");
    current.addComponent("RectCollider", BUBBLE_WIDTH, BUBBLE_HEIGHT);
    current.setEnabled(false);
    current.setLabel("Bubble");
}

function startFloating() {
    current.setEnabled(false);
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
