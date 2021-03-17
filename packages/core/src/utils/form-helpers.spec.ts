jest.mock("./helpers");

import { linkLabelComponents } from "./form-helpers";

describe("Form Helpers", () => {
  describe("#linkLabelComponents", () => {
    let inputEl = document.createElement("input");
    let labelEl = document.createElement("clio-label");
    let subLabelEl = document.createElement("clio-label");

    const inputId = "input-id";
    inputEl.setAttribute("id", inputId);

    it("sets the label attributes if provided", async () => {
      linkLabelComponents(inputEl, labelEl, null);

      expect(labelEl.getAttribute("id")).toBe("clio-label-UUID");
      expect(labelEl.getAttribute("for")).toBe(inputId);
      expect(inputEl.getAttribute("aria-labelledby")).toBe("clio-label-UUID");
    });

    it("sets the sub-label attributes if provided", async () => {
      linkLabelComponents(inputEl, null, subLabelEl);

      expect(subLabelEl.getAttribute("id")).toBe("clio-sub-label-UUID");
      expect(inputEl.getAttribute("aria-describedby")).toBe("clio-sub-label-UUID");
    });
  });
});
