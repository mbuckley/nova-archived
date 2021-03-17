import { MenuItem } from "./menu-item";
import { newSpecPage } from "@stencil/core/testing";

describe("menu-item", () => {
  describe("render", () => {
    describe("basic menu item without an href prop", () => {
      it("adds transcluded text within a li", async () => {
        const page = await newSpecPage({
          components: [MenuItem],
          html: `<clio-menu-item>Foo</clio-menu-item>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
        <clio-menu-item>
          <li class="menu-item" role="menuitem" tabindex="0">Foo</li>
        </clio-menu-item>
      `);
      });
    });

    describe("with an href property", () => {
      it("renders a menu item with an anchor element", async () => {
        const page = await newSpecPage({
          components: [MenuItem],
          html: `<clio-menu-item href="http://foo.com">Foo</clio-menu-item>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-menu-item href="http://foo.com">
            <li class="menu-item menu-item--has-href" role="none">
              <a href="http://foo.com" class="menu-item__anchor" role="menuitem" target="blank" tabindex="0">Foo</a>
            </li>
          </clio-menu-item>
        `);
      });
    });

    describe("with a disabled property", () => {
      describe("set to true", () => {
        it("renders a menu item with the disabled class and sets tabindex to '-1'", async () => {
          const page = await newSpecPage({
            components: [MenuItem],
            html: `<clio-menu-item disabled="true">Foo</clio-menu-item>`,
            supportsShadowDom: false,
          });

          expect(page.root).toEqualHtml(`
          <clio-menu-item disabled="true">
            <li class="menu-item menu-item--disabled" role="menuitem" tabindex="-1">
              Foo
            </li>
          </clio-menu-item>
        `);
        });

        it("sets href prop to null, if specified", async () => {
          const page = await newSpecPage({
            components: [MenuItem],
            html: `<clio-menu-item href="https://www.google.com" disabled="true">Foo</clio-menu-item>`,
            supportsShadowDom: false,
          });

          expect(page.root).toEqualHtml(`
          <clio-menu-item disabled="true" href="https://www.google.com">
            <li class="menu-item menu-item--has-href menu-item--disabled" role="none">
              <a role="menuitem" class="menu-item__anchor" tabindex="-1" target="blank">Foo</a>
            </li>
          </clio-menu-item>
        `);
        });
      });

      describe("set to false", () => {
        it("removes the disabled class and sets tabindex to '0'", async () => {
          const page = await newSpecPage({
            components: [MenuItem],
            html: `<clio-menu-item disabled="false">Foo</clio-menu-item>`,
            supportsShadowDom: false,
          });

          expect(page.root).toEqualHtml(`
          <clio-menu-item disabled="false">
            <li class="menu-item" role="menuitem" tabindex="0">
              Foo
            </li>
          </clio-menu-item>
        `);
        });
        it("sets href prop to rendered anchor element, if specified", async () => {
          const page = await newSpecPage({
            components: [MenuItem],
            html: `<clio-menu-item href="https://www.google.com" disabled="false">Foo</clio-menu-item>`,
            supportsShadowDom: false,
          });

          expect(page.root).toEqualHtml(`
          <clio-menu-item disabled="false" href="https://www.google.com">
            <li class="menu-item menu-item--has-href" role="none">
              <a role="menuitem" class="menu-item__anchor" tabindex="0" href="https://www.google.com" target="blank">Foo</a>
            </li>
          </clio-menu-item>
        `);
        });
      });
    });
  });
});
