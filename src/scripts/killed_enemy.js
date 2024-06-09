const SCRIPT_NAME = "KilledEnemy";

const constants = require("constants.js");
const utils = require("utils.js");

var transform;

const WIDTH = 50;
const HEIGHT = 50;
const GRAVITY = 200;

var speedX = 200;
var speedY = 300;

function Init(x, y) {
    speedX = utils.randomRange(-200, 200);

    transform = current.addComponent("Transform", x, y);
    current.addComponent("AnimationRenderer", "res/img/ZenChanDeath.png", 4, 0.1, WIDTH, HEIGHT);

    const collider = current.addComponent("RectCollider", WIDTH, HEIGHT);
    collider.onCollision(function (other, hitX, hitY, hitDir) {
        if (other.hasLabel("Wall")) {
            switch (hitDir) {
            case constants.HIT_RIGHT:
            case constants.HIT_LEFT:
                speedX *= -1;
                break;
            }
            return;
        }

        if (other.hasLabel("FullCollision")) {
            speedY = -Math.abs(speedY);
            return;
        }

        if (other.hasLabel("Floor") && speedY <= 0 && transform.getWorldPosition().y + 5 > hitY && hitDir === constants.HIT_UP) {
            current.setEnabled(false);
            const foodObject = scene.addGameObject();
            foodObject.addComponent("Scripts").addScript("scripts/food.js", hitX, hitY);
        }
    });
}

function Update(dt) {
    speedY -= GRAVITY * dt;
    transform.translate(speedX * dt, speedY * dt);
}
