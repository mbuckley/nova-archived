import { Radio } from "./radio";
import { newSpecPage } from "@stencil/core/testing";
import * as uuid from "../../utils/helpers";

describe("radio", () => {
  beforeAll(() => {
    spyOn(uuid, "uuid").and.returnValue("testUUID");
  });

  describe("render", () => {
    it("correctly renders a disabled radio input", async () => {
      const page = await newSpecPage({
        components: [Radio],
        html: `<clio-radio disabled="true" value="111"></clio-radio>`,
      });

      expect(page.root).toEqualHtml(`
        <clio-radio disabled value="111">
          <input type="radio" disabled id="clio-radio-testUUID" type="radio" value="111"  aria-disabled="true" aria-checked="false"/>
          <span class="radio-circle"></span>
        </clio-radio>
      `);
    });

    it("correctly renders the name attribute", async () => {
      const page = await newSpecPage({
        components: [Radio],
        html: `<clio-radio name="group1" value="111"></clio-radio>`,
      });

      expect(page.root).toEqualHtml(`
        <clio-radio name="group1" value="111">
          <input type="radio" name="group1" id="clio-radio-testUUID" type="radio" value="111" aria-checked="false"/>
          <span class="radio-circle"></span>
        </clio-radio>
      `);
    });

    it("renders the component with a label if specified", async () => {
      const page = await newSpecPage({
        components: [Radio],
        html: `<clio-radio label="This is a test label"></clio-radio>`,
      });

      expect(page.root).toEqualHtml(`
        <clio-radio label="This is a test label">
          <input aria-checked="false" aria-labelledby="clio-label-testUUID" id="clio-radio-testUUID" type="radio">
          <span class="radio-circle"></span>
          <clio-label for="clio-radio-testUUID" id="clio-label-testUUID">
            This is a test label
          </clio-label>
        </clio-radio>
      `);
    });
  });
});
