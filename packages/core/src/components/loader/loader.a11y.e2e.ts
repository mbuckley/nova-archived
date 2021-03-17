import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

describe("loader", () => {
  let page: E2EPage;
  let loaderEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("roles and attributes", () => {
    describe("the default roles and attributes", () => {
      beforeEach(async () => {
        await page.setContent(`<clio-loader></clio-loader>`);
        loaderEl = await page.find("clio-loader");
      });

      it("the `role` is automatically set to `status`", () => {
        expect(loaderEl.getAttribute("role")).toEqual("status");
      });

      it("applies a default `aria-label` to the first child", () => {
        expect(loaderEl.getAttribute("aria-label")).toEqual("Content is loading");
      });
    });

    describe("attributes which take values", () => {
      beforeEach(async () => {
        await page.setContent(`<clio-loader aria-label="this is a test label"></clio-loader>`);
        loaderEl = await page.find("clio-loader");
      });

      it("passes the `aria-label` to the first child", () => {
        expect(loaderEl.getAttribute("aria-label")).toEqual("this is a test label");
      });
    });
  });
});
