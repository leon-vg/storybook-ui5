import { sap } from 'global';
import dedent from 'ts-dedent';
import { RenderMainArgs } from './types';

export default function renderMain({
  storyFn,
  selectedKind,
  selectedStory,
  showMain,
  showError,
  forceRender,
}: RenderMainArgs) {
  const element = storyFn();

  showMain();

  if (typeof element !== "string") {
    showError({
      title: `Expecting an XML fragment from the story: "${selectedStory}" of "${selectedKind}".`,
      description: dedent`
        Did you forget to return the XML fragment from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `,
    });
    return;
  }

  sap.ui.getCore().attachInit(() => {
    sap.ui.require(["sap/ui/core/Fragment"], async function(Fragment: any) {
      const fragment = await Fragment.load({
        type: "XML",
        definition: element
      });
      fragment.placeAt("root", "only");
    });
  });
}
