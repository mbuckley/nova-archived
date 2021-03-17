jest.mock("../../utils/helpers");

import { TextArea } from "./textarea";
import { newSpecPage } from "@stencil/core/testing";

describe("Textarea", () => {
  describe("render", () => {
    it("renders the component with default properties when none are specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea>
          <textarea id="clio-textarea-UUID" class="textarea"></textarea>
        </clio-textarea>
      `);
    });

    it("renders a disabled textarea if `disabled` is specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea disabled="true"></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea disabled="true">
          <textarea id="clio-textarea-UUID" class="textarea" disabled="" aria-disabled="true"></textarea>
        </clio-textarea>
      `);
    });

    it("renders a required textarea if `required` is specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea required="true"></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea required="true">
          <textarea id="clio-textarea-UUID" class="textarea" required=""></textarea>
        </clio-textarea>
      `);
    });

    it("renders an autofocus attribute if `autofocus` is specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea autofocus="true"></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea autofocus="true">
          <textarea id="clio-textarea-UUID" class="textarea" autofocus=""></textarea>
        </clio-textarea>
      `);
    });

    it("renders a placeholder attribute if `placeholder` is specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea placeholder="Placeholder"></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea placeholder="Placeholder">
          <textarea id="clio-textarea-UUID" class="textarea" placeholder="Placeholder"></textarea>
        </clio-textarea>
      `);
    });

    it("renders the component with a value if specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea value="initial value"></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea value="initial value">
          <textarea id="clio-textarea-UUID" class="textarea" value="initial value"></textarea>
        </clio-textarea>
      `);
    });

    it("renders the component with a label if specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea label="foo"></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea label="foo">
          <clio-label for="clio-textarea-UUID" id="clio-label-UUID">foo</clio-label>
          <textarea id="clio-textarea-UUID" aria-labelledby="clio-label-UUID" class="textarea"></textarea>
        </clio-textarea>
      `);
    });

    it("renders the component with a sub-label if specified", async () => {
      const page = await newSpecPage({
        components: [TextArea],
        html: `<clio-textarea sub-label="bar"></clio-textarea>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-textarea sub-label="bar">
          <textarea id="clio-textarea-UUID" aria-describedby="clio-sub-label-UUID" class="textarea"></textarea>
          <clio-label id="clio-sub-label-UUID" label-type="sub-label">bar</clio-label>
        </clio-textarea>
      `);
    });
  });
});
