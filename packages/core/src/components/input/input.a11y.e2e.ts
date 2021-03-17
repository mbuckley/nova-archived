import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

describe("input", () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("@a11y", () => {
    describe("Attributes/Properties", () => {
      describe("aria-describedby", () => {
        it("adds an 'aria-describedby` attribute to the input element", async () => {
          await page.setContent(`<clio-input aria-describedby="foo"></clio-input>`);
          component = await page.find("clio-input .text-input");

          expect(component).toEqualAttribute("aria-describedby", "foo");
        });
      });

      describe("aria-label", () => {
        it("adds an 'aria-label` attribute to the input element", async () => {
          await page.setContent(`<clio-input aria-label="foo"></clio-input>`);
          component = await page.find("clio-input .text-input");

          expect(component).toEqualAttribute("aria-label", "foo");
        });
      });

      describe("aria-labelledby", () => {
        it("adds an 'aria-labelledby` attribute to the input element", async () => {
          await page.setContent(`<clio-input aria-labelledby="foo-element"></clio-input>`);
          component = await page.find("clio-input .text-input");

          expect(component).toEqualAttribute("aria-labelledby", "foo-element");
        });
      });
    });
  });
});
