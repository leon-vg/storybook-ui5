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