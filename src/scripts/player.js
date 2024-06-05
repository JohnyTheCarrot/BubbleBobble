const SCRIPT_NAME = "Player";

const utils = require("utils.js");

const PLAYER_SIZE = 37;
const JUMP_SPEED = 375;
const MOVEMENT_SPEED = 300;

var transform, rigidbody, collider, livingEntityComp;

var canJump = false;

function jump() {
    livingEntityComp.callMethod("jump");
}

function die() {
    roingine.println("Death");
}

function moveLeft() {
    utils.translate(transform, -MOVEMENT_SPEED, 0);
}

function moveRight() {
    utils.translate(transform, MOVEMENT_SPEED, 0);
}

input.onKeyDown(input.KEY_SPACE, jump);
input.onKeyHeld(input.KEY_A, moveLeft);
input.onKeyHeld(input.KEY_D, moveRight);

function Init(x, y) {
    livingEntityComp = scripts.addScript("scripts/living_entity.js", x, y, PLAYER_SIZE);
    transform = current.getComponent("Transform");
    rigidbody = scripts.getScript("Rigidbody");
}
