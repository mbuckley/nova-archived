import { FormError } from "./form-error";
import { newSpecPage } from "@stencil/core/testing";

describe("FormError", () => {
  describe("render", () => {
    it("renders the component", async () => {
      const page = await newSpecPage({
        components: [FormError],
        html: `<clio-form-error message="error message"></clio-form-error>`,
        supportsShadowDom: false,
      });
      expect(page.root).toEqualHtml(`
        <clio-form-error message="error message">
          <clio-icon aria-hidden="true" color="#E41B28" name="error"></clio-icon>
          <span aria-live="polite">error message</span>
        </clio-form-error>
      `);
    });
  });
});
