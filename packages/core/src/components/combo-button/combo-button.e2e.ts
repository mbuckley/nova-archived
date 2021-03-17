import { E2EPage, newE2EPage } from "@stencil/core/testing";

const template = `
  <clio-combo-button id="my-combo-button" primary-action-label="Default combo button">
    <clio-menu slot="parent-slot">
      <clio-menu-item onclick="console.log('One')">One</clio-menu-item>
      <clio-menu-item onclick="console.log('Two')">Two</clio-menu-item>
      <clio-menu-item onclick="console.log('Three')">Three</clio-menu-item>
    </clio-menu>
  </clio-combo-button>
`;

const primaryButtonAction = () => {
  console.log("primaryButtonAction called !");
};

describe("combo-button", () => {
  let page: E2EPage;

  beforeAll(() => {
    global.console.log = jest.fn();
  });

  beforeEach(async () => {
    page = await newE2EPage();
  });

  afterEach(() => {
    jest.clearAllMocks();
    page = null;
  });

  describe("primary button", () => {
    it("executes the primary action when clicked", async () => {
      await page.setContent(template);

      // Exposing function before use
      // Ref link: https://github.com/ionic-team/stencil/issues/1174
      await page.exposeFunction("primaryButtonAction", primaryButtonAction); // EXPOSE

      await page.$eval("clio-combo-button", (elm: any) => {
        elm.primaryActionClick = primaryButtonAction; // USE
      });

      await page.waitForChanges();

      const primaryButtonEl = await page.find("clio-combo-button >>> clio-button.combo-button--primary");
      await primaryButtonEl.click();
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });

  describe("secondary button", () => {
    it("toggles the popover when secondary button is clicked", async () => {
      await page.setContent(template);

      const secondaryButtonEl = await page.find("clio-combo-button >>> clio-button.combo-button--secondary");
      const popover = await page.find("clio-combo-button >>> clio-popover");

      await secondaryButtonEl.click();

      await page.waitForChanges();
      expect(await popover.isVisible()).toBe(true);

      await secondaryButtonEl.click();
      await page.waitForChanges();
      expect(await popover.isVisible()).toBe(false);
    });
  });

  describe("when clicking one of the menu items", () => {
    it("closes the popover", async () => {
      await page.setContent(template);
      await page.waitForChanges();

      const secondaryButtonEl = await page.find("clio-combo-button >>> clio-button.combo-button--secondary");

      await secondaryButtonEl.click();
      await page.waitForChanges();

      const popover = await page.find("clio-combo-button >>> clio-popover");

      /* As recommended by Stencil and Puppeteer, we use `evaluateHandle(JS path)` to fetch the first clio-menu-item
      which is nested within multiple shadow DOMS i.e.
       * clio-combo-button >>> clio-popover >>> clio-menu >>> clio-menu-item
       * Refer below links for details,
       * https://github.com/ionic-team/stencil/issues/1530
       * https://github.com/GoogleChrome/puppeteer/issues/858#issuecomment-438540596
       */
      const firstMenuItem = await page.evaluateHandle(
        `document.querySelector("#my-combo-button > clio-menu > clio-menu-item:nth-child(1)")`,
      );

      firstMenuItem.asElement().click();
      await page.waitForChanges();
      expect(await popover.getProperty("active")).toBe(false);
    });
  });
});
