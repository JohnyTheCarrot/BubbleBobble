const SCRIPT_NAME = "Player";

const utils = require("utils.js");

const PLAYER_SIZE = 50;
const PLAYER_START_X = 100;
const PLAYER_START_Y = 100;
const JUMP_SPEED = 375;
const MOVEMENT_SPEED = 300;

var transform, rigidbody, collider;

const HIT_UP = 0;
const HIT_DOWN = 1;
const HIT_LEFT = 2;
const HIT_RIGHT = 3;

var canJump = false;

function jump() {
    if (!canJump)
        return;

    rigidbody.setProperty("speedY", JUMP_SPEED);
}

function moveLeft() {
    utils.translate(transform, -MOVEMENT_SPEED, 0);
}

function moveRight() {
    utils.translate(transform, MOVEMENT_SPEED, 0);
}

function isFalling() {
    const speedY = rigidbody.getProperty("speedY");
    return speedY < 0;
}

input.onKeyDown(input.KEY_SPACE, jump);
input.onKeyHeld(input.KEY_A, moveLeft);
input.onKeyHeld(input.KEY_D, moveRight);

function Init() {
    transform = current.addComponent("Transform", PLAYER_START_X, PLAYER_START_Y);

    current.addComponent("Rect", PLAYER_SIZE, PLAYER_SIZE);
    current.addComponent("RectRenderer");
    collider = current.addComponent("RectCollider", PLAYER_SIZE, PLAYER_SIZE);
    rigidbody = scripts.addScript("scripts/rigidbody.js");

    collider.onCollision(function(other, hitX, hitY, hitDirection) {
        const otherScripts = other.getComponent("Scripts");
        if (!otherScripts) {
            return;
        }

        const floorScript = otherScripts.getScript("Floor");
        if (floorScript && hitDirection === HIT_UP && isFalling() && transform.getWorldPosition().y + 5 > hitY) {
            transform.setLocalPosition(null, hitY);
            rigidbody.setProperty("speedY", 0);
            canJump = true;
            return;
        } else {
            canJump = false;
        }

        const wallScript = otherScripts.getScript("Wall");
        if (wallScript) {
            transform.setLocalPosition(hitX, null);
        }
    });
}

function FixedUpdate() {
    const worldPos = transform.getWorldPosition();

    const screenWidth = 800, screenHeight = 600;

    if (worldPos.y < -PLAYER_SIZE)
        transform.setLocalPosition(null, screenHeight);
}
