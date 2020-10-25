# Storybook for UI5

---

[Storybook](https://storybook.js.org/) is a popular tool for developing UI components in isolation. It works with most popular frameworks, but UI5 was not one of them - until now.

With Storybook, you can visualize different states of your controls and develop them interactively. It works with hot module reloading, so you can view your changes as you're making them. It's a great tool for developing UI5 controls in isolation without worrying about app specific dependencies and requirements.

But enough talk, just checkout [the demo](https://leon-vg.github.io/storybook-ui5/) to see Storybook-UI5 in action!

## Quick Start

Perhaps the easiest way to get up and running is by copying the contents of the [example project](https://github.com/leon-vg/storybook-ui5/tree/master/examples/ui5-kitchen-sink) to a new folder. You could clone the github project first to make copying easier.

Next, run `npm install` and run `npm run storybook`. After a minute or so, the application should launch in your browser. Try changing a story and see how it is rendered immediately without a refresh.

## Integration in existing project

Storybook-UI5 can run completely seperate from your project. It only needs access to the various controls that you wish to demo.

In your node project, install the following dependencies

```
npm install --save-dev storybook-ui5 @storybook/addon-essentials@6 @babel/core@7 babel-loader@8 webpack@4
```

Next, create a `.storybook` folder and in it add a `main.js` file with the following contents:

``` 
// .storybook/main.js
module.exports = {
  stories: [`../stories/*.stories.*`],
  addons: [
    "@storybook/addon-essentials"
  ]
};
```

Also add a `preview.js` file in this folder:

```
// .storybook/preview.js
export const parameters = {
    docs: {
      // This setting makes sure that UI5 controls are rendered in the 'Docs' section in Storybook
      inlineStories: false 
	}
}
```

Next, also a `preview-head.html` file:

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

Put your custom controls (which you want to show in Storybook) in the folder `components/[namespace]/[control].js`, for example:
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

Then, create the corresponding story in the `stories` folder:

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