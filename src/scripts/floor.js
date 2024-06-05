const SCRIPT_NAME = "Floor";

var transform, rect;

function Init(x, y, width, height) {
    transform = current.addComponent("Transform", x, y);
    rect = current.addComponent("Rect", width, height);
    current.addComponent("RectRenderer");
    current.addComponent("RectCollider", width, height);
}
