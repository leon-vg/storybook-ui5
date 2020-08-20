"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = require("global");
var ts_dedent_1 = __importDefault(require("ts-dedent"));
var rootElement = global_1.document.getElementById('root');
function renderMain(_a) {
    var storyFn = _a.storyFn, selectedKind = _a.selectedKind, selectedStory = _a.selectedStory, showMain = _a.showMain, showError = _a.showError, forceRender = _a.forceRender;
    var element = storyFn();
    showMain();
    if (typeof element === 'string') {
        rootElement.innerHTML = element;
    }
    else if (element instanceof global_1.Node) {
        // Don't re-mount the element if it didn't change and neither did the story
        if (rootElement.firstChild === element && forceRender === true) {
            return;
        }
        rootElement.innerHTML = '';
        rootElement.appendChild(element);
    }
    else {
        showError({
            title: "Expecting an HTML snippet or DOM node from the story: \"" + selectedStory + "\" of \"" + selectedKind + "\".",
            description: ts_dedent_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        Did you forget to return the HTML snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "], ["\n        Did you forget to return the HTML snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "]))),
        });
    }
}
exports.default = renderMain;
var templateObject_1;
