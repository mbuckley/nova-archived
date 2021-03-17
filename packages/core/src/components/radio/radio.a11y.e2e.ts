import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

describe("radio", () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("@a11y", () => {
    describe("Attributes/Properties", () => {
      describe("aria-checked", () => {
        it("sets `aria-checked='true'` when checked", async () => {
          await page.setContent(`
            <clio-radio-group value="1">
              <clio-radio value="1"></clio-radio>
            </clio-radio-group>
          `);
          component = await page.find("clio-radio input");
          expect(component).toEqualAttribute("aria-checked", "true");
        });
        it("sets `aria-checked='false'` when NOT checked", async () => {
          await page.setContent(`
            <clio-radio-group value="2">
              <clio-radio value="1"></clio-radio>
            </clio-radio-group>
          `);
          component = await page.find("clio-radio input");
          expect(component).toEqualAttribute("aria-checked", "false");
        });
      });

      describe("aria-disabled", () => {
        it("sets `aria-disabled='true'` when `disabled='true'`", async () => {
          await page.setContent(`<clio-radio disabled="true"></clio-radio>`);
          component = await page.find("clio-radio input");

          expect(component).toEqualAttribute("aria-disabled", "true");
        });

        it("sets does not have an `aria-disabled` attribute when `disabled='false'`", async () => {
          await page.setContent(`<clio-radio disabled="false"></clio-radio>`);
          component = await page.find("clio-radio input");

          expect(component).not.toHaveAttribute("aria-disabled");
        });
      });

      describe("aria-describedby", () => {
        it("sets `aria-describedby` if an `id` is provided", async () => {
          await page.setContent(`<clio-radio aria-describedby="test-id"></clio-radio>`);
          component = await page.find("clio-radio input");

          expect(component).toEqualAttribute("aria-describedby", "test-id");
        });
      });

      describe("aria-label", () => {
        it("sets `aria-label` if a string is provided", async () => {
          await page.setContent(`<clio-radio aria-label="this is a test label"></clio-radio>`);
          component = await page.find("clio-radio input");

          expect(component).toEqualAttribute("aria-label", "this is a test label");
        });
      });

      describe("aria-labelledby", () => {
        it("sets `aria-labelledby` if an `id` is provided", async () => {
          await page.setContent(`<clio-radio aria-labelledby="test-id"></clio-radio>`);
          component = await page.find("clio-radio input");

          expect(component).toEqualAttribute("aria-labelledby", "test-id");
        });
      });
    });
  });
});
