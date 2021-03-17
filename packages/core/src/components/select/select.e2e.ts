import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";
const template = `
  <form name="select-form">
    <clio-select id="select" name="role-selection" label="Select a role"></clio-select>
    <button type="submit">Submit</button>
  </form>
  <script>
    function onSubmitHandler(e) {
      e.preventDefault();
      var formData = new FormData(form);
      var preElement;

      // Create an <pre> element with innerText that
      // will be set to the "name,value" of the select input field
      // In the tests below we can select this element by id and check
      // that its innerText value is correct.
      for (var value of formData.entries()) {
        preElement = document.createElement("pre");
        preElement.innerText = value;
        preElement.id = "form-values";
        form.appendChild(preElement);
      }
    }

    function onInputHandler(ev, selectElement) {
      var searchTerm = ev.detail.value.toLowerCase();
      var filteredItems = roles.filter(function (item) {
        return item.label.toLowerCase().indexOf(searchTerm) === 0;
      });
      selectElement.items = filteredItems;
    }

    var form = document.forms.namedItem("select-form");
    form.onsubmit = onSubmitHandler;

    var selectRole = document.getElementById("select");
    var roles = [
      { label: "Associate", value: 1 },
      { label: "Liaison", value: 2 },
      { label: "Consultant", value: 3 },
    ];
    selectRole.items = roles;
    selectRole.value = 3;
    selectRole.addEventListener("clioInput", function(e) {
      onInputHandler(e, selectRole);
    });
  </script>
`;

const requiredTemplate = `
  <clio-select id="required-select" required="true"></clio-select>
  <script>
    const requiredSelect = document.getElementById("required-select");
    requiredSelect.validationRules = [{ name: "required" }];

    const roles = [{ label: "Associate", value: 1 }, { label: "Liaison", value: 2 }, { label: "Consultant", value: 3 }];
    requiredSelect.items = roles;

    function onInputHandler(ev, selectElement) {
      const searchTerm = ev.detail.value.toLowerCase();
      const filteredItems = roles.filter(function (item) {
        return item.label.toLowerCase().indexOf(searchTerm) === 0;
      });
      selectElement.items = filteredItems;
    }

    requiredSelect.addEventListener("clioInput", function(e) {
      onInputHandler(e, requiredSelect, roles);
  });
  </script>
`;

const triggerBlurEvent = async (page: E2EPage) => {
  // triggering a click on html body to generate blur event for input
  await page.click("body");
  await page.waitForChanges();
};

describe("Select", () => {
  let page: E2EPage;
  let clioSelect: E2EElement;
  let clioInput: E2EElement;
  let inputEl: E2EElement;
  let dropdownMenu: E2EElement;
  let menuItems: E2EElement[];

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(template);

    clioSelect = await page.find("#select");
    clioInput = await page.find("#select clio-input");
    inputEl = await page.find("clio-input input");
    dropdownMenu = await page.find("#select .select__popover");
    menuItems = await dropdownMenu.findAll("li");
  });

  describe("when a value is initally set", () => {
    it("displays the label text of the item with the initialized value in the Select's input", async () => {
      expect(await clioInput.getProperty("value")).toEqual("Consultant");
    });

    describe("and within a form that is submitted", () => {
      it("gets the value that was set on the Select in the form data", async () => {
        const clioSelectName = clioSelect.getAttribute("name");
        const clioSelectValue = await clioSelect.getProperty("value");

        const submitButton = await page.find("button[type='submit']");
        await submitButton.click();

        const formValuesContainer = await page.find("#form-values");
        expect(formValuesContainer.innerText).toEqual(`${clioSelectName},${clioSelectValue}`);
      });
    });
  });

  describe("when the value is updated", () => {
    it("updates the Select's input text to match the label text of the item with the value", async () => {
      await page.$eval("#select", (select: HTMLClioSelectElement) => {
        select.value = 1;
      });

      await page.waitForChanges();
      expect(await clioInput.getProperty("value")).toEqual("Associate");
    });
  });

  describe("when the input is clicked", () => {
    beforeEach(async () => {
      await clioInput.click();
    });

    describe("when the input field is empty", () => {
      it("opens the menu and displays a list of unfiltered items", async () => {
        expect(dropdownMenu.innerText).toEqual("AssociateLiaisonConsultant");
        expect(menuItems).toHaveLength(3);
        expect(await dropdownMenu.isVisible()).toBe(true);
      });
    });

    describe("after some text has been entered in the input", () => {
      describe("and there are no matches for the query string", () => {
        beforeEach(async () => {
          await clioInput.press("Backspace");
          await clioInput.type("at");

          menuItems = await dropdownMenu.findAll("li");
        });

        it("opens the menu and displays one result saying `No Matches`", async () => {
          expect(menuItems).toHaveLength(1);
          expect(menuItems[0].innerText).toEqual("No Matches");
          expect(await dropdownMenu.isVisible()).toBe(true);
        });

        describe("and then then input field value is replaced with text that matches an item", () => {
          it("displays a dropdown only containing items that match the text entered", async () => {
            await clioInput.press("Backspace"); // change the input to "a" which should match "Associate".

            menuItems = await dropdownMenu.findAll("li");
            expect(menuItems).toHaveLength(1);
            expect(menuItems[0].innerText).toEqual("Associate");
            expect(await dropdownMenu.isVisible()).toBe(true);
          });
        });
      });
      it("opens the menu and displays a list of unfiltered items", async () => {
        await clioInput.press("Backspace");
        await clioInput.type("Associate");
        await clioInput.click();

        menuItems = await dropdownMenu.findAll("li");
        expect(menuItems).toHaveLength(3);
        expect(await dropdownMenu.isVisible()).toBe(true);
      });
    });
  });

  describe("when the dropdown caret is clicked", () => {
    it("toggles the visibility of the menu", async () => {
      let dropDownCaret: E2EElement;
      dropDownCaret = await page.find("clio-icon");

      await dropDownCaret.click();

      expect(dropdownMenu.innerText).toEqual("AssociateLiaisonConsultant");
      expect(menuItems).toHaveLength(3);
      expect(await dropdownMenu.isVisible()).toBe(true);

      await dropDownCaret.click();

      expect(await dropdownMenu.isVisible()).toBe(false);
    });

    it("sets focus on the input element", async () => {
      let dropDownCaret: E2EElement;
      dropDownCaret = await page.find("clio-icon");
      await dropDownCaret.click();

      const textInput = await page.accessibility.snapshot({
        root: await page.$(".text-input"),
      });

      expect(textInput.focused).toBe(true);
      await dropDownCaret.click();
    });
  });

  describe("when loading is true", () => {
    beforeEach(async () => {
      await page.$eval("#select", (select: HTMLClioSelectElement) => {
        select.loading = true;
      });
      await page.waitForChanges();
    });

    it("renders a loader component within its text input", async () => {
      const loader = await clioInput.find("clio-loader");

      expect(loader).not.toBeNull();
    });

    it("does not render the dropdown caret icon", async () => {
      const caret = await clioSelect.find(".text-input__icon");

      expect(caret).toBeNull();
    });

    it("makes the dropdown menu visible when its text input is clicked", async () => {
      await clioInput.click();
      page.waitForChanges();

      expect(await dropdownMenu.isVisible()).toBe(true);
    });

    describe("when loading is changed to false", () => {
      beforeEach(async () => {
        await page.$eval("#select", (select: HTMLClioSelectElement) => {
          select.loading = false;
        });
        await page.waitForChanges();
      });

      it("toggles the dropdown menu's visibility when the caret icon is clicked", async () => {
        const caret = await clioSelect.find(".text-input__icon");
        await caret.click();
        page.waitForChanges();
        expect(await dropdownMenu.isVisible()).toBe(true);

        await caret.click();
        page.waitForChanges();
        expect(await dropdownMenu.isVisible()).toBe(false);
      });
    });
  });

  describe("when loading is falsy", () => {
    it("does not render a loader component within its text input", async () => {
      const loader = await clioInput.find("clio-loader");

      expect(loader).toBeNull();
    });
  });

  describe("when the menu is open", () => {
    let itemSelectedSpy: EventSpy;

    beforeEach(async () => {
      await clioInput.click();
      itemSelectedSpy = await clioSelect.spyOnEvent("clioItemSelected");
    });

    describe("when an item is clicked", () => {
      let secondMenuItem: { label: string; value: number | string };

      beforeEach(async () => {
        const secondMenuItemElement = menuItems[1];
        await secondMenuItemElement.click();
        secondMenuItem = (await clioSelect.getProperty("items"))[1];
      });

      it("emits a 'clioItemSelected' event with the item's 'label' and 'value' values, contained in the event's details", async () => {
        expect(itemSelectedSpy).toHaveReceivedEventDetail({ label: secondMenuItem.label, value: secondMenuItem.value });
      });

      it("closes the menu", async () => {
        expect(await dropdownMenu.isVisible()).toBe(false);
      });

      it("sets the input's value to selected item's 'label' value", async () => {
        const textInputElement = await clioInput.find(".text-input");

        expect(await textInputElement.getProperty("value")).toEqual(secondMenuItem.label);
      });

      it("sets focus on the input", async () => {
        const textInput = await page.accessibility.snapshot({
          root: await page.$(".text-input"),
        });
        expect(textInput.focused).toBe(true);
      });

      it("sets the value of the inner input field to the `value` property of the select item", async () => {
        const selectName = await clioSelect.getProperty("name");
        const hiddenInnerInput = await clioSelect.find(`input[name="${selectName}"][type="hidden"]`);

        expect(await hiddenInnerInput.getProperty("value")).toEqual(secondMenuItem.value.toString());
      });
    });

    describe("when the 'Enter' key is pressed", () => {
      let firstMenuItem: { label: string; value: number | string };

      beforeEach(async () => {
        await clioSelect.press("Enter");
        firstMenuItem = (await clioSelect.getProperty("items"))[0];
      });

      it("emits a 'clioItemSelected' event with the item's 'label' and 'value' values, contained in the event's details", async () => {
        expect(itemSelectedSpy).toHaveReceivedEventDetail({ label: firstMenuItem.label, value: firstMenuItem.value });
      });

      it("closes the menu", async () => {
        expect(await dropdownMenu.isVisible()).toBe(false);
      });

      it("sets the input's value to selected item's 'label' value", async () => {
        const textInputElement = await clioInput.find(".text-input");

        expect(await textInputElement.getProperty("value")).toEqual(firstMenuItem.label);
      });

      it("sets focus on the input", async () => {
        const textInput = await page.accessibility.snapshot({
          root: await page.$(".text-input"),
        });
        expect(textInput.focused).toBe(true);
      });

      it("sets the value of the inner input field to the `value` property of the select item", async () => {
        const selectName = await clioSelect.getProperty("name");
        const hiddenInnerInput = await clioSelect.find(`input[name="${selectName}"][type="hidden"]`);

        expect(await hiddenInnerInput.getProperty("value")).toEqual(firstMenuItem.value.toString());
      });
    });
  });

  describe("when an input value is set by typing in the keyboard", () => {
    beforeEach(async () => {
      await clioInput.click();
      await clioInput.press("Backspace");
      await clioInput.type("liai");
    });

    it("updates the list of items that are displayed in the menu", async () => {
      menuItems = await dropdownMenu.findAll("li");

      expect(await clioInput.getProperty("value")).toEqual("liai");
      expect(dropdownMenu.innerText).toEqual("Liaison");
      expect(menuItems).toHaveLength(1);
    });

    describe("when the input value is an empty string", () => {
      it("closes the menu", async () => {
        await clioInput.click();
        await clioInput.press("Backspace");

        expect(await clioInput.getProperty("value")).toEqual("");
        expect(await dropdownMenu.isVisible()).toBe(false);
      });
    });

    describe("and the escape key is press", () => {
      beforeEach(async () => {
        await clioSelect.press("Escape");
      });

      it("clears the input value", async () => {
        expect(await clioInput.getProperty("value")).toEqual("");
      });

      it("sets the value of the inner input field to undefined", async () => {
        const selectName = await clioSelect.getProperty("name");
        const hiddenInnerInput = await clioSelect.find(`input[name="${selectName}"][type="hidden"]`);

        expect(await hiddenInnerInput.getProperty("value")).toBe("");
      });

      it("closes the menu", async () => {
        expect(await dropdownMenu.isVisible()).toBe(false);
      });

      it("focuses the input field", async () => {
        // Leveraging puppeteer snapshots: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#accessibilitysnapshotoptions
        const textInput = await page.accessibility.snapshot({
          root: await page.$(".text-input"),
        });
        expect(textInput.focused).toBe(true);
      });
    });
  });

  describe("when the input is blurred", () => {
    describe("and the selection is invalid", () => {
      it("clears the value", async () => {
        await inputEl.type("testing");

        await triggerBlurEvent(page);

        expect(await clioSelect.getProperty("value")).toBeUndefined();
        expect(await clioInput.getProperty("value")).toEqual("");
      });
    });

    describe("and the selection is valid", () => {
      it("does NOT clear the value", async () => {
        await clioInput.click();
        const firstMenuItemElement = menuItems[0];

        await firstMenuItemElement.click();
        await triggerBlurEvent(page);

        expect(await clioSelect.getProperty("value")).toBe(1);
        expect(await clioInput.getProperty("value")).toEqual("Associate");
      });
    });
  });
});

describe("when methods are called externally", () => {
  // Some methods can be called externally, by a parent component or by JS code
  // This is harder to recreate in a E2E test without adding superfluous elements to trigger behaviour
  // So we are calling them directly
  let page: E2EPage;
  let clioSelectEl: E2EElement;
  let clioInputContanerEl: E2EElement;
  let inputEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(requiredTemplate);
    clioSelectEl = await page.find("clio-select");
    clioInputContanerEl = await page.find(".text-input--container");
    inputEl = await page.find("clio-input input");
  });

  describe("when the #isValid method is called externally", () => {
    describe("and a valid selection has NOT been made", () => {
      it("returns false", async () => {
        const isValid = await clioSelectEl.callMethod("isValid");
        expect(isValid).toBe(false);
      });
    });

    describe("and a valid selection has been made", () => {
      it("returns true", async () => {
        clioSelectEl.setProperty("value", 1);

        const isValid = await clioSelectEl.callMethod("isValid");
        expect(isValid).toBe(true);
      });
    });
  });

  describe("when the #validate method is called externally", () => {
    beforeEach(async () => {
      await clioSelectEl.callMethod("validate");
      await page.waitForChanges();
    });

    it("should force the inner input to validate and is invalid", async () => {
      const inputElementValidity = await page.$eval("clio-input input", (input: HTMLInputElement) => {
        return input.validity.valid;
      });

      expect(inputElementValidity).toBe(false);
    });

    it("should render an error message in the UI", async () => {
      const formErrorElement = await page.find("clio-form-error");
      expect(await formErrorElement.isVisible()).toEqual(true);
      expect(formErrorElement.innerText).toBe("This field is required.");
      expect(clioInputContanerEl).toHaveClass("text-input--container__error");
    });
  });

  describe("when the #isDirty method is called externally", () => {
    describe("and the component has NOT been touched", () => {
      it("returns false", async () => {
        const isDirty = await clioSelectEl.callMethod("isDirty");
        expect(isDirty).toBe(false);
      });
    });

    describe("and the component has been touched", () => {
      it("returns true", async () => {
        await inputEl.type("testing");
        await page.click("body");
        await page.waitForChanges();

        const isDirty = await clioSelectEl.callMethod("isDirty");
        expect(isDirty).toBe(true);
      });
    });
  });

  describe("when the #setDirty method is called externally", () => {
    describe("and called with 'true'", () => {
      it("should set 'dirty' to 'true'", async () => {
        expect(await clioSelectEl.callMethod("isDirty")).toBe(false);
        await clioSelectEl.callMethod("setDirty", true);
        expect(await clioSelectEl.callMethod("isDirty")).toBe(true);
      });
    });

    describe("and called with 'false'", () => {
      it("should set 'dirty' to 'false'", async () => {
        await clioSelectEl.callMethod("setDirty", true);
        expect(await clioSelectEl.callMethod("isDirty")).toBe(true);
        await clioSelectEl.callMethod("setDirty", false);
        expect(await clioSelectEl.callMethod("isDirty")).toBe(false);
      });
    });
  });

  describe("when the #setFocus method is called externally", () => {
    beforeEach(async () => {
      await inputEl.type("testing");
      await triggerBlurEvent(page);
      await clioSelectEl.callMethod("setFocus");
    });

    it("should set `focused` on the underlying input element", async () => {
      const textInput = await page.accessibility.snapshot({
        root: await page.$(".text-input"),
      });
      expect(textInput.focused).toBe(true);
    });
  });
});
