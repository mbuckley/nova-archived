jest.mock("../../utils/helpers");

import { Checkbox } from "./checkbox";
import { newSpecPage } from "@stencil/core/testing";

describe("Checkbox", () => {
  describe("render", () => {
    it("renders the checkbox component as unchecked by default", async () => {
      const page = await newSpecPage({
        components: [Checkbox],
        html: `<clio-checkbox></clio-checkbox>`,
      });

      expect(page.root).toEqualHtml(`
        <clio-checkbox>
          <div class="clio-checkbox__container">
            <input id="clio-checkbox-UUID" type="checkbox" class="clio-checkbox">
            <span class="clio-checkbox-icon" aria-hidden="true"></span>
          </div>
        </clio-checkbox>
      `);
    });

    it("renders the checkbox component as checked when checked is true", async () => {
      const page = await newSpecPage({
        components: [Checkbox],
        html: `<clio-checkbox checked=true></clio-checkbox>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-checkbox checked=true>
          <div class="clio-checkbox__container">
            <input checked="" id="clio-checkbox-UUID" type="checkbox" class="clio-checkbox">
            <span aria-hidden="true" class="clio-checkbox-icon">
              <clio-icon color="#ffffff" name="checkbox" class="icon--container__auto"></clio-icon>
            </span>
          </div>
        </clio-checkbox>
      `);
    });

    it("renders the checkbox component as disabled when disabled is true", async () => {
      const page = await newSpecPage({
        components: [Checkbox],
        html: `<clio-checkbox disabled=true></clio-checkbox>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-checkbox disabled>
          <div class="clio-checkbox__container">
            <input disabled="" id="clio-checkbox-UUID" type="checkbox" class="clio-checkbox">
            <span class="clio-checkbox-icon" aria-hidden="true"></span>
          </div>
        </clio-checkbox>
      `);
    });

    it("renders the checkbox component as indeterminate visually when indeterminate is true", async () => {
      const page = await newSpecPage({
        components: [Checkbox],
        html: `<clio-checkbox indeterminate=true></clio-checkbox>`,
        supportsShadowDom: false,
      });

      const checkboxInput = page.body.querySelector("input");

      expect(checkboxInput.indeterminate).toBe(true);
    });

    it("renders the checkbox component as required when required is true", async () => {
      const page = await newSpecPage({
        components: [Checkbox],
        html: `<clio-checkbox required="true"></clio-checkbox>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-checkbox required="true">
          <div class="clio-checkbox__container">
            <input id="clio-checkbox-UUID" required="" type="checkbox" class="clio-checkbox">
            <span class="clio-checkbox-icon" aria-hidden="true"></span>
          </div>
        </clio-checkbox>
      `);
    });

    it("renders the component with a label if specified", async () => {
      const page = await newSpecPage({
        components: [Checkbox],
        html: `<clio-checkbox label="This is a test label"></clio-checkbox>`,
      });

      expect(page.root).toEqualHtml(`
        <clio-checkbox label="This is a test label">
          <div class="clio-checkbox__container">
            <input aria-labelledby="clio-label-UUID" class="clio-checkbox" id="clio-checkbox-UUID" type="checkbox">
            <span class="clio-checkbox-icon" aria-hidden="true"></span>
            <div class="clio-checkbox__subtext-container">
              <clio-label for="clio-checkbox-UUID" id="clio-label-UUID">
                This is a test label
              </clio-label>
            </div>
          </div>
        </clio-checkbox>
      `);
    });
  });
});
