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
  args,
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

  const controller:any = {};

  for (const property in args) {
    if (args[property].name === "actionHandler") {
      controller[property] = (event: any) => {
        delete event.oSource; // oSource causes problems due to a circular reference, so we just delete it
        args[property](event);
      }
    }
  }

  sap.ui.getCore().attachInit(() => {
    sap.ui.require(["sap/ui/core/Fragment"], async function(Fragment: any) {
      const fragment = await Fragment.load({
        type: "XML",
        definition: element,
        controller: controller
      });
      fragment.placeAt("root", "only");
    });
  });
}
