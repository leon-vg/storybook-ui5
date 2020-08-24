export default {
  title: 'Demo',
  argTypes: {
    text: {
      control: 'text'
    }
  },
  parameters: {
    docs: {
      inlineStories: false
    }
  }
};

const Template = (args) => `<MyButton xmlns="custom" text="${args.text}" />`;

export const MyButton = Template.bind({});

MyButton.args = {
  text: "Hello!"
}