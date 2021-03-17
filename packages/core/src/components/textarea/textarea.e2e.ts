import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

const template = `
  <clio-textarea name="foo" value="initial value"></clio-textarea>
`;
const requiredTemplate = `<clio-textarea required="true"></clio-textarea>`;

describe("textarea", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  afterEach(() => {
    page = null;
  });

  describe("Attributes/Properties", () => {
    let textareaEl: E2EElement;

    beforeEach(async () => {
      await page.setContent(template);
      textareaEl = await page.find("clio-textarea textarea");
    });

    describe("value", () => {
      it("changes the value of the textarea when a new value is passed through props", async () => {
        await page.$eval("clio-textarea", (elm: any) => {
          elm.value = "some new value";
        });

        await page.waitForChanges();
        expect(await textareaEl.getProperty("value")).toEqual("some new value");
      });

      it("changes the value of the textarea on user input", async () => {
        await page.$eval("clio-textarea", (elm: any) => {
          elm.value = "";
        });

        await page.waitForChanges();
        expect(await textareaEl.getProperty("value")).toEqual("");

        await textareaEl.click();
        await textareaEl.press("KeyA");
        await textareaEl.press("KeyB");
        await textareaEl.press("KeyC");

        await page.waitForChanges();
        expect(await textareaEl.getProperty("value")).toEqual("abc");
      });
    });
  });
});

describe("when the clio-textarea has validation rules", () => {
  let page: E2EPage;
  let clioTextareaEl: E2EElement;
  let textareaEl: E2EElement;
  let formErrorEl: E2EElement | undefined;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(requiredTemplate);
    clioTextareaEl = await page.find("clio-textarea");
    textareaEl = await page.find("clio-textarea textarea");
  });

  describe("and is focused by a click", () => {
    beforeEach(async () => {
      await textareaEl.click();
    });

    describe("and blurred immediately", () => {
      it("should not attempt to validate", async () => {
        await page.click("body");
        await page.waitForChanges();

        expect(await clioTextareaEl.callMethod("isDirty")).toBe(false);
        expect(await clioTextareaEl.callMethod("isValid")).toBe(false);
      });

      it("should not display an error message", async () => {
        formErrorEl = await page.find("clio-form-error");

        expect(formErrorEl).toBeNull();
      });
    });
  });

  describe("and an empty textarea is validated", () => {
    beforeEach(async () => {
      await clioTextareaEl.callMethod("validate");
      await page.waitForChanges();
    });

    it("is not valid", async () => {
      expect(await clioTextareaEl.callMethod("isValid")).toBe(false);
      expect(textareaEl).toHaveClass("textarea__error");
    });

    it("is marked as dirty", async () => {
      expect(await clioTextareaEl.callMethod("isDirty")).toBe(true);
    });

    it("renders a clio-form-error", async () => {
      formErrorEl = await page.find("clio-form-error");
      expect(await formErrorEl.isVisible()).toEqual(true);
      expect(formErrorEl.textContent.trim()).toEqual("This field is required.");
    });
  });

  describe("and textarea that isn't empty is validated", () => {
    beforeEach(async () => {
      await textareaEl.type("this is test text");
      await clioTextareaEl.callMethod("validate");
      await page.waitForChanges();
    });

    it("is valid", async () => {
      expect(await clioTextareaEl.callMethod("isValid")).toBe(true);
      expect(textareaEl).not.toHaveClass("textarea__error");
    });

    it("is marked as dirty", async () => {
      expect(await clioTextareaEl.callMethod("isDirty")).toBe(true);
    });

    it("does NOT render a clio-form-error", async () => {
      expect(await page.find("clio-form-error")).toBeNull();
    });
  });
});

describe("when methods are called externally", () => {
  // Some methods can be called externally, by a parent component or by JS code
  // This is harder to recreate in a E2E test without adding superfluous elements to trigger behaviour
  // So we are calling them directly
  let page: E2EPage;
  let clioTextareaEl: E2EElement;
  let textareaEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(requiredTemplate);
    clioTextareaEl = await page.find("clio-textarea");
    textareaEl = await page.find("clio-textarea textarea");
  });

  describe("when the #setFocus method is called externally", () => {
    beforeEach(async () => {
      await page.click("body");
      await page.waitForChanges();
      await clioTextareaEl.callMethod("setFocus");
    });

    it("should set `focused` on the underlying textarea element", async () => {
      const textareaSnapshot = await page.accessibility.snapshot({
        root: await page.$("textarea"),
      });

      expect(textareaSnapshot.focused).toBe(true);
    });
  });

  describe("when the #validate method is called externally", () => {
    beforeEach(async () => {
      await clioTextareaEl.callMethod("validate");
      await page.waitForChanges();
    });

    it("should force the inner textarea to validate and is invalid", async () => {
      const textareaElementValidity = await page.$eval("textarea", (textarea: HTMLTextAreaElement) => {
        return textarea.validity.valid;
      });

      expect(textareaElementValidity).toBe(false);
    });

    it("should render an error message in the UI", async () => {
      const formErrorElement = await page.find("clio-form-error");

      expect(await formErrorElement.isVisible()).toEqual(true);
      expect(textareaEl).toHaveClass("textarea__error");
    });
  });

  describe("when the #setDirty method is called externally", () => {
    describe("and called with 'true'", () => {
      it("should set 'dirty' to 'true'", async () => {
        expect(await clioTextareaEl.callMethod("isDirty")).toBe(false);
        await clioTextareaEl.callMethod("setDirty", true);
        expect(await clioTextareaEl.callMethod("isDirty")).toBe(true);
      });
    });

    describe("and called with 'false'", () => {
      it("should set 'dirty' to 'false'", async () => {
        await clioTextareaEl.callMethod("setDirty", true);
        expect(await clioTextareaEl.callMethod("isDirty")).toBe(true);
        await clioTextareaEl.callMethod("setDirty", false);
        expect(await clioTextareaEl.callMethod("isDirty")).toBe(false);
      });
    });
  });
});
