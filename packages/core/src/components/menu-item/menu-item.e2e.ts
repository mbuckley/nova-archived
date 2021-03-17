import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";

describe("menu-item", () => {
  let page: E2EPage;
  let menuItem: E2EElement;
  let clioMenuItemActivated: EventSpy;
  let clioMenuItemHovered: EventSpy;

  beforeAll(() => {
    global.console.log = jest.fn();
  });

  beforeEach(async () => {
    page = await newE2EPage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("has disabled prop set to true", () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <clio-menu-item disabled="true" onClick="console.log('hello')">Foo</clio-menu-item>
      `);
      menuItem = await page.find("clio-menu-item");
      clioMenuItemActivated = await page.spyOnEvent("clioMenuItemActivated");
      clioMenuItemHovered = await page.spyOnEvent("clioMenuItemHovered");
    });

    describe("when clicked", () => {
      beforeEach(async () => {
        await menuItem.click();
        await page.waitForChanges();
      });

      it("does not execute click handler for the list item", async () => {
        expect(console.log).not.toHaveBeenCalled();
      });

      it("does not emit a 'clioMenuItemActivated' event", async () => {
        expect(clioMenuItemActivated).not.toHaveReceivedEvent();
      });
    });

    describe("on hover", () => {
      it("does not emit a 'clioMenuItemHovered' event", async () => {
        await menuItem.hover();
        await page.waitForChanges();
        expect(clioMenuItemHovered).not.toHaveReceivedEvent();
      });
    });
  });

  describe("has disabled prop set to false", () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <clio-menu-item onClick="console.log('hello')">Foo</clio-menu-item>
      `);
      menuItem = await page.find("clio-menu-item");
      clioMenuItemActivated = await page.spyOnEvent("clioMenuItemActivated");
      clioMenuItemHovered = await page.spyOnEvent("clioMenuItemHovered");
    });

    describe("when clicked", () => {
      beforeEach(async () => {
        await menuItem.click();
        await page.waitForChanges();
      });

      it("executes click handler", async () => {
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it("emits a 'clioMenuItemActivated' event", async () => {
        expect(clioMenuItemActivated).toHaveReceivedEventTimes(1);
      });
    });

    describe("on hover", () => {
      it("emits a 'clioMenuItemHovered' event", async () => {
        await menuItem.hover();
        await page.waitForChanges();

        expect(clioMenuItemHovered).toHaveReceivedEventTimes(1);
      });
    });
  });
});
