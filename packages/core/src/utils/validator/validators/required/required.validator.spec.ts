import { requiredValidator } from "./required.validator";

describe("#requiredValidator", () => {
  describe("when a truthy value is provided", () => {
    it("returns true", () => {
      expect(requiredValidator().validate("hello")).toEqual(true);
    });
  });

  describe("when a falsy value is provided", () => {
    it("returns true", () => {
      expect(requiredValidator().validate(undefined)).toEqual(false);
    });
  });

  it("provides a message value", () => {
    expect(requiredValidator().errorMessage).toEqual("This field is required.");
  });
});
