import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

describe("checkbox", () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("@a11y", () => {
    describe("Attributes/Properties", () => {
      describe("aria-describedby", () => {
        it("sets `aria-describedby` if an `id` is provided", async () => {
          await page.setContent(`<clio-checkbox aria-describedby="test-id"></clio-checkbox>`);
          component = await page.find("clio-checkbox input");

          expect(component).toEqualAttribute("aria-describedby", "test-id");
        });
      });

      describe("aria-label", () => {
        it("sets `aria-label` if a string is provided", async () => {
          await page.setContent(`<clio-checkbox aria-label="this is a test label"></clio-checkbox>`);
          component = await page.find("clio-checkbox input");

          expect(component).toEqualAttribute("aria-label", "this is a test label");
        });
      });

      describe("aria-labelledby", () => {
        it("sets `aria-labelledby` if an `id` is provided", async () => {
          await page.setContent(`<clio-checkbox aria-labelledby="test-id"></clio-checkbox>`);
          component = await page.find("clio-checkbox input");

          expect(component).toEqualAttribute("aria-labelledby", "test-id");
        });
      });
    });
  });
});
