import { newE2EPage, E2EPage, E2EElement } from "@stencil/core/testing";

describe("@a11y", () => {
  let page: E2EPage;
  let rootEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("aria-label", () => {
    describe("When a string is provided", () => {
      beforeEach(async () => {
        await page.setContent(`<clio-icon name="caret-down" aria-label="Foo"></clio-icon>`);
        rootEl = await page.find("clio-icon");
      });
      it("correctly labels the component", () => {
        expect(rootEl.getAttribute("aria-label")).toEqual("Foo");
      });
    });

    describe("When a string is NOT provided", () => {
      beforeEach(async () => {
        await page.setContent(`<clio-icon name="caret-down"></clio-icon>`);
        rootEl = await page.find("clio-icon");
      });
      it("generates a value based on the icon's name", () => {
        expect(rootEl.getAttribute("aria-label")).toEqual("caret down");
      });
    });
  });
});
