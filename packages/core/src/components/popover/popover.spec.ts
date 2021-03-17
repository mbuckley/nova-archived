import { Popover } from "./popover";
import { newSpecPage, SpecPage } from "@stencil/core/testing";

describe("Popover", () => {
  let page: SpecPage;
  let popover: HTMLClioPopoverElement;
  let activator: HTMLElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [Popover],
      html: `
        <button>Activator</button>
        <clio-popover></clio-popover>
      `,
      supportsShadowDom: false,
    });

    popover = page.body.querySelector("clio-popover");
    activator = page.body.querySelector("button");
  });

  describe("componentDidRender()", () => {
    it("does not try to explicitly focus the activator", () => {
      activator.focus = jest.fn();
      popover.activator = activator;
      expect(activator.focus).not.toHaveBeenCalled();
    });

    // In Internet Explorer (tested on release 9 and 11) and Firefox 36 and earlier, the Esc key returns "Esc" instead of "Escape".
    it("sets focus on the activator and sets active to false when 'Esc' is pressed", async () => {
      popover.active = true;

      const contentContainer = page.root.querySelector(".popover__content-container");
      page.rootInstance.focusActivator = jest.fn();
      contentContainer.dispatchEvent(new KeyboardEvent("keydown", { key: "Esc" }));

      expect(page.rootInstance.focusActivator).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.active).toBe(false);
    });
  });
});
