const SCRIPT_NAME = "EnemyBubble";

const BUBBLE_WIDTH = 40;
const BUBBLE_HEIGHT = 50;
const FLOAT_SPEED = 50;


var transform;

function Init(x, y) {
    transform = current.addComponent("Transform", x, y);
    current.addComponent("RectRenderer", BUBBLE_WIDTH, BUBBLE_HEIGHT);
    current.addComponent("RectCollider", BUBBLE_WIDTH, BUBBLE_HEIGHT);
    current.setLabel("EnemyBubble");
}

function Update(dt) {
    transform.translate(0, FLOAT_SPEED * dt);
}

function pop() {
    current.destroy();
    const worldPos = transform.getWorldPosition();

    var killedEnemy = scene.addGameObject();
    var kiaEnemyScripts = killedEnemy.addComponent("Scripts");
    kiaEnemyScripts.addScript("scripts/killed_enemy.js", worldPos.x, worldPos.y);
}

script.api = {
    pop,
};
