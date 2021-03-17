jest.mock("../../utils/helpers");

import { RadioGroup } from "./radio-group";
import { newSpecPage } from "@stencil/core/testing";

describe("Radio Group", () => {
  describe("render", () => {
    it("renders the component with a label if specified", async () => {
      const page = await newSpecPage({
        components: [RadioGroup],
        html: `
          <clio-radio-group label="Group Label">
            <clio-radio name="group" value="1" label="Option 1"></clio-radio>
            <clio-radio name="group" value="2" label="Option 2"></clio-radio>
          </clio-radio-group>
        `,
      });

      expect(page.root).toEqualHtml(`
        <clio-radio-group label="Group Label">
          <clio-label for="clio-radio-group-UUID" id="clio-label-UUID">
            Group Label
          </clio-label>
          <span aria-labelledby="clio-label-UUID" id="clio-radio-group-UUID" role="radiogroup">
            <clio-radio aria-describedby="clio-label-UUID" label="Option 1" name="group" value="1"></clio-radio>
            <clio-radio aria-describedby="clio-label-UUID" label="Option 2" name="group" value="2"></clio-radio>
          </span>
        </clio-radio-group>
      `);
    });
  });
});
