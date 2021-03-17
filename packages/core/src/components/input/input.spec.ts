jest.mock("../../utils/helpers");

import { Input } from "./input";
import { newSpecPage } from "@stencil/core/testing";

describe("Input", () => {
  describe("render", () => {
    it("renders the component with default text input properties when no properties are specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input>
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input" type="text">
          </div>
        </clio-input>
      `);
    });

    it("renders disabed text input if `disabled` is specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input name="testDisabled" disabled="true"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input disabled="true" name="testDisabled" >
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input" name="testDisabled" disabled="" aria-disabled="true" type="text">
          </div>
        </clio-input>
      `);
    });

    it("renders required text input if `required` is specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input name="testRequired" required="true"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input required="true" name="testRequired">
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input" name="testRequired" required="" type="text">
          </div>
        </clio-input>
      `);
    });

    it("renders the component with a placeholder if a placeholder is specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input placeholder="testPlaceholder"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input placeholder="testPlaceholder">
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input" placeholder="testPlaceholder" type="text">
          </div>
        </clio-input>
      `);
    });

    it("renders the component with a value if specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input value="initial value"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
          <clio-input value="initial value">
            <div class="text-input--container">
              <input id="clio-input-UUID" autocomplete="on" class="text-input" value="initial value" type="text">
            </div>
          </clio-input>
        `);
    });

    it("renders the component with a label if specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input label="foo"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input label="foo">
          <clio-label for="clio-input-UUID" id="clio-label-UUID">foo</clio-label>
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input" type="text" aria-labelledby="clio-label-UUID">
          </div>
        </clio-input>
      `);
    });

    it("renders the component with a sub-label if specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input sub-label="bar"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input sub-label="bar">
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input" type="text" aria-describedby="clio-sub-label-UUID">
          </div>
          <clio-label id="clio-sub-label-UUID" label-type="sub-label">bar</clio-label>
        </clio-input>
      `);
    });

    it("renders the component with a loading indicator and the 'text-input--has-loader' class if an loader is specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input loading="true"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input loading="true">
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input text-input--has-loader" type="text">
            <div class="text-input__loader"><clio-loader size="small"></clio-loader></div>
          </div>
        </clio-input>
      `);
    });

    it("renders the component with an icon and the 'text-input--has-icon' class if an icon string is specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input icon="foo"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input icon="foo">
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input text-input--has-icon" type="text">
            <div class="text-input__icon">
              <clio-icon name="foo"></clio-icon>
            </div>
          </div>
        </clio-input>
      `);
    });

    it("renders the component with a suffix if a suffix is specified", async () => {
      const page = await newSpecPage({
        components: [Input],
        html: `<clio-input suffix="$"></clio-input>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-input suffix="$">
          <div class="text-input--container">
            <input id="clio-input-UUID" autocomplete="on" class="text-input" type="text">
            <div class="text-input__suffix">$</div>
          </div>
        </clio-input>
      `);
    });
  });
});
