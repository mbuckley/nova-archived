import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";

describe("when the clio-checkbox has no validation rules", () => {
  let page: E2EPage;
  let clioChangeSpy: EventSpy;
  let checkboxEl: E2EElement;
  let clioCheckboxEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });
  describe("and the user clicks a checked checkbox", () => {
    beforeEach(async () => {
      await page.setContent(`<clio-checkbox checked="true" label="some label"></clio-checkbox>`);
      clioChangeSpy = await page.spyOnEvent("clioChange");
      checkboxEl = await page.find("clio-checkbox input");
      clioCheckboxEl = await page.find("clio-checkbox");
      await clioCheckboxEl.click();
    });

    it("emits a `clioChange` event", async () => {
      expect(clioChangeSpy).toHaveReceivedEventTimes(1);
      expect(clioChangeSpy).toHaveReceivedEventDetail({ checked: false });
    });

    it("keeps the `checked` prop in sync with underlying input", async () => {
      expect(await checkboxEl.getProperty("checked")).toBe(false);
      expect(await clioCheckboxEl.getProperty("checked")).toBe(false);

      await checkboxEl.click();

      expect(await checkboxEl.getProperty("checked")).toBe(true);
      expect(await clioCheckboxEl.getProperty("checked")).toBe(true);
    });
  });

  describe("and the user clicks an indeterminate checkbox", () => {
    it("keeps indeterminate prop in sync with underlying input", async () => {
      await page.setContent(`<clio-checkbox indeterminate="true"></clio-checkbox>`);

      checkboxEl = await page.find("clio-checkbox input");
      clioCheckboxEl = await page.find("clio-checkbox");
      await clioCheckboxEl.click();
      await page.waitForChanges();

      expect(await checkboxEl.getProperty("checked")).toBe(true);
      expect(await checkboxEl.getProperty("indeterminate")).toBe(false);

      expect(await clioCheckboxEl.getProperty("checked")).toBe(true);
      expect(await clioCheckboxEl.getProperty("indeterminate")).toBe(false);
    });
  });
});

describe("when the clio-checkbox has validation rules", () => {
  let page: E2EPage;
  let clioCheckboxEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<clio-checkbox required="true" label="required checkbox"></clio-checkbox>`);
    clioCheckboxEl = await page.find("clio-checkbox");
  });

  describe("and an unchecked checkbox is validated", () => {
    let formErrorEl: E2EElement | undefined;

    beforeEach(async () => {
      await clioCheckboxEl.callMethod("validate");
      await page.waitForChanges();
    });

    it("is not valid", async () => {
      expect(await clioCheckboxEl.callMethod("isValid")).toBe(false);
    });

    it("renders a clio-form-error", async () => {
      formErrorEl = await page.find("clio-form-error");
      expect(await formErrorEl.isVisible()).toEqual(true);
      expect(formErrorEl.textContent.trim()).toEqual("This field is required.");
      expect(formErrorEl).toHaveClass("clio-checkbox__error");
    });
  });

  describe("and the user clicks an unchecked checkbox", () => {
    beforeEach(async () => {
      clioCheckboxEl.click();
      await page.waitForChanges();
    });

    it("updates the value of `valid`", async () => {
      expect(await clioCheckboxEl.callMethod("isValid")).toBe(true);
    });

    describe("and the checkbox is validated", () => {
      beforeEach(async () => {
        await clioCheckboxEl.callMethod("validate");
        await page.waitForChanges();
      });

      it("is not valid", async () => {
        expect(await clioCheckboxEl.callMethod("isValid")).toBe(true);
      });

      it("renders a clio-form-error", async () => {
        expect(await page.find("clio-form-error")).toBeNull();
      });
    });
  });
});
