import { E2EPage, newE2EPage } from "@stencil/core/testing";

describe("FormError", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it("the message prop provided is visible", async () => {
    await page.setContent(`
      <clio-form-error message="error message here."></clio-form-error>
    `);
    const messageElement = await page.find("span[aria-live='polite']");
    expect(await messageElement.textContent).toBe("error message here.");
  });
});
