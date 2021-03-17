import { defaultValidator } from "./default.validator";

describe("#defaultValidator", () => {
  it("returns true", () => {
    expect(defaultValidator().validate("")).toEqual(true);
  });

  it("provides a message value", () => {
    expect(defaultValidator().errorMessage).toEqual("Please fill out this form");
  });
});
