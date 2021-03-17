import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

describe("form", () => {
  let page: E2EPage;
  let formEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("@a11y", () => {
    describe("Attributes/Properties", () => {
      describe("aria-label", () => {
        it("adds `aria-label` when provided", async () => {
          await page.setContent(`<clio-form aria-label="foo"></clio-form>`);
          formEl = await page.find("clio-form form");

          expect(formEl).toEqualAttribute("aria-label", "foo");
        });
      });

      describe("aria-labelledby", () => {
        it("adds `aria-labelledby` when provided", async () => {
          await page.setContent(`<clio-form aria-labelledby="foo-id"></clio-form>`);
          formEl = await page.find("clio-form form");

          expect(formEl).toEqualAttribute("aria-labelledby", "foo-id");
        });
      });

      describe("aria-describedby", () => {
        it("adds `aria-describedby` when provided", async () => {
          await page.setContent(`<clio-form aria-describedby="bar-id"></clio-form>`);
          formEl = await page.find("clio-form form");

          expect(formEl).toEqualAttribute("aria-describedby", "bar-id");
        });
      });
    });
  });
});
