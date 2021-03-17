import { Icon } from "./icon";
import { newSpecPage } from "@stencil/core/testing";

describe("Icon", () => {
  describe("render", () => {
    it("renders the component with an SVG if a valid icon name is provided", async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<clio-icon name="caret-down"></clio-icon>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-icon name="caret-down" aria-label="caret down">
          <div role="img" class="icon">
            <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#000000" d="M.54 1.6c-.242 0-.403.142-.484.37-.108.226-.054.425.107.596L3.63 6.23c.107.113.215.17.376.17a.517.517 0 0 0 .376-.17l3.466-3.664c.162-.17.189-.37.108-.597-.108-.227-.269-.369-.484-.369H.54z" />
            </svg>
          </div>
        </clio-icon>
      `);
    });

    it("does not render an icon container or SVG if an invalid name is provided", async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<clio-icon name="foo"></clio-icon>`,
        supportsShadowDom: false,
      });

      expect(page.root.outerHTML).toMatch(`<clio-icon name="foo"><!----></clio-icon>`);
    });
  });

  describe("color", () => {
    it("renders the SVG with a specific fill colour if provided", async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<clio-icon name="caret-down" color="#ff0000"></clio-icon>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-icon name="caret-down" color="#ff0000" aria-label="caret down">
          <div role="img" class="icon">
            <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#ff0000" d="M.54 1.6c-.242 0-.403.142-.484.37-.108.226-.054.425.107.596L3.63 6.23c.107.113.215.17.376.17a.517.517 0 0 0 .376-.17l3.466-3.664c.162-.17.189-.37.108-.597-.108-.227-.269-.369-.484-.369H.54z" />
            </svg>
          </div>
        </clio-icon>
      `);
    });
  });
});
