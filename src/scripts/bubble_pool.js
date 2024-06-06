const SCRIPT_NAME = "BubblePool";

const POOL_SIZE = 15;

var gameObjects = [];

function Init() {
    for (var i = 0; i < POOL_SIZE; ++i) {
        const gameObject = scene.addGameObject();
        gameObject.addComponent("Scripts").addScript("scripts/bubble.js");

        gameObjects.push(gameObject);
    }
}

function spawnBubble(x, y, facingDir) {
    for (var i = 0; i < gameObjects.length; ++i) {
        const gameObject = gameObjects[i];
        if (gameObject.getEnabled())
            continue;

        var bubbleScript = gameObject.getComponent("Scripts").getScript("Bubble");
        bubbleScript.callMethod("spawn", x, y, facingDir);

        break;
    }
}

script.api = {
    spawnBubble,
}
