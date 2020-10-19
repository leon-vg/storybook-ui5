import { StoryFn } from '@storybook/addons';

export type StoryFnXmlReturnType = string | IStoryFnReturnType;

export interface IStoryFnReturnType {
  template: string;
  controller:any;
}

export interface IStorybookStory {
  name: string;
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export interface RenderMainArgs {
  storyFn: () => StoryFn<StoryFnXmlReturnType>;
  selectedKind: string;
  selectedStory: string;
  showMain: () => void;
  showError: (args: ShowErrorArgs) => void;
  forceRender: boolean;
  args: any;
}
