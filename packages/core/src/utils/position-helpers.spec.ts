import { positionElement } from "./position-helpers";

describe("Position Helpers", () => {
  describe("positionElement()", () => {
    const contentEl = document.createElement("div");
    const contentElGetBoundingClientRectSpy = jest.fn(() => ({
      left: 10,
      top: 10,
      right: 10,
      bottom: 10,
      width: 10,
      height: 10,
    }));
    contentEl.getBoundingClientRect = contentElGetBoundingClientRectSpy;

    const targetEl = document.createElement("button");
    const targetElGetBoundingClientRectSpy = jest.fn(() => ({
      left: 40,
      top: 40,
      right: 40,
      bottom: 40,
      width: 40,
      height: 40,
    }));
    targetEl.getBoundingClientRect = targetElGetBoundingClientRectSpy;

    describe("Vertical Alignment", () => {
      it.each([["top", "-10px"], ["bottom", "40px"], ["middle", "15px"]])(
        "when 'alignY' is %s, top value is %s",
        (alignYValue: string, expected: string) => {
          positionElement(contentEl, targetEl, null, alignYValue);
          expect(contentEl.style.top).toBe(expected);
        },
      );
    });

    describe("Horizontal Alignment", () => {
      it.each([
        ["left", "middle", "30px"],
        ["left", null, "40px"],
        ["middle", null, "55px"],
        ["right", "middle", "40px"],
        ["right", null, "70px"],
      ])(
        "when 'alignX' is %s and 'alignY' is %s, left value is %s",
        (alignXValue: string, alignYValue: string, expected: string) => {
          positionElement(contentEl, targetEl, alignXValue, alignYValue);
          expect(contentEl.style.left).toBe(expected);
        },
      );
    });
  });
});
