const SCRIPT_NAME = "Enemy";
const utils = require("utils.js");

const ENEMY_SIZE = 37;
const MOVE_SPEED = 100;
const MAX_PLAYER_ENEMY_DISTANCE = 50;

const HIT_UP = 0;
const HIT_DOWN = 1;
const HIT_LEFT = 2;
const HIT_RIGHT = 3;

var playerObject, playerTransform, livingEntityComp;
var transform, rigidbody;

var isWanderingLeft = false;

function moveRight() {
    if (!livingEntityComp.getProperty("canJump"))
        return;

    utils.translate(transform, MOVE_SPEED, 0);
    isWanderingLeft = false;
}

function moveLeft() {
    if (!livingEntityComp.getProperty("canJump"))
        return;

    utils.translate(transform, -MOVE_SPEED, 0);
    isWanderingLeft = true;
}

function die() {
    current.destroy();
    const worldPos = transform.getWorldPosition();

    var enemyBubble = scene.addGameObject();
    enemyBubble.addComponent("Scripts").addScript("scripts/enemy_bubble.js", worldPos.x, worldPos.y);
}

function Init(x, y, hPlayer) {
    playerObject = scene.getGameObject(hPlayer);
    playerTransform = playerObject.getComponent("Transform");
    livingEntityComp = scripts.addScript("scripts/living_entity.js", x, y, ENEMY_SIZE);

    transform = current.getComponent("Transform");
    var renderer = current.getComponent("RectRenderer");
    renderer.setColor(0xd83a3a);

    var collider = current.getComponent("RectCollider");
    collider.onCollision(function (other, hitX, hitY, hitDir) {
        if (other.hasLabel("Wall")) {
            isWanderingLeft = hitDir === HIT_LEFT;
            return;
        }

        if (other.hasLabel("Enemy")) {
            switch (hitDir) {
            case HIT_LEFT:
                moveLeft();
                break;
            case HIT_RIGHT:
                moveRight();
                break;
            }
            return;
        }

        if (other.hasLabel("Bubble")) {
            die();
            other.setEnabled(false);
        }
    })

    rigidbody = scripts.getScript("Rigidbody");
}

function Update() {
    const playerPos = playerTransform.getWorldPosition();
    const ownPos = transform.getWorldPosition();

    const yDistanceTooLarge = Math.abs(ownPos.y - playerPos.y) > MAX_PLAYER_ENEMY_DISTANCE;

    if (yDistanceTooLarge) {
        if (ownPos.y > playerPos.y) {
            if (isWanderingLeft) moveLeft()
            else moveRight();
            return;
        }
    }

    const xDistanceTooLarge = Math.abs(ownPos.x - playerPos.x) > MAX_PLAYER_ENEMY_DISTANCE;

    if (xDistanceTooLarge) {
        if (ownPos.x < playerPos.x)
            moveRight();
        else
            moveLeft();
        return;
    }

    if (yDistanceTooLarge)
        livingEntityComp.callMethod("jump");
}
