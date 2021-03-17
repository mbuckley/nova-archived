import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";

const basicInput = `
<clio-input name="basicInput" label="Basic Input"></clio-input>
`;

const customValidatorInput = `
<clio-input name="customInput" required="true" label="Custom Validator"></clio-input>
<script>
  const input = document.querySelector("clio-input");
  input.validationRules = [{ name: "length", options: { min: 5, max: 15 } }];
</script>
`;

const triggerBlurEvent = async (page: E2EPage) => {
  // triggering a click on html body to generate blur event for input
  await page.click("body");
  await page.waitForChanges();
};

describe("when the clio-input does not have validation rules", () => {
  let page: E2EPage;
  let clioInputEl: E2EElement;
  let inputEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(basicInput);
    clioInputEl = await page.find("clio-input");
    inputEl = await page.find("clio-input input");
  });

  describe("and it's clicked", () => {
    beforeEach(async () => {
      await clioInputEl.click();
      await page.waitForChanges();
    });

    it("should be the active element on the page", async () => {
      const activeElementID = await page.evaluate(() => {
        return document.activeElement.id;
      });
      const elementThatShouldBeActive = await page.find("input[name=basicInput]");

      expect(activeElementID).toEqual(elementThatShouldBeActive.id);
    });

    it("should add the class `text-input--container__focus", async () => {
      const textInputContainerEl = await page.find("clio-input .text-input--container");
      expect(textInputContainerEl).toHaveClass("text-input--container__focus");
    });

    it("should set `focused` on the underlying input element", async () => {
      const inputSnapshot = await page.accessibility.snapshot({
        root: await page.$("input"),
      });

      expect(inputSnapshot.focused).toBe(true);
    });

    describe("and the input is blurred", () => {
      let clioBlurEvent;

      beforeEach(async () => {
        clioBlurEvent = await page.spyOnEvent("clioBlur");

        await triggerBlurEvent(page);
      });

      it("should not set `focused`", async () => {
        const inputSnapshot = await page.accessibility.snapshot({
          root: await page.$("input"),
        });

        expect(inputSnapshot.focused).toBe(undefined);
      });

      it("should remove the class `text-input--container__focus", async () => {
        const textInputContainerEl = await page.find("clio-input .text-input--container");
        expect(textInputContainerEl).not.toHaveClass("text-input--container__focus");
      });

      it("should emit the 'clioBlur' event", async () => {
        expect(clioBlurEvent).toHaveReceivedEventTimes(1);
      });
    });
  });

  describe("and the input's value is changed", () => {
    beforeEach(async () => {
      await inputEl.type("Updated value");
      await page.waitForChanges();
    });

    it("should update the clio-input's value", async () => {
      expect(clioInputEl).toEqualAttribute("value", "Updated value");
    });
  });

  describe("and the enter key is pressed", () => {
    let clioInputEnterKeyPress: EventSpy;

    it("should emit a `clioInputEnterKeyPress` event", async () => {
      clioInputEnterKeyPress = await page.spyOnEvent("clioInputEnterKeyPress");
      await clioInputEl.focus();
      await page.type("input[name=basicInput]", "12345");
      await clioInputEl.press("Enter");
      await page.waitForChanges();

      expect(clioInputEnterKeyPress).toHaveReceivedEventTimes(1);
    });
  });
});

describe("when the clio-input has validation rules", () => {
  let page: E2EPage;
  let clioInputEl: E2EElement;
  let clioInputContainerEl: E2EElement;
  let inputEl: E2EElement;
  let formErrorEl: E2EElement | undefined;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(customValidatorInput);
    clioInputEl = await page.find("clio-input");
    clioInputContainerEl = await page.find(".text-input--container");
    inputEl = await page.find("clio-input input");
  });

  describe("and focused by a click", () => {
    beforeEach(async () => {
      await clioInputEl.click();
    });

    describe("and blurred immediately", () => {
      it("should not attempt to validate", async () => {
        await triggerBlurEvent(page);

        expect(await clioInputEl.callMethod("isDirty")).toBe(false);
        expect(await clioInputEl.callMethod("isValid")).toBe(false);
      });

      it("should not display an error message", async () => {
        formErrorEl = await page.find("clio-form-error");

        expect(formErrorEl).toBeNull();
      });
    });

    describe("and the enter key is pressed", () => {
      beforeEach(async () => {
        await clioInputEl.click();
        await clioInputEl.press("Enter");
        await page.waitForChanges();
      });
      it("should not be valid", async () => {
        const inputElementValidity = await page.$eval("input", (input: HTMLInputElement) => {
          return input.validity.valid;
        });

        expect(inputElementValidity).toBe(false);
        expect(await clioInputEl.callMethod("isValid")).toBe(false);
      });
    });
  });

  describe("and the input is updated with a valid value", () => {
    beforeEach(async () => {
      await inputEl.type("testing");
    });

    describe("and blurred", () => {
      it("`valid` and `dirty` should be set to `true`", async () => {
        await triggerBlurEvent(page);

        expect(await clioInputEl.callMethod("isDirty")).toBe(true);
        expect(await clioInputEl.callMethod("isValid")).toBe(true);
      });

      it("should not show an error", async () => {
        formErrorEl = await page.find("clio-form-error");

        expect(formErrorEl).toBeNull();
      });
    });

    describe("and the enter key is pressed", () => {
      beforeEach(async () => {
        await clioInputEl.focus();
        await inputEl.type("testing");
        await clioInputEl.press("Enter");
        await page.waitForChanges();
      });
      it("should be valid", async () => {
        const inputElementValidity = await page.$eval("input", (input: HTMLInputElement) => {
          return input.validity.valid;
        });

        expect(inputElementValidity).toBe(true);
        expect(await clioInputEl.callMethod("isValid")).toBe(true);
      });

      it("should not show an error in the UI", async () => {
        formErrorEl = await page.find("clio-form-error");

        expect(formErrorEl).toBeNull();
      });
    });
  });

  describe("and the input is updated with an invalid value", () => {
    beforeEach(async () => {
      await clioInputEl.focus();
      await inputEl.type("This text is over 15 characters long");
      await triggerBlurEvent(page);
      await page.waitForChanges();
    });

    describe("and blurred", () => {
      it("`dirty` should be set to `true` and `valid` should be set to false ", async () => {
        expect(await clioInputEl.callMethod("isDirty")).toBe(true);
        expect(await clioInputEl.callMethod("isValid")).toBe(false);
      });

      it("should show an error in the UI", async () => {
        formErrorEl = await page.find("clio-form-error");
        expect(await formErrorEl.isVisible()).toEqual(true);
        expect(formErrorEl.textContent.trim()).toEqual("You must enter between 5 and 15 characters");
        expect(clioInputContainerEl).toHaveClass("text-input--container__error");
      });
    });

    describe("and the validation rules are modified", () => {
      it("should validate onBlur show/remove an error in the UI accordingly", async () => {
        formErrorEl = await page.find("clio-form-error");

        await page.$eval("clio-input", (input: HTMLClioInputElement) => {
          input.validationRules = [
            {
              name: "length",
              options: {
                min: 15,
                max: 50,
              },
            },
          ];
        });
        await page.waitForChanges();
        inputEl.focus();
        await triggerBlurEvent(page);

        expect(clioInputContainerEl).not.toHaveClass("text-input--container__error");
        expect(await formErrorEl.isVisible()).toEqual(false);
      });
    });
  });
});

describe("when methods are called externally", () => {
  // Some methods can be called externally, by a parent component or by JS code
  // This is harder to recreate in a E2E test without adding superfluous elements to trigger behaviour
  // So we are calling them directly
  let page: E2EPage;
  let clioInputEl: E2EElement;
  let clioInputContainerEl: E2EElement;
  let inputEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(customValidatorInput);
    clioInputEl = await page.find("clio-input");
    clioInputContainerEl = await page.find(".text-input--container");
    inputEl = await page.find("clio-input input");
  });

  describe("when the #setFocus method is called externally", () => {
    beforeEach(async () => {
      await inputEl.type("testing");
      await triggerBlurEvent(page);
      await page.waitForChanges();
      await clioInputEl.callMethod("setFocus");
    });

    it("should set `focused` on the underlying input element", async () => {
      const inputSnapshot = await page.accessibility.snapshot({
        root: await page.$("input"),
      });

      expect(inputSnapshot.focused).toBe(true);
    });

    it("should select the text of the input element", async () => {
      const inputSnapshot = await page.accessibility.snapshot({
        root: await page.$("input"),
      });
      const currentSelectedText = await page.evaluate(() => {
        return document.getSelection().toString();
      });

      expect(currentSelectedText).toBe(inputSnapshot.value);
    });
  });

  describe("when the #validate method is called externally", () => {
    beforeEach(async () => {
      await clioInputEl.callMethod("validate");
      await page.waitForChanges();
    });

    it("should force the inner input to validate and is invalid", async () => {
      const inputElementValidity = await page.$eval("input", (input: HTMLInputElement) => {
        return input.validity.valid;
      });

      expect(inputElementValidity).toBe(false);
    });

    it("should render an error message in the UI", async () => {
      const formErrorElement = await page.find("clio-form-error");

      expect(await formErrorElement.isVisible()).toEqual(true);
      expect(clioInputContainerEl).toHaveClass("text-input--container__error");
    });
  });

  describe("when the #setDirty method is called externally", () => {
    describe("and called with 'true'", () => {
      it("should set 'dirty' to 'true'", async () => {
        expect(await clioInputEl.callMethod("isDirty")).toBe(false);
        await clioInputEl.callMethod("setDirty", true);
        expect(await clioInputEl.callMethod("isDirty")).toBe(true);
      });
    });

    describe("and called with 'false'", () => {
      it("should set 'dirty' to 'false'", async () => {
        await clioInputEl.callMethod("setDirty", true);
        expect(await clioInputEl.callMethod("isDirty")).toBe(true);
        await clioInputEl.callMethod("setDirty", false);
        expect(await clioInputEl.callMethod("isDirty")).toBe(false);
      });
    });
  });
});
