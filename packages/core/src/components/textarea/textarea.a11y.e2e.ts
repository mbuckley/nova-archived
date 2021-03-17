import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

const disabledTextAreaTemplate = `
  <clio-textarea name="foo" disabled="true" value="disabledTextAreaTemplate" label="Disabled label"></clio-textarea>
`;

const textareaWithoutLabelTemplate = `
  <clio-textarea name="foo" value="textareaWithoutLabel" aria-label="a text area without a visible label"></clio-textarea>
`;

describe("text-input", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("when it's not possible to use a visible label so textarea is used WITHOUT clio-label", () => {
    let textareaEl: E2EElement;

    beforeEach(async () => {
      await page.setContent(textareaWithoutLabelTemplate);
      textareaEl = await page.find("clio-textarea textarea");
    });

    it("adds an aria-label attribute to the textarea element when passed a aria-label property", () => {
      expect(textareaEl).toHaveAttribute("aria-label");
      expect(textareaEl).toEqualAttribute("aria-label", "a text area without a visible label");
    });
  });

  describe("when a textarea is disabled", () => {
    let textareaEl: E2EElement;

    beforeEach(async () => {
      await page.setContent(disabledTextAreaTemplate);
      textareaEl = await page.find("clio-textarea textarea");
    });

    it("adds an aria-disabled attribute when disabled is true", () => {
      const inputDisabled = textareaEl.getAttribute("aria-disabled");
      expect(inputDisabled).toBe("true");
    });

    it("doesn't let a user use the textarea", async () => {
      await textareaEl.press("8");
      await page.waitForChanges();

      expect(await textareaEl.getProperty("value")).toEqual("disabledTextAreaTemplate");
    });
  });
});
