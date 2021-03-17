import { Loader } from "./loader";
import { newSpecPage } from "@stencil/core/testing";

describe("Loader", () => {
  describe("render", () => {
    it("renders default props if none are specified", async () => {
      const page = await newSpecPage({
        components: [Loader],
        html: `<clio-loader></clio-loader>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-loader aria-label="Content is loading" role="status">
          <div class="loader loader--large" >
            <svg class="loader-svg loader-svg--default" viewBox="25 25 50 50" focusable="false">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" />
            </svg>
          </div>
        </clio-loader>
      `);
    });

    it("renders a reversed style", async () => {
      const page = await newSpecPage({
        components: [Loader],
        html: `<clio-loader loader-style="reversed"></clio-loader>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-loader loader-style="reversed" role="status" aria-label="Content is loading">
          <div class="loader loader--large">
            <svg class="loader-svg loader-svg--reversed" viewBox="25 25 50 50" focusable="false">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" />
            </svg>
          </div>
        </clio-loader>
      `);
    });

    it("renders a small size", async () => {
      const page = await newSpecPage({
        components: [Loader],
        html: `<clio-loader size="small"></clio-loader>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-loader size="small" role="status" aria-label="Content is loading">
          <div class="loader loader--small">
            <svg class="loader-svg loader-svg--default" viewBox="25 25 50 50" focusable="false">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" />
            </svg>
          </div>
        </clio-loader>
      `);
    });

    it("renders a large size", async () => {
      const page = await newSpecPage({
        components: [Loader],
        html: `<clio-loader size="large"></clio-loader>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-loader role="status" aria-label="Content is loading" size="large">
          <div class="loader loader--large">
            <svg class="loader-svg loader-svg--default" viewBox="25 25 50 50" focusable="false">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" />
            </svg>
          </div>
        </clio-loader>
      `);
    });

    it("renders a custom aria-label", async () => {
      const page = await newSpecPage({
        components: [Loader],
        html: `<clio-loader aria-label="test"></clio-loader>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-loader role="status" aria-label="test">
          <div class="loader loader--large">
            <svg class="loader-svg loader-svg--default" viewBox="25 25 50 50" focusable="false">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" />
            </svg>
          </div>
        </clio-loader>
      `);
    });
  });
});
