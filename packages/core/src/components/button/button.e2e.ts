import { E2EPage, newE2EPage } from "@stencil/core/testing";

describe("button", () => {
  let page: E2EPage;

  beforeAll(() => {
    global.console.log = jest.fn();
  });

  beforeEach(async () => {
    page = await newE2EPage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("click event", () => {
    it("executes click handler if button is not disabled", async () => {
      await page.setContent(`
        <clio-button onclick="console.log('Clicked !')">Primary</clio-button>
      `);

      const button = await page.find("clio-button");
      await button.click();

      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it("does not execute click handler on a disabled link button", async () => {
      await page.setContent(`
        <clio-button disabled="true" href="clio.com" onclick="console.log('Clicked !')">Primary</clio-button>
      `);

      const button = await page.find("clio-button");
      await button.click();

      expect(console.log).not.toHaveBeenCalled();
    });

    it("does not execute click handler if button is disabled", async () => {
      await page.setContent(`
        <clio-button disabled="true" onclick="console.log('Clicked !')">Primary</clio-button>
      `);

      const button = await page.find("clio-button");
      await button.click();

      expect(console.log).not.toHaveBeenCalled();
    });

    it("disables and enables click event handling depending on the loading value", async () => {
      await page.setContent(`
        <clio-button loading="true" onclick="console.log('Clicked !')">Primary</clio-button>
      `);
      const button = await page.find("clio-button");
      await button.click();

      expect(console.log).not.toHaveBeenCalled();

      await page.$eval("clio-button", (button: HTMLClioButtonElement) => {
        button.loading = false;
      });
      await page.waitForChanges();

      await button.click();
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });

  describe("clioFocus", () => {
    it("should emit an event on focus", async () => {
      await page.setContent(`
        <clio-button onclick="console.log('Clicked !')">Primary</clio-button>
      `);
      const clioFocusEvent = await page.spyOnEvent("clioFocus");

      const nativeButtonElement = await page.find("clio-button >>> button");
      await nativeButtonElement.focus();
      await page.waitForChanges();

      expect(clioFocusEvent).toHaveReceivedEventTimes(1);
    });
  });

  describe("clioBlur", () => {
    it("should emit an event on blur", async () => {
      await page.setContent(`<clio-button class="first"></clio-button><clio-button class='second'></clio-button>`);
      const clioBlurEvent = await page.spyOnEvent("clioBlur");

      // Focus on the first button
      const button1 = await page.find("clio-button.first >>> button");
      button1.focus();

      // Move focus to the second button, this will trigger blur event on the first one
      const button2 = await page.find("clio-button.second >>> button");
      button2.focus();

      await page.waitForChanges();

      // Now, check if the blur event was received
      expect(clioBlurEvent).toHaveReceivedEventTimes(1);
    });
  });

  describe("when a clio-button has an href property", () => {
    it("opens the url specified on button click", async () => {
      await page.setContent(`<clio-button>Button</clio-button>`);
      const button = await page.find("clio-button");
      button.setProperty("href", "https://www.clio.com");
      button.setProperty("target", "_self");
      await page.waitForChanges();
      await button.click();

      expect(page.url()).toEqual("https://www.clio.com/");
    });
  });

  describe("when used as a submit button", () => {
    it("submits the form", async () => {
      await page.setContent(`
        <form onsubmit="console.log('hello')">
          <clio-input name="city" value="burnaby"></clio-input>
          <clio-button type="submit">Primary</clio-button>
        </form>
      `);

      const button = await page.find("clio-button");
      await button.click();

      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });
});
