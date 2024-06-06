const SCRIPT_NAME = "Food";

const WIDTH = 50;
const HEIGHT = 50;

function Init(x, y) {
    current.addComponent("Transform", x, y);
    current.addComponent("Rect", WIDTH, HEIGHT);
    var renderer = current.addComponent("RectRenderer");
    renderer.setColor(0x43ef51);
    current.addComponent("RectCollider", WIDTH, HEIGHT);
    current.setLabel("Food");
}

function eat() {
    roingine.fireEvent("foodEaten");
    current.destroy();
}

script.api = {
    eat,
};
