jest.mock("../../utils/helpers");

import { Select } from "./select";
import { Input } from "../input/input";
import { newSpecPage, SpecPage } from "@stencil/core/testing";

describe("Select", () => {
  it("sets autofocus to true on its inner clio-input element when autofocus is set to true", async () => {
    const page = await newSpecPage({
      components: [Select, Input],
      html: `<clio-select autofocus="true"></clio-select>`,
      supportsShadowDom: true,
    });

    const textInput = page.root.querySelector("clio-input");
    expect(textInput).toHaveProperty("autofocus", true);
  });

  it("sets autofocus to false on its inner clio-input element when autofocus is set to false", async () => {
    const page = await newSpecPage({
      components: [Select, Input],
      html: `<clio-select autofocus="false"></clio-select>`,
      supportsShadowDom: true,
    });

    const textInput = page.root.querySelector("clio-input");
    expect(textInput).toHaveProperty("autofocus", false);
  });

  describe("keyboard navigation works when the dropdown is visible", () => {
    let page: SpecPage;
    let select: Element;

    beforeEach(async () => {
      page = await newSpecPage({
        components: [Select, Input],
        html: `<clio-select autofocus="false"></clio-select>`,
        supportsShadowDom: true,
      });
      select = page.root.querySelector(".select");
      page.rootInstance.focusFirstMenuItem = jest.fn();
      page.rootInstance.focusLastMenuItem = jest.fn();
      page.rootInstance.focusNextMenuItem = jest.fn();
      page.rootInstance.focusPreviousMenuItem = jest.fn();
      page.rootInstance.resetSelect = jest.fn();
      page.rootInstance.isExpanded = true;
      page.rootInstance.items = [
        { label: "Associate", value: 1 },
        { label: "Liaison", value: 2 },
        { label: "Consultant", value: 3 },
      ];
    });

    it("moves focus to the next item when the 'ArrowDown' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));

      expect(page.rootInstance.focusNextMenuItem).toHaveBeenCalledTimes(1);
    });

    // Internet Explorer, Edge (16 and earlier), and Firefox (36 and earlier) use "Down" instead of "ArrowDown" for the "key" value of a KeyboardEvent when the down arrow key is pressed
    it("moves focus to the next item when the 'Down' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "Down" }));

      expect(page.rootInstance.focusNextMenuItem).toHaveBeenCalledTimes(1);
    });

    it("moves focus to the previous item when the 'ArrowUp' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));

      expect(page.rootInstance.focusPreviousMenuItem).toHaveBeenCalledTimes(1);
    });

    // Internet Explorer, Edge (16 and earlier), and Firefox (36 and earlier) use "Up" instead of "ArrowUp" for the "key" value of a KeyboardEvent when the up arrow key is pressed
    it("moves focus to the previous item when the 'Up' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "Up" }));

      expect(page.rootInstance.focusPreviousMenuItem).toHaveBeenCalledTimes(1);
    });

    it("closes the open dropdown when the 'Escape' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

      expect(page.rootInstance.resetSelect).toHaveBeenCalledTimes(1);
    });

    // In Internet Explorer (tested on release 9 and 11) and Firefox 36 and earlier, the Esc key returns "Esc" instead of "Escape".
    it("closes the open dropdown when the 'Esc' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "Esc" }));

      expect(page.rootInstance.resetSelect).toHaveBeenCalledTimes(1);
    });

    it("moves focus to the last item when the 'Home' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));

      expect(page.rootInstance.focusFirstMenuItem).toHaveBeenCalledTimes(1);
    });

    it("moves focus to the first item when the 'End' key is pressed", () => {
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));

      expect(page.rootInstance.focusLastMenuItem).toHaveBeenCalledTimes(1);
    });
  });

  it("sets autofocus to false on its inner clio-input element when autofocus is not set", async () => {
    const page = await newSpecPage({
      components: [Select, Input],
      html: `<clio-select></clio-select>`,
      supportsShadowDom: true,
    });

    const textInput = page.root.querySelector("clio-input");
    expect(textInput).toHaveProperty("autofocus", false);
  });

  it("renders the component with a label if specified", async () => {
    const page = await newSpecPage({
      components: [Select, Input],
      html: `<clio-select label="Foo"></clio-select>`,
      supportsShadowDom: false,
    });

    const label = page.root.querySelector("clio-label");

    expect(label).toEqualHtml(`
      <clio-label id="clio-label-UUID" for="clio-input-UUID">Foo</clio-label>
    `);
  });

  it("renders the component with a sub-label if specified", async () => {
    const page = await newSpecPage({
      components: [Select, Input],
      html: `<clio-select sub-label="Bar"></clio-select>`,
      supportsShadowDom: false,
    });

    const subLabel = page.root.querySelector("clio-label");

    expect(subLabel).toEqualHtml(`
      <clio-label id="clio-sub-label-UUID" label-type="sub-label">Bar</clio-label>
    `);
  });
});
