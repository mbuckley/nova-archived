import { Form } from "./form";
import { newSpecPage } from "@stencil/core/testing";

describe("form", () => {
  describe("render", () => {
    it("renders with default props if none specified", async () => {
      const page = await newSpecPage({
        components: [Form],
        html: `<clio-form></clio-form>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-form>
          <form method="post"></form>
        </clio-form>
      `);
    });

    it("renders with action prop if `action` is specified", async () => {
      const page = await newSpecPage({
        components: [Form],
        html: `<clio-form action="/foo.php"></clio-form>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-form action="/foo.php">
          <form method="post" action="/foo.php"></form>
        </clio-form>
      `);
    });

    describe("when `autocomplete` is specified", () => {
      it("renders with autocomplete value of 'off' if set to 'off'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form autocomplete="off"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form autocomplete="off">
            <form method="post" autocomplete="off"></form>
          </clio-form>
        `);
      });

      it("renders with autocomplete value of 'on' if set to 'on'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form autocomplete="on"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form autocomplete="on">
            <form method="post" autocomplete="on"></form>
          </clio-form>
        `);
      });
    });

    describe("when `enctype` is specified", () => {
      it("renders with enctype value of 'application/x-www-form-urlencoded' if set to 'application/x-www-form-urlencoded'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form enctype="application/x-www-form-urlencoded"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form enctype="application/x-www-form-urlencoded">
            <form method="post" enctype="application/x-www-form-urlencoded"></form>
          </clio-form>
        `);
      });

      it("renders with enctype value of 'multipart/form-data' if set to 'multipart/form-data'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form enctype="multipart/form-data"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form enctype="multipart/form-data">
            <form method="post" enctype="multipart/form-data"></form>
          </clio-form>
        `);
      });

      it("renders with enctype value of 'text/plain' if set to 'text/plain'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form enctype="text/plain"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form enctype="text/plain">
            <form method="post" enctype="text/plain"></form>
          </clio-form>
        `);
      });
    });

    describe("when `method` is specified", () => {
      it("renders with method value of 'post' if set to 'post'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form method="post"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form method="post">
            <form method="post"></form>
          </clio-form>
        `);
      });

      it("renders with method value of 'get' if set to 'get'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form method="get"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form method="get">
            <form method="get"></form>
          </clio-form>
        `);
      });

      it("renders with method value of 'dialog' if set to 'dialog'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form method="dialog"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form method="dialog">
            <form method="dialog"></form>
          </clio-form>
        `);
      });
    });

    it("renders with name prop if `name` is specified", async () => {
      const page = await newSpecPage({
        components: [Form],
        html: `<clio-form name="foo"></clio-form>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-form name="foo">
          <form method="post" name="foo"></form>
        </clio-form>
      `);
    });

    it("renders with novalidate prop if `novalidate` is set to 'true'", async () => {
      const page = await newSpecPage({
        components: [Form],
        html: `<clio-form novalidate="true"></clio-form>`,
        supportsShadowDom: false,
      });

      expect(page.root).toEqualHtml(`
        <clio-form novalidate="true">
          <form method="post" novalidate></form>
        </clio-form>
      `);
    });

    describe("when `target` is specified", () => {
      it("renders with target value of '_self' if set to '_self'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form target="_self"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form target="_self">
            <form method="post" target="_self"></form>
          </clio-form>
        `);
      });

      it("renders with target value of '_blank' if set to '_blank'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form target="_blank"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form target="_blank">
            <form method="post" target="_blank"></form>
          </clio-form>
        `);
      });

      it("renders with target value of '_parent' if set to '_parent'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form target="_parent"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form target="_parent">
            <form method="post" target="_parent"></form>
          </clio-form>
        `);
      });

      it("renders with target value of '_top' if set to '_top'", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form target="_top"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form target="_top">
            <form method="post" target="_top"></form>
          </clio-form>
        `);
      });

      it("renders with target value of the specified string if a string is provided", async () => {
        const page = await newSpecPage({
          components: [Form],
          html: `<clio-form target="foo"></clio-form>`,
          supportsShadowDom: false,
        });

        expect(page.root).toEqualHtml(`
          <clio-form target="foo">
            <form method="post" target="foo"></form>
          </clio-form>
        `);
      });
    });
  });
});
