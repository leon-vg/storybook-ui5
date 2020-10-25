const react = require("react");
export const parameters = {
    docs: {
      inlineStories: true,
      prepareForInline: function prepareForInline(storyFn) {
        var element = storyFn();
        const html = document.createElement("div");

        const controller = element.controller ? element.controller : {};

        sap.ui.getCore().attachInit(() => {
          sap.ui.require(["sap/ui/core/mvc/XMLView", "sap/ui/core/mvc/Controller"], async function(XMLView, ControllerClass) {
            const Controller = ControllerClass.extend("whatever", controller)
            const fragment = await XMLView.create({
              definition: `<mvc:View xmlns:mvc="sap.ui.core.mvc">${element.template ? element.template : element}</mvc:View>`,
              controller: controller ? new Controller(): undefined
            });
            fragment.placeAt(html, "only");
          });
        });
  
        return react.createElement("div", {
          ref: function ref(node) {
            return node ? node.appendChild(html) : null;
          }
        });

      }
	}
}