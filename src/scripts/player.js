const SCRIPT_NAME = "Player";

const utils = require("utils.js");
const constants = require("constants.js");

const PLAYER_SIZE = 37;
const JUMP_SPEED = 375;
const MOVEMENT_SPEED = 300;

var transform, rigidbody, collider, livingEntityComp;
var bubblePoolScript;
var facingDir = constants.FACING_RIGHT;

function jump() {
    livingEntityComp.callMethod("jump");
}

function die() {
    roingine.println("Death");
}

function moveLeft() {
    utils.translate(transform, -MOVEMENT_SPEED, 0);
    facingDir = constants.FACING_LEFT;
}

function moveRight() {
    utils.translate(transform, MOVEMENT_SPEED, 0);
    facingDir = constants.FACING_RIGHT;
}

function spewBubble() {
    const worldPos = transform.getWorldPosition();
    bubblePoolScript.callMethod("spawnBubble", worldPos.x, worldPos.y, facingDir);
}

input.onKeyDown(input.KEY_SPACE, jump);
input.onKeyHeld(input.KEY_A, moveLeft);
input.onKeyHeld(input.KEY_D, moveRight);
input.onKeyDown(input.KEY_W, spewBubble);

function Init(x, y, hBubblePool) {
    const bubblePool = scene.getGameObject(hBubblePool);
    const bubblePoolScripts = bubblePool.getComponent("Scripts");
    bubblePoolScript = bubblePoolScripts.getScript("BubblePool");

    livingEntityComp = scripts.addScript("scripts/living_entity.js", x, y, PLAYER_SIZE);
    transform = current.getComponent("Transform");
    rigidbody = scripts.getScript("Rigidbody");
}
