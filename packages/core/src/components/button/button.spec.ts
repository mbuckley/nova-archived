import { Button } from "./button";
import { newSpecPage } from "@stencil/core/testing";

describe("button", () => {
  describe("render", () => {
    it("renders with default props if none specified", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button>Default button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button type="button">
          <button class="clio-button clio-button--default clio-button--secondary" type="button">
            <span class="clio-button--content">Default button</span>
          </button
        </clio-button>
      `);
    });

    it("renders the button correctly if `loading` is true", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button loading="true">Default button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button type="button" disabled loading="true">
          <button class="clio-button clio-button--default clio-button--secondary clio-button__loading" aria-disabled="true" type="button" disabled>
            <span class="clio-button--content">Default button</span>
            <clio-loader class="clio-button--loader" size="small"></clio-loader>
          </button
        </clio-button>
      `);
    });

    it("renders disabled button if `disabled` is specified", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button disabled="true">Disabled button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button disabled="" type="button">
          <button class="clio-button clio-button--default clio-button--secondary" aria-disabled="true" type="button" disabled>
            <span class="clio-button--content">Disabled button</span>
          </button
        </clio-button>
      `);
    });

    it("renders small button if `size` is specified as `small`", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button size="small">Small button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button size="small" type="button">
          <button class="clio-button clio-button--secondary clio-button--small" type="button">
            <span class="clio-button--content">Small button</span>
          </button>
        </clio-button>
      `);
    });

    it("renders primary button if `buttonStyle` is specified as `primary`", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button button-style="primary">Primary button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button button-style="primary" type="button">
          <button class="clio-button clio-button--default clio-button--primary" type="button">
            <span class="clio-button--content">Primary button</button>
        </clio-button>
      `);
    });

    it("renders secondary button if `buttonStyle` is specified as `secondary", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button button-style="secondary">Secondary button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button button-style="secondary" type="button">
          <button class="clio-button clio-button--default clio-button--secondary" type="button">
            <span class="clio-button--content">Secondary button</span>
          </button>
        </clio-button>
      `);
    });

    it("renders danger button if `buttonStyle` is specified as `danger`", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button button-style="danger">Danger button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button button-style="danger" type="button">
          <button class="clio-button clio-button--danger clio-button--default" type="button">
            <span class="clio-button--content">Danger button</span>
          </button>
        </clio-button>
      `);
    });

    it("renders as an anchor element when `href` is specified", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button href="http://google.com" target="_blank" rel="noopener">Anchor button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button href="http://google.com" target="_blank" rel="noopener" type="button">
          <a class="clio-button clio-button--secondary clio-button--default" href="http://google.com" target="_blank" role="button" rel="noopener">
            <span class="clio-button--content">Anchor button</span>
          </a>
        </clio-button>
      `);
    });

    it("correctly renders a loading link button", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button href="http://google.com" target="_blank" loading="true">Default button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button href="http://google.com" target="_blank" type="button" disabled loading="true">
          <a class="clio-button clio-button--secondary clio-button--default clio-button__loading" href="http://google.com" target="_blank" role="button" tabindex="-1" aria-disabled="true">
            <span class="clio-button--content">
              Default button
            </span>
            <clio-loader class="clio-button--loader" size="small"></clio-loader>
          </a>
        </clio-button>
      `);
    });

    it("correctly renders a disabled link button", async () => {
      const page = await newSpecPage({
        components: [Button],
        html: `<clio-button href="http://google.com" target="_blank" disabled="true">Anchor button</clio-button>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-button href="http://google.com" target="_blank" type="button" disabled="">
          <a class="clio-button clio-button--secondary clio-button--default" href="http://google.com" target="_blank" role="button" tabindex="-1" aria-disabled="true">
            <span class="clio-button--content">Anchor button</span>
          </a>
        </clio-button>
      `);
    });
  });
});
