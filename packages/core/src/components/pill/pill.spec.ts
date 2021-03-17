import { Pill } from "./pill";
import { newSpecPage } from "@stencil/core/testing";

describe("Pill", () => {
  describe("render", () => {
    it("renders the component with a class value of pill--grey when no color property is provided", async () => {
      const page = await newSpecPage({
        components: [Pill],
        html: `<clio-pill>Default</clio-pill>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-pill>
          <div class="pill pill--grey">
            Default
          </div>
       </clio-pill>
      `);
    });

    it("renders the component with the class value associated with the color property provided", async () => {
      const page = await newSpecPage({
        components: [Pill],
        html: `<clio-pill color="teal">Teal</clio-pill>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-pill color="teal">
          <div class="pill pill--teal">
            Teal
          </div>
       </clio-pill>
      `);
    });
  });
});
