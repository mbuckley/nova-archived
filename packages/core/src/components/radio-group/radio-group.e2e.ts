import { E2EPage, newE2EPage } from "@stencil/core/testing";

describe("Radio Group", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("when radio group's value changes", () => {
    beforeEach(async () => {
      await page.setContent(`
        <clio-radio-group value="1">
          <clio-radio name="group" value="1" label="Option 1"></clio-radio>
          <clio-radio name="group" value="2" label="Option 2"></clio-radio>
        </clio-radio-group>
      `);
    });

    it("emits a 'clioChange' event with the updated value", async () => {
      const clioChangeSpy = await page.spyOnEvent("clioChange");

      const radioEl2 = await page.find("clio-radio[value='2'] input");
      await radioEl2.click();

      expect(clioChangeSpy).toHaveReceivedEventTimes(1);
      expect(clioChangeSpy).toHaveReceivedEventDetail({ value: "2" });
    });

    it("updates the 'value' property on the host element", async () => {
      const radioGroupEl = await page.find("clio-radio-group");

      const radioEl2 = await page.find("clio-radio[value='2'] input");
      await radioEl2.click();

      expect(await radioGroupEl.getProperty("value")).toEqual("2");
    });
  });
});
