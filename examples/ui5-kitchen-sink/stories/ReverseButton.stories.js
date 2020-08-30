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