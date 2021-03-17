import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

const template = `
    <clio-menu>
      <clio-menu-item onclick="console.log('triggered')">Apple</clio-menu-item>
      <clio-menu-item>Asteroid</clio-menu-item>
      <clio-menu-item disabled="true">Disabled</clio-menu-item>
      <clio-menu-item>Zebra</clio-menu-item>
    </clio-menu>
`;

describe("Menu A11y", () => {
  let page: E2EPage;
  let menuEl: E2EElement;
  let firstMenuItem: E2EElement;
  let secondMenuItem: E2EElement;
  let lastMenuItem: E2EElement;

  beforeAll(() => {
    global.console.log = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(template);

    menuEl = await page.find("clio-menu >>> ul.menu");
    firstMenuItem = await page.find("clio-menu-item:nth-of-type(1) >>> li");
    secondMenuItem = await page.find("clio-menu-item:nth-of-type(2) >>> li");
    lastMenuItem = await page.find("clio-menu-item:nth-of-type(4) >>> li");

    firstMenuItem.focus();
    await page.waitForChanges();
  });

  describe("Menu Element", () => {
    it("has the correct role", async () => {
      expect(menuEl.getAttribute("role")).toEqual("menu");
    });
  });

  describe("Keyboard Interactions", () => {
    describe("when the 'Enter' key is pressed", () => {
      it("triggers the menu item", async () => {
        await firstMenuItem.press("Enter");
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });

    describe("when the 'Down Arrow' key is pressed", () => {
      it("shifts the focus state to the next available menu item", async () => {
        await firstMenuItem.press("ArrowDown");
        await page.waitForChanges();

        const secondMenuItemFocused = await page.find("clio-menu-item:nth-of-type(2) >>> :focus");
        await expect(secondMenuItemFocused).not.toBeNull();
      });
    });

    describe("when the 'Down Arrow' key is pressed on the last menu item", () => {
      it("shifts the focus state to the first available menu item", async () => {
        await lastMenuItem.press("ArrowDown");
        await page.waitForChanges();

        const firstMenuItemFocused = await page.find("clio-menu-item:nth-of-type(1) >>> :focus");
        await expect(firstMenuItemFocused).not.toBeNull();
      });
    });

    describe("when the 'Down Arrow' key is pressed and the next menu item is disabled", () => {
      it("skips the disabled item and shifts the focus state to the next available menu item", async () => {
        await secondMenuItem.press("ArrowDown");
        await page.waitForChanges();

        const thirdMenuItemFocused = await page.find("clio-menu-item:nth-of-type(3) >>> :focus");
        await expect(thirdMenuItemFocused).toBeNull();

        const lastMenuItemFocused = await page.find("clio-menu-item:nth-of-type(4) >>> :focus");
        await expect(lastMenuItemFocused).not.toBeNull();
      });
    });

    describe("when the 'Up Arrow' key is pressed", () => {
      it("shifts the focus state to the previous available menu item", async () => {
        await lastMenuItem.press("ArrowUp");
        await page.waitForChanges();

        const secondMenuItemFocused = await page.find("clio-menu-item:nth-of-type(2) >>> :focus");
        await expect(secondMenuItemFocused).not.toBeNull();
      });
    });

    describe("when the 'Up Arrow' key is pressed on the first menu item", () => {
      it("shifts the focus state to the first available menu item", async () => {
        await firstMenuItem.press("ArrowUp");
        await page.waitForChanges();

        const lastMenuItemFocused = await page.find("clio-menu-item:nth-of-type(4) >>> :focus");
        await expect(lastMenuItemFocused).not.toBeNull();
      });
    });

    describe("when the 'Home' key is pressed", () => {
      it("shifts the focus state to the first available menu item", async () => {
        await lastMenuItem.press("Home");
        await page.waitForChanges();

        const firstMenuItemFocused = await page.find("clio-menu-item:nth-of-type(1) >>> :focus");
        await expect(firstMenuItemFocused).not.toBeNull();
      });
    });

    describe("when the 'End' key is pressed", () => {
      it("shifts the focus state to the last available menu item", async () => {
        await firstMenuItem.press("End");
        await page.waitForChanges();

        const lastMenuItemFocused = await page.find("clio-menu-item:nth-of-type(4) >>> :focus");
        await expect(lastMenuItemFocused).not.toBeNull();
      });
    });

    describe("when the 'A' key is pressed", () => {
      it("shifts the focus state to the first available menu item that starts with an 'A'", async () => {
        await lastMenuItem.press("A");
        await page.waitForChanges();

        const firstMenuItemFocused = await page.find("clio-menu-item:nth-of-type(1) >>> :focus");
        await expect(firstMenuItemFocused).not.toBeNull();
      });

      describe("on a menu item that already starts with 'A'", () => {
        it("shifts the focus state to the next available menu item that starts with an 'A'", async () => {
          await firstMenuItem.press("A");
          await page.waitForChanges();

          const secondMenuItemFocused = await page.find("clio-menu-item:nth-of-type(2) >>> :focus");
          await expect(secondMenuItemFocused).not.toBeNull();
        });
      });
    });

    describe("when the 'Z' key is pressed", () => {
      it("shifts the focus state to the first available menu item that starts with an 'Z'", async () => {
        await firstMenuItem.press("Z");
        await page.waitForChanges();

        const lastMenuItemFocused = await page.find("clio-menu-item:nth-of-type(4) >>> :focus");
        await expect(lastMenuItemFocused).not.toBeNull();
      });
    });
  });

  describe("Focus state with Mouse and Keyboard", () => {
    it("shifts the focus state to the last menu item using keyboard events", async () => {
      await menuEl.press("ArrowDown");
      await page.waitForChanges();
      await menuEl.press("ArrowDown");
      await page.waitForChanges();

      const lastMenuItemFocused = await page.find("clio-menu-item:nth-of-type(4) >>> :focus");
      expect(lastMenuItemFocused).not.toBeNull();
    });

    it("shifts the focus back to the first item by using the mouse to hover on it", async () => {
      await firstMenuItem.hover();
      await page.waitForChanges();

      const firstMenuItemFocused = await page.find("clio-menu-item:nth-of-type(1) >>> :focus");
      expect(firstMenuItemFocused).not.toBeNull();
    });

    it("shifts the focus to the next available menu item using a keyboard event", async () => {
      await menuEl.press("ArrowDown");
      await page.waitForChanges();

      const secondMenuItemFocused = await page.find("clio-menu-item:nth-of-type(2) >>> :focus");
      expect(secondMenuItemFocused).not.toBeNull();
    });
  });
});
