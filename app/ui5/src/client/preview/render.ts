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
  const element:any = storyFn();

  showMain();

  if (typeof element !== "string" && !element.controller) {
    showError({
      title: `Returned value from storyfunction not to spec: "${selectedStory}" of "${selectedKind}".`,
      description: dedent`
        Did you forget to return the XML fragment from the story?
        Use "() => <your snippet or node>" or when defining the story.
        A storyfunction should either return an XML fragment (string) or an object with two properties: 'template' and 'controller'.
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

  // TODO: don't overwrite the actions on the controller object, but trigger them as well when defining custom logic manually
  if (element.controller) {
    Object.assign(controller, element.controller)
  }

  sap.ui.getCore().attachInit(() => {
    sap.ui.require(["sap/ui/core/Fragment"], async function(Fragment: any) {
      const fragment = await Fragment.load({
        type: "XML",
        definition: element.template ? element.template : element,
        controller: controller
      });
      fragment.placeAt("root", "only");
    });
  });
}
