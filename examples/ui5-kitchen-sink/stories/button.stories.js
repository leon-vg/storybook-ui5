import { document } from 'global';
import { action } from '@storybook/addon-actions';
import { useEffect } from '@storybook/client-api';

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

const Template = (args) => `<MyButton xmlns="alliander" text="${args.text}" />`;

export const MyButton = Template.bind({});

MyButton.args = {
  text: "Hello!"
}