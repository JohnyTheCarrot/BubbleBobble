const SCRIPT_NAME = "Food";

const WIDTH = 50;
const HEIGHT = 50;

function Init(x, y) {
    current.addComponent("Transform", x, y);
    current.addComponent("TextureRenderer", "res/img/Watermelon.png", WIDTH, HEIGHT);
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
