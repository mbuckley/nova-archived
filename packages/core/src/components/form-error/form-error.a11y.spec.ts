import { FormError } from "./form-error";
import { newSpecPage } from "@stencil/core/testing";

describe("FormError", () => {
  describe("render", () => {
    it("adds an `aria-hidden` attribute to the icon element", async () => {
      const page = await newSpecPage({
        components: [FormError],
        html: `<clio-form-error></clio-form-error>`,
        supportsShadowDom: false,
      });
      expect(page.root.querySelector("clio-icon")).toEqualAttribute("aria-hidden", "true");
    });

    it("sets `aria-live` to 'polite' for the message element", async () => {
      const page = await newSpecPage({
        components: [FormError],
        html: `<clio-form-error></clio-form-error>`,
        supportsShadowDom: false,
      });
      expect(page.root.querySelectorAll("[aria-live='polite']").length).toEqual(1);
    });
  });
});
