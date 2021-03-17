import { newE2EPage, E2EPage, E2EElement } from "@stencil/core/testing";
const template = `
  <clio-label id="labelledById">Select something</clio-label>
  <clio-select id="select" name="text-select" aria-label="This is a custom label" aria-labelledby="labelledById" aria-describedby="describedById"></clio-select>
  <clio-label id="describedById" label-type="sub-label">Select something</clio-label>
  <script>
    const select = document.getElementById("select");
    select.items = [
      { label: "Associate", value: 1 },
      { label: "Liaison", value: 2 },
      { label: "Consultant", value: 3 },
    ];
  </script>
`;

describe("Select A11y", () => {
  let page: E2EPage;
  let rootEl: E2EElement;
  let selectContainer: E2EElement;
  let inputElement: E2EElement;
  let menuElement: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(template);

    rootEl = await page.find("#select");
    selectContainer = await page.find("#select .select");
    inputElement = await page.find("#select clio-input");
    menuElement = await page.find("#select .select__popover");
  });

  describe("Select Element", () => {
    it("has the correct accessibility attributes", () => {
      expect(selectContainer.getAttribute("aria-expanded")).toEqual("false");
      expect(selectContainer.getAttribute("aria-haspopup")).toEqual("listbox");
      expect(selectContainer.getAttribute("aria-owns")).toMatch("listbox-");
    });

    it("updates aria-expanded when the menu is set to active", async () => {
      await inputElement.click();

      expect(selectContainer.getAttribute("aria-expanded")).toEqual("true");
    });

    it("sets and persists the same valid aria-labelledby value on the input and listbox elements", async () => {
      const clioInputChildInput = await inputElement.find("input");
      const listboxElement = await menuElement.find("ul");

      expect(clioInputChildInput.getAttribute("aria-labelledby")).toMatch("labelledById");
      expect(clioInputChildInput.getAttribute("aria-labelledby")).toEqual(
        listboxElement.getAttribute("aria-labelledby"),
      );

      await inputElement.click(); // Click to open the popover.

      expect(clioInputChildInput.getAttribute("aria-labelledby")).toEqual(
        listboxElement.getAttribute("aria-labelledby"),
      );
    });
  });

  describe("Input Element", () => {
    describe("Attributes/Properties", () => {
      let listboxId: string;
      let clioInputChildInput: E2EElement;

      beforeEach(async () => {
        listboxId = selectContainer.getAttribute("aria-owns");
        clioInputChildInput = await inputElement.find("input");
      });

      describe("aria-autocomplete", () => {
        it("is set to 'list'", async () => {
          expect(clioInputChildInput).toEqualAttribute("aria-autocomplete", "list");
          expect(clioInputChildInput).toEqualAttribute("aria-controls", listboxId);
        });
      });

      describe("aria-controls", () => {
        it("is set to the listbox ID", async () => {
          expect(clioInputChildInput).toEqualAttribute("aria-controls", listboxId);
        });
      });

      describe("aria-describedby", () => {
        it("adds an 'aria-describedby` attribute to the input element", async () => {
          expect(clioInputChildInput).toEqualAttribute("aria-describedby", "describedById");
        });
      });

      describe("aria-label", () => {
        it("adds an 'aria-label` attribute to the input element", async () => {
          expect(clioInputChildInput).toEqualAttribute("aria-label", "This is a custom label");
        });
      });

      describe("aria-labelledby", () => {
        it("adds an 'aria-labelledby` attribute to the input element", async () => {
          expect(clioInputChildInput).toEqualAttribute("aria-labelledby", "labelledById");
        });
      });
    });
  });

  describe("Listbox", () => {
    it("has the correct accessibility attributes", async () => {
      const listboxId = await selectContainer.getAttribute("aria-owns");
      const listboxElement = await menuElement.find("ul");

      expect(listboxElement.id).toEqual(listboxId);
      expect(listboxElement.getAttribute("role")).toEqual("listbox");
    });

    it("correctly sets and removes aria-selected on menu list items", async () => {
      const clioInputChildInput = await inputElement.find("input");
      await rootEl.click();
      let selectedItem = await menuElement.find("li[aria-selected='true']");

      expect(selectedItem.innerText).toEqual("Associate");
      expect(clioInputChildInput.getAttribute("aria-activedescendant")).toEqual(selectedItem.id);

      await rootEl.press("ArrowDown");

      selectedItem = await menuElement.find("li[aria-selected='true']");

      expect(selectedItem.innerText).toEqual("Liaison");
      expect(clioInputChildInput.getAttribute("aria-activedescendant")).toEqual(selectedItem.id);

      // Get the selection to wrap around back to the last item in the list.
      await rootEl.press("ArrowUp");
      await rootEl.press("ArrowUp");

      selectedItem = await menuElement.find("li[aria-selected='true']");

      expect(selectedItem.innerText).toEqual("Consultant");
      expect(clioInputChildInput.getAttribute("aria-activedescendant")).toEqual(selectedItem.id);

      // Select the first list item
      await rootEl.press("Home");

      selectedItem = await menuElement.find("li[aria-selected='true']");

      expect(selectedItem.innerText).toEqual("Associate");
      expect(clioInputChildInput.getAttribute("aria-activedescendant")).toEqual(selectedItem.id);

      // Select the last list item
      await rootEl.press("End");

      selectedItem = await menuElement.find("li[aria-selected='true']");

      expect(selectedItem.innerText).toEqual("Consultant");
      expect(clioInputChildInput.getAttribute("aria-activedescendant")).toEqual(selectedItem.id);
    });
  });

  describe("Focus state with Mouse and Keyboard", () => {
    let firstMenuItem, secondMenuItem, thirdMenuItem;

    beforeEach(async () => {
      await rootEl.click();
      firstMenuItem = await menuElement.find("li:nth-child(1)");
      secondMenuItem = await menuElement.find("li:nth-child(2)");
      thirdMenuItem = await menuElement.find("li:nth-child(3)");
    });

    it("shifts the focus state to the next menu item using keyboard events", async () => {
      await rootEl.press("ArrowDown");

      expect(await secondMenuItem.getAttribute("aria-selected")).toBe("true");
    });

    it("shifts the focus back to the first item by using the mouse to hover on it", async () => {
      await firstMenuItem.hover();

      expect(await firstMenuItem.getAttribute("aria-selected")).toBe("true");
    });

    it("shifts the focus to the next available menu item using a keyboard event", async () => {
      await secondMenuItem.hover();

      await rootEl.press("ArrowDown");

      expect(await thirdMenuItem.getAttribute("aria-selected")).toBe("true");
    });
  });
});
