import { Menu } from "./menu";
import { newSpecPage } from "@stencil/core/testing";

describe("menu", () => {
  let page;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [Menu],
      html: `<clio-menu><clio-menu-item>One</clio-menu-item><clio-menu-item>Two</clio-menu-item></clio-menu>`,
      supportsShadowDom: false,
    });

    page.rootInstance.findFirstFocusableMenuItem = jest.fn();
    page.rootInstance.focusListItemElement = jest.fn();
  });

  it("renders menu with transcluded content", () => {
    expect(page.root).toEqualHtml(`
      <clio-menu>
        <ul class="menu" role="menu">
          <clio-menu-item>One</clio-menu-item>
          <clio-menu-item>Two</clio-menu-item>
        </ul>
      </clio-menu>
    `);
  });

  describe("keyboard navigation in older browsers", () => {
    // Internet Explorer, Edge (16 and earlier), and Firefox (36 and earlier) use "Down" instead of "ArrowDown" for the "key" value of a KeyboardEvent when the down arrow key is pressed
    it("moves focus to the next menu item when the 'Down' key is pressed", () => {
      const menu = page.root.querySelector(".menu");
      page.rootInstance.findNextFocusableMenuItem = jest.fn();
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Down" }));
      expect(page.rootInstance.findNextFocusableMenuItem).toHaveBeenCalledTimes(1);
    });

    // Internet Explorer, Edge (16 and earlier), and Firefox (36 and earlier) use "Up" instead of "ArrowUp" for the "key" value of a KeyboardEvent when the up arrow key is pressed
    it("moves focus to the previous menu item when the 'Up' key is pressed", () => {
      const menu = page.root.querySelector(".menu");
      page.rootInstance.findPreviousFocusableMenuItem = jest.fn();
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Up" }));
      expect(page.rootInstance.findPreviousFocusableMenuItem).toHaveBeenCalledTimes(1);
    });
  });

  describe("clioPopoverVisibilityToggled", () => {
    describe("when active is set to 'true' and autofocus is set to 'true'", () => {
      it("calls the findFirstFocusableMenuItem and focusListItemElement functions", async () => {
        page.body.dispatchEvent(
          new CustomEvent("clioPopoverVisibilityToggled", { detail: { active: true, autofocus: true } }),
        );

        expect(page.rootInstance.findFirstFocusableMenuItem).toHaveBeenCalledTimes(1);
        expect(page.rootInstance.focusListItemElement).toHaveBeenCalledTimes(1);
      });
    });

    describe("when active is set to 'true' and autofocus is set to 'false'", () => {
      it("calls the findFirstFocusableMenuItem and focusListItemElement functions", async () => {
        page.body.dispatchEvent(
          new CustomEvent("clioPopoverVisibilityToggled", { detail: { active: true, autofocus: false } }),
        );

        expect(page.rootInstance.findFirstFocusableMenuItem).not.toHaveBeenCalled();
        expect(page.rootInstance.focusListItemElement).not.toHaveBeenCalled();
      });
    });

    describe("when active is set to 'false'", () => {
      it("does NOT call the findFirstFocusableMenuItem and focusListItemElement functions", async () => {
        page.body.dispatchEvent(
          new CustomEvent("clioPopoverVisibilityToggled", { detail: { active: false, autofocus: true } }),
        );

        expect(page.rootInstance.findFirstFocusableMenuItem).not.toHaveBeenCalled();
        expect(page.rootInstance.focusListItemElement).not.toHaveBeenCalled();
      });
    });
  });
});
