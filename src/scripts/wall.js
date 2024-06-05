const SCRIPT_NAME = "Wall";

function Init(x, y, width, height) {
    current.addComponent("Transform", x, y);
    current.addComponent("Rect", width, height);
    current.addComponent("RectRenderer");
    current.addComponent("RectCollider", width, height);
}
