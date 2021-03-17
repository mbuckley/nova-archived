import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

const template = `
  <clio-radio-group value="1">
    <clio-radio name="group" value="1" label="Option 1"></clio-radio>
    <clio-radio name="group" value="2" label="Option 2"></clio-radio>
  </clio-radio-group>
`;

describe("radio", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  describe("When used with clio-radio-group", () => {
    let radioGroupEl: E2EElement;
    let radioEl1: E2EElement;
    let radioEl2: E2EElement;

    beforeEach(async () => {
      await page.setContent(template);
      await page.waitForChanges();

      radioGroupEl = await page.find("clio-radio-group");
      radioEl1 = await page.find("clio-radio[value='1'] input");
      radioEl2 = await page.find("clio-radio[value='2'] input");
    });

    describe("Initial state", () => {
      describe("when the radio group's value matches the radio's value", () => {
        it("adds the 'checked' property", async () => {
          expect(await radioEl1.getProperty("checked")).toEqual(true);
        });
      });

      describe("when the radio group's value does NOT match the radio's value", () => {
        it("adds the 'checked' property", async () => {
          expect(await radioEl2.getProperty("checked")).toEqual(false);
        });
      });
    });

    describe("When another radio element is clicked", () => {
      beforeEach(async () => {
        await radioEl2.click();
      });

      it("adds the 'checked' property to the newly selected radio input", async () => {
        expect(await radioEl2.getProperty("checked")).toEqual(true);
      });

      it("removes the 'checked' property from the previously selected radio input", async () => {
        expect(await radioEl1.getProperty("checked")).toEqual(false);
      });

      it("updates the value on the radio-group element", async () => {
        expect(await radioGroupEl.getProperty("value")).toEqual("2");
      });
    });
  });
});
