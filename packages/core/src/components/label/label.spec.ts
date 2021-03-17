import { Label } from "./label";
import { newSpecPage } from "@stencil/core/testing";

describe("Label", () => {
  describe("render", () => {
    it("renders the component with default label properties when no properties are specified", async () => {
      const page = await newSpecPage({
        components: [Label],
        html: `<clio-label></clio-label>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-label>
          <label class="label label-default">
            <span class="label-content"></span>
          </label>
        </clio-label>
      `);
    });

    it("renders the component with the text between clio-label tags as the label", async () => {
      const page = await newSpecPage({
        components: [Label],
        html: `<clio-label>LabelText</clio-label>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-label>
          <label class="label label-default">
            <span class="label-content">LabelText</span>
          </label>
        </clio-label>
      `);
    });

    it("renders the component with a `required` supplementary indicator when required is true", async () => {
      const page = await newSpecPage({
        components: [Label],
        html: `<clio-label label-type="required"></clio-label>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-label label-type="required">
          <label class="label label-required">
            <span class="label-content"></span>
            <span class="required-indicator">
              Required
            </span>
          </label>
        </clio-label>
      `);
    });

    it("renders the component with a `required` supplementary indicator when required is true as well as the text between clio-label tags when provided", async () => {
      const page = await newSpecPage({
        components: [Label],
        html: `<clio-label label-type="required">RequiredText</clio-label>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-label label-type="required">
          <label class="label label-required">
            <span class="label-content">RequiredText</span>
            <span class="required-indicator">
              Required
            </span>
          </label>
        </clio-label>
      `);
    });

    it("renders the component with the `label-sub-label` class when label-type is sub-label", async () => {
      const page = await newSpecPage({
        components: [Label],
        html: `<clio-label label-type="sub-label"></clio-label>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-label label-type="sub-label">
          <label class="label label-sub-label">
            <span class="label-content"></span>
          </label>
        </clio-label>
      `);
    });

    it("correctly renders the given for attribute as an htmlFor with the given for ID on the inner label element", async () => {
      const page = await newSpecPage({
        components: [Label],
        html: `<clio-label for="test"></clio-label>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-label for="test">
          <label class="label label-default" htmlFor="test">
            <span class="label-content"></span>
          </label>
        </clio-label>
      `);
    });
  });
});
