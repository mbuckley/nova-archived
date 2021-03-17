import { lengthValidator } from "./length.validator";

describe("#lengthValidator", () => {
  describe("when both min and max props are provided", () => {
    it("the min & max messsage is returned", () => {
      expect(lengthValidator({ min: 1, max: 3 }).errorMessage).toEqual("You must enter between 1 and 3 characters");
    });

    it("validates with both properties", () => {
      expect(lengthValidator({ min: 3, max: 5 }).validate("Johnny")).toEqual(false);
      expect(lengthValidator({ min: 3, max: 5 }).validate("Bo")).toEqual(false);
      expect(lengthValidator({ min: 3, max: 5 }).validate("Peg")).toEqual(true);
      expect(lengthValidator({ min: 3, max: 5 }).validate("Tyler")).toEqual(true);
    });
  });

  describe("when only a max is provided", () => {
    it("validates with max", () => {
      expect(lengthValidator({ max: 5 }).validate("Johnny")).toEqual(false);
      expect(lengthValidator({ max: 5 }).validate("John")).toEqual(true);
    });

    it("the min & max messsage is returned", () => {
      expect(lengthValidator({ max: 1 }).errorMessage).toEqual("You must enter less than 1 characters");
    });
  });

  describe("when only a min is provided", () => {
    it("validates with min", () => {
      expect(lengthValidator({ min: 5 }).validate("Johnny")).toEqual(true);
      expect(lengthValidator({ min: 5 }).validate("John")).toEqual(false);
    });

    it("the min & max messsage is returned", () => {
      expect(lengthValidator({ min: 1 }).errorMessage).toEqual("You must enter at least 1 characters");
    });
  });

  describe("when no props are provided", () => {
    it("returns true", () => {
      expect(lengthValidator({}).validate(undefined)).toEqual(true);
    });

    it("a blank message is returned", () => {
      expect(lengthValidator({}).errorMessage).toEqual("");
    });
  });
});
