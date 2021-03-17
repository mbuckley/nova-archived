import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

describe("button", () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  afterEach(() => {
    page = null;
  });

  describe("@a11y", () => {
    describe("Attributes/Properties", () => {
      describe("aria-disabled", () => {
        it("adds `aria-disabled` when `disabled='true'`", async () => {
          await page.setContent(`<clio-button disabled="true"></clio-button>`);
          component = await page.find("clio-button >>> button");

          expect(component).toEqualAttribute("aria-disabled", "true");
        });

        it("adds `aria-disabled` when `loading='true'`", async () => {
          await page.setContent(`<clio-button loading="true"></clio-button>`);
          component = await page.find("clio-button >>> button");

          expect(component).toEqualAttribute("aria-disabled", "true");
        });

        it("does NOT add `aria-disabled` when no properties are set`", async () => {
          await page.setContent(`<clio-button></clio-button>`);
          component = await page.find("clio-button >>> button");

          expect(component).not.toHaveAttribute("aria-disabled");
        });

        it("does NOT add `aria-disabled` when `disabled='false'`", async () => {
          await page.setContent(`<clio-button disabled="false"></clio-button>`);
          component = await page.find("clio-button >>> button");

          expect(component).not.toHaveAttribute("aria-disabled");
        });

        it("does NOT add `aria-disabled` when `loading='false'`", async () => {
          await page.setContent(`<clio-button loading="false"></clio-button>`);
          component = await page.find("clio-button >>> button");

          expect(component).not.toHaveAttribute("aria-disabled");
        });
      });
    });
  });
});
