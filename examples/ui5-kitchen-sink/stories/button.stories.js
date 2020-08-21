import { document } from 'global';
import { action } from '@storybook/addon-actions';
import { useEffect } from '@storybook/client-api';

export default {
  title: 'Demo',
};

export const MyButton = () => '<MyButton xmlns="alliander" text="HAALO!" />';