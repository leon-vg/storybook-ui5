export default {
  title: 'ReverseButton',
  argTypes: {
    text: {
      control: 'text'
    },
    press: {
      action: "press"
    }
  }
};

const Template = (args) => `<ReverseButton xmlns="custom" text="${args.text}" press="press" />`;

export const Simple = Template.bind({});

Simple.args = {
  text: "Wait, this is weird!"
}

const TemplateWithController = (args) => ({
  controller: {
    press: function(evt) {
      this.byId("button").setText("whatever")
      evt.getSource().setText("Change the text");
    }
  },
  template: `<FlexBox xmlns="sap.m">
    <ReverseButton xmlns="custom" text="${args.text}" press="press" />
    <Button id="button" text="" />
  </FlexBox>`
})

export const SimpleWithController = TemplateWithController.bind({});