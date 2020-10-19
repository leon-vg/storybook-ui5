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
      evt.getSource().setText("Change the text");
    }
  },
  template: `<ReverseButton xmlns="custom" text="${args.text}" press="press" />`
})

export const SimpleWithController = TemplateWithController.bind({});