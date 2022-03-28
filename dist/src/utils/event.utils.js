export var Keys;
(function (Keys) {
    Keys[Keys["Escape"] = 27] = "Escape";
})(Keys || (Keys = {}));
export var MouseButtons;
(function (MouseButtons) {
    MouseButtons[MouseButtons["Left"] = 0] = "Left";
    MouseButtons[MouseButtons["Right"] = 2] = "Right";
})(MouseButtons || (MouseButtons = {}));
export function isLeftButtonClicked(e) {
    return e.button === MouseButtons.Left;
}
export function isRightButtonClicked(e) {
    return e.button === MouseButtons.Right;
}
export function isEscapePressed(e) {
    return e.keyCode === Keys.Escape;
}
//# sourceMappingURL=event.utils.js.map