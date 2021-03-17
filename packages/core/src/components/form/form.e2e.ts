import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";

describe("form", () => {
  let page: E2EPage;

  const templateWithRequiredInputField = `
    <clio-form novalidate="true">
        <clio-label id="required-input-label">Required Input Label</clio-label>
        <clio-input name="input" required="true" arialabelledby="required-input-label"></clio-input>
      <clio-button type="submit">submit</clio-button>
    </clio-form>
    <script>
      const input = document.querySelector("clio-input");
      input.validationRules = [{ name: "required" }];
    </script>
  `;

  const triggerBlurEvent = async () => {
    const clioLabelElement = await page.find("clio-label");
    // clicking on the label input to generate a blur event on the input.
    await clioLabelElement.click();
    await page.waitForChanges();
  };

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("when the clio-form has a required child input element", () => {
    let inputContainer: E2EElement;
    let input: E2EElement;
    beforeEach(async () => {
      await page.setContent(templateWithRequiredInputField);
    });

    describe("and the input is blurred", () => {
      describe("and the input element is invalid", () => {
        beforeEach(async () => {
          inputContainer = await page.find(".text-input--container");
          input = await page.find("clio-input[name='input']");
          await input.click();
          await page.waitForChanges();
          await triggerBlurEvent();
        });

        it("does not trigger the input validation UI", async () => {
          expect(inputContainer).not.toHaveClass("text-input--container__error");
        });
      });

      describe("and the input element is valid", () => {
        it("does not trigger the input validation UI", async () => {
          input = await page.find("clio-input[name='input']");
          await input.type("a");
          await page.waitForChanges();
          await triggerBlurEvent();
          expect(inputContainer).not.toHaveClass("text-input--container__error");
        });
      });
    });

    describe("and the enter key is pressed", () => {
      let form: E2EElement;
      let formSubmissionEvent: EventSpy;

      beforeEach(async () => {
        inputContainer = await page.find(".text-input--container");
        input = await page.find("clio-input input");
        form = await page.find("clio-form");
        formSubmissionEvent = await form.spyOnEvent("clioSubmit");
      });

      describe("and the input element is invalid", () => {
        it("does not submit the form", async () => {
          await input.press("Enter");
          await page.waitForChanges();

          expect(formSubmissionEvent).not.toHaveReceivedEvent();
          expect(inputContainer).toHaveClass("text-input--container__error");
        });
      });

      describe("and the input element is valid", () => {
        it("submits the form", async () => {
          await page.type("input[name=input]", "test", { delay: 20 });
          await input.press("Enter");
          await page.waitForChanges();

          expect(formSubmissionEvent).toHaveReceivedEventTimes(1);
          expect(inputContainer).not.toHaveClass("text-input--container__error");
        });
      });
    });
  });

  describe("when the clio-form does not have a required child input element", () => {
    describe("and the enter-key is pressed", () => {
      it("submits the form", async () => {
        await page.setContent(`
        <clio-form>
          <clio-input name="default-input"></clio-input>
          <clio-button type="submit">submit</clio-button>
        </clio-form>
      `);

        const form = await page.find("clio-form");
        const inputContainer = await page.find(".text-input--container");
        const input = await page.find("clio-input input");
        const formSubmissionEvent = await form.spyOnEvent("clioSubmit");

        await input.press("Enter");
        await page.waitForChanges();

        expect(formSubmissionEvent).toHaveReceivedEventTimes(1);
        expect(inputContainer).not.toHaveClass("text-input--container__error");
      });
    });
  });

  describe("submit", () => {
    describe("and 'checkValidity' returns 'true'", () => {
      it("does NOT emit a 'clioSubmit' event", async () => {
        await page.setContent(`
          <clio-form>
            <input required></input>
          </clio-form>
        `);

        const form = await page.find("clio-form");
        const formSubmissionEvent = await form.spyOnEvent("clioSubmit");

        await page.$eval("clio-form", (form: HTMLClioFormElement) => {
          form.submit();
        });
        await page.waitForChanges();

        expect(formSubmissionEvent).not.toHaveReceivedEvent();
      });
    });

    describe("and 'checkValidity' returns 'true'", () => {
      it("emits a 'clioSubmit' event", async () => {
        await page.setContent(`
          <clio-form>
            <clio-input name="default-input"></clio-input>
          </clio-form>
        `);

        const form = await page.find("clio-form");
        const formSubmissionEvent = await form.spyOnEvent("clioSubmit");

        await page.$eval("clio-form", (form: HTMLClioFormElement) => {
          form.submit();
        });
        await page.waitForChanges();

        expect(formSubmissionEvent).toHaveReceivedEventTimes(1);
      });
    });
  });

  describe("isValid", () => {
    let form: E2EElement;

    beforeEach(async () => {
      await page.setContent(`
        <clio-form>
          <clio-input required="true" />
        </clio-form>
      `);
      form = await page.find("clio-form");
    });

    describe("when the form is NOT valid", () => {
      it("should return 'false'", async () => {
        const isValid = await form.callMethod("isValid");
        expect(isValid).toBe(false);
      });
    });

    describe("when the form is valid", () => {
      it("should return 'true'", async () => {
        const input = await page.find("clio-input");
        input.setProperty("value", "foo");
        await page.waitForChanges();

        const isValid = await form.callMethod("isValid");
        expect(isValid).toBe(true);
      });
    });
  });

  describe("isDirty", () => {
    let form: E2EElement;
    let input: E2EElement;

    beforeEach(async () => {
      await page.setContent(`
        <clio-form>
          <clio-input required="true" />
        </clio-form>
      `);
      form = await page.find("clio-form");
      input = await page.find("clio-input");
    });

    describe("when the form contains dirty inputs", () => {
      it("should return 'true'", async () => {
        await input.callMethod("setDirty", true);

        const isDirty = await form.callMethod("isDirty");
        expect(isDirty).toBe(true);
      });
    });

    describe("when the form does NOT contain dirty inputs", () => {
      it("should return 'true'", async () => {
        await input.callMethod("setDirty", false);

        const isDirty = await form.callMethod("isDirty");
        expect(isDirty).toBe(false);
      });
    });
  });

  describe("onSubmit", () => {
    it("sets the clio form components to 'dirty'", async () => {
      await page.setContent(`
        <clio-form>
          <clio-input />
          <clio-button type="submit">submit</clio-button>
        </clio-form>
      `);

      const input = await page.find("clio-input");
      const button = await page.find("clio-button");
      await button.click();
      await page.waitForChanges();

      const isDirty = await input.callMethod("isDirty");
      expect(isDirty).toBe(true);
    });

    describe("and 'allowRedirect' is set to 'false'", () => {
      describe("and 'checkValidity' returns 'false'", () => {
        it("does NOT emit a 'clioSubmit' event", async () => {
          await page.setContent(`
            <clio-form>
              <input required />
              <clio-button type="submit">submit</clio-button>
            </clio-form>
          `);

          const form = await page.find("clio-form");
          const formSubmissionEvent = await form.spyOnEvent("clioSubmit");

          const button = await page.find("clio-button");
          await button.click();
          await page.waitForChanges();

          expect(formSubmissionEvent).not.toHaveReceivedEvent();
        });
      });

      describe("and 'checkValidity' returns 'true'", () => {
        it("emits a 'clioSubmit' event", async () => {
          await page.setContent(`
            <clio-form>
              <clio-button type="submit">submit</clio-button>
            </clio-form>
          `);

          const form = await page.find("clio-form");
          const formSubmissionEvent = await form.spyOnEvent("clioSubmit");

          const button = await page.find("clio-button");
          await button.click();
          await page.waitForChanges();

          expect(formSubmissionEvent).toHaveReceivedEventTimes(1);
        });
      });
    });

    describe("and 'allowRedirect' is set to 'true'", () => {
      describe("and 'checkValidity' returns 'false'", () => {
        it("does NOT trigger the 'submit' event on the native form element", async () => {
          await page.setContent(`
            <clio-form allow-redirect="true">
              <input required />
              <clio-button type="submit">submit</clio-button>
            </clio-form>
          `);

          const formEl = await page.find("clio-form form");
          const nativeFormSubmissionEvent = await formEl.spyOnEvent("submit");

          const button = await page.find("clio-button");
          await button.click();
          await page.waitForChanges();

          expect(nativeFormSubmissionEvent).not.toHaveReceivedEvent();
        });
      });

      describe("and 'checkValidity' returns 'true'", () => {
        it("triggers the 'submit' event on the native form element", async () => {
          await page.setContent(`
            <clio-form allow-redirect="true">
              <clio-button type="submit">submit</clio-button>
            </clio-form>
          `);

          const formEl = await page.find("clio-form form");
          const nativeFormSubmissionEvent = await formEl.spyOnEvent("submit");

          const button = await page.find("clio-button");
          await button.click();
          await page.waitForChanges();

          expect(nativeFormSubmissionEvent).toHaveReceivedEventTimes(1);
        });
      });
    });

    describe("when the clio-form has a required child input element", () => {
      let button: E2EElement;

      beforeEach(async () => {
        await page.setContent(templateWithRequiredInputField);
        button = await page.find("clio-button");
      });

      describe("and the input element is invalid", () => {
        it("allows the input field to show the validation UI", async () => {
          const inputContainer = await page.find(".text-input--container");
          await button.click();
          await page.waitForChanges();
          expect(inputContainer).toHaveClass("text-input--container__error");
        });

        it("allows the form error to show the error message", async () => {
          await button.click();
          await page.waitForChanges();
          const formErrorEl = await page.find("clio-form-error");
          expect(await formErrorEl.isVisible()).toBe(true);
        });
      });
    });
  });

  describe("validate", () => {
    let input: E2EElement;
    let form: E2EElement;

    beforeEach(async () => {
      await page.setContent(templateWithRequiredInputField);
      form = await page.find("clio-form");
      input = await page.find("clio-input input");
    });

    describe("when the form is invalid", () => {
      it("should validate, set `isDirty` to true and display an error", async () => {
        await form.callMethod("validate");
        await page.waitForChanges();
        const formErrorElement = await page.find("clio-form-error");

        expect(await form.callMethod("isValid")).toEqual(false);
        expect(await form.callMethod("isDirty")).toEqual(true);
        expect(await formErrorElement.isVisible()).toEqual(true);
      });
    });

    describe("when the form is valid", () => {
      it("should validate and no error should be visible", async () => {
        await input.type("t", { delay: 20 });
        await form.callMethod("validate");
        await triggerBlurEvent();
        await page.waitForChanges();

        expect(await form.callMethod("isValid")).toEqual(true);
        expect(await form.callMethod("isDirty")).toEqual(true);
        expect(await page.find("clio-form-error")).toBe(null);
      });
    });
  });
});
