const SCRIPT_NAME = "Floor";

function Init(x, y, width, height) {
    current.addComponent("Transform", x, y);
    current.addComponent("RectRenderer", width, height);
    current.addComponent("RectCollider", width, height);
}
