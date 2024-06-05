const SCRIPT_NAME = "LivingEntity";

const HIT_UP = 0;
const HIT_DOWN = 1;
const HIT_LEFT = 2;
const HIT_RIGHT = 3;
const JUMP_SPEED = 375;

function isFalling(rigidbody) {
    const speedY = rigidbody.getProperty("speedY");
    return speedY < 0;
}

var transform, rigidbody;
var entitySize;

function Init(x, y, size) {
    entitySize = size;
    transform = current.addComponent("Transform", x, y);

    current.addComponent("Rect", size, size);
    current.addComponent("RectRenderer");
    var collider = current.addComponent("RectCollider", size, size);
    rigidbody = scripts.addScript("scripts/rigidbody.js");

    collider.onCollision(function (other, hitX, hitY, hitDirection) {
        if (other.hasLabel("Floor")
            && hitDirection === HIT_UP
            && isFalling(rigidbody)
            && transform.getWorldPosition().y + 5 > hitY
        ) {
            transform.setLocalPosition(null, hitY);
            rigidbody.setProperty("speedY", 0);
            script.properties.canJump = true;
            return;
        }

        if (other.hasLabel("Wall")) {
            transform.setLocalPosition(hitX, null);
        }
    });
}

function FixedUpdate() {
    const worldPos = transform.getWorldPosition();

    const screenWidth = 774, screenHeight = 676;

    if (worldPos.y < -entitySize)
        transform.setLocalPosition(null, screenHeight);
}

function jump() {
    if (!script.properties.canJump)
        return;

    rigidbody.setProperty("speedY", JUMP_SPEED);
    script.properties.canJump = false;
}

script.properties = {
    canJump: false,
};

script.api = {
    jump,
};
