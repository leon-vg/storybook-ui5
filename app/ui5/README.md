# Storybook for UI5

---

[Storybook](https://storybook.js.org/) is a popular tool for developing UI components in isolation. It works with most popular frameworks, but UI5 was not one of them so far.

With Storybook, you can visualize different states of your UI components and develop them interactively. It works with hot module reloading, so you can view your changes as you're making them.

Storybook runs outside of your app, so you can develop UI components in isolation without worrying about app specific dependencies and requirements. It's a great tool for working on controls in isolation. 

## Getting Started

### Quick start

Copy the contents of the [example project](https://github.com/leon-vg/storybook-ui5/tree/master/examples/ui5-kitchen-sink) to a new folder. You could clone the github project first to make copying easier.

Run `npm install` and run `npm run storybook`.

### Slow start

In your node project, install the following needed dependencies:

```
npm install storybook-ui5 @storybook/addon-essentials@6 @babel/core@7 babel-loader@8 webpack@4
```

Create a .storybook folder and add a main.js file:

``` 
// .storybook/main.js
module.exports = {
  stories: [`../stories/*.stories.*`],
  addons: [
    "@storybook/addon-essentials"
  ]
};
```

Also add a preview.js file:

```
// .storybook/preview.js
export const parameters = {}
```

And a preview-head.html file:

```
<!-- .storybook/preview-head.html -->
<script id="sap-ui-bootstrap"
	src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
	data-sap-ui-theme="sap_belize"
	data-sap-ui-libs="sap.m, sap.ui.layout, sap.tnt"
	data-sap-ui-resourceroots='{"custom": "./custom"}'
	data-sap-ui-async="true">
</script>
```

Next, put your custom controls in the folder components/[namespace]/[control].js, for example:
```
// components/custom/ReverseButton.js
sap.ui.define(["sap/m/Button"], function (Button) {
	
	return Button.extend("ReverseButton", {

		setText: function (text) {
			this.setProperty("text", text.split("").reverse().join(""));
		},

		renderer: {}
	});

});
```

Then, create your first story in the stories folder:

```
// stories/ReverseButton.stories.js
export default {
  title: 'ReverseButton',
  argTypes: {
    text: {
      control: 'text'
    }
  }
};

const Template = (args) => `<ReverseButton xmlns="custom" text="${args.text}" />`;

export const Simple = Template.bind({});

Simple.args = {
  text: "Wait, this is weird!"
}
````

Now you can start working on your storybook. Add two scripts to the package.json. The flag `-s ./components` makes sure the contents of the components folder are served as static resources in the http-server that storybook creates.

```
  // package.json
  "scripts": {
    "storybook": "start-storybook -s ./components -p 9001",
    "build-static": "build-storybook -s ./components"
  }
```

Now run UI5 storybook

```
npm run storybook
```

## Hot module reload

When running `npm run storybook`, the browser should show the storybook.

Make your changes to existing stories or start adding new story files to the project and the changes should be reflected immediately.

## Adding controls and writing stories

Add controls to the components folder and add a new file to the stories folder, using the filename of the control, but with the .stories.js filename ending.

Story functions should output XML. The outputted XML is rendered by a [Fragment.load()](https://github.com/leon-vg/storybook-ui5/blob/master/app/ui5/src/client/preview/render.ts#L28) function by storybook-ui5. Namespaces can added and changed by changing the `data-sap-ui-resourceroots` property in the ui5 bootstrap script in the [preview-head.html](https://github.com/leon-vg/storybook-ui5/blob/master/examples/ui5-kitchen-sink/.storybook/preview-head.html) file.

See the [example](https://github.com/leon-vg/storybook-ui5/blob/master/examples/ui5-kitchen-sink/stories/ReverseButton.stories.js) for writing a simple story and look in the [Storybook documentation](https://storybook.js.org/docs/html/writing-stories/introduction) for the complete instructions.

## More reading

Read the [storybook docs](https://storybook.js.org/) for more information on Storybook and its features. Though UI5 is not listed as a framework, most features should apply. The [HTML docs](https://storybook.js.org/docs/html/get-started/introduction) are probably the most applicable.