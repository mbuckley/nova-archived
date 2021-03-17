import { getValidator } from "./validator.factory";

describe("#getValidator", () => {
  describe("when a validator is provided", () => {
    it("the validator is returned", () => {
      const validationRules = [
        {
          validator: () => {
            return {
              validate: () => true,
              errorMessage: "failed validation!",
            };
          },
        },
      ];

      const validator = getValidator(validationRules);
      expect(validator.errorMessage).toEqual("failed validation!");
      expect(validator.validate(null)).toEqual(true);
    });
  });

  describe("when a name is provided", () => {
    describe("and the name matches a validator", () => {
      it("returns the matched validator", () => {
        const validationRules = [{ name: "length", options: { min: 3, max: 6 } }];
        const validator = getValidator(validationRules);
        expect(validator.validate("Han")).toEqual(true);
        expect(validator.validate("Chewbacca")).toEqual(false);
        expect(validator.errorMessage).toEqual("You must enter between 3 and 6 characters");
      });
    });

    describe("and the name doesn't match a validator", () => {
      it("returns the default validator", () => {
        const validationRules = [{ name: "unknown" }];
        const validator = getValidator(validationRules);
        expect(validator.validate(null)).toEqual(true);
        expect(validator.errorMessage).toEqual("Please fill out this form");
      });
    });
  });

  describe("when multiple validators are provided", () => {
    it("validates the field value using all the validation in the list", () => {
      const colourValidator = () => {
        const acceptableColours = ["red", "yellow", "blue", "green", "purple", "white", "black"];
        return {
          validate: (value = "") => acceptableColours.includes(value),
          errorMessage: `Please select a valid colour. ex. ${acceptableColours.join(", ")}`,
        };
      };
      const combinedValidator = getValidator([
        { name: "required" },
        { name: "length", options: { min: 4, max: 6 } },
        { validator: colourValidator },
      ]);

      // invalid => required validator
      expect(combinedValidator.validate("")).toEqual(false);
      expect(combinedValidator.errorMessage).toEqual("This field is required.");

      // invalid => length validator
      expect(combinedValidator.validate("red")).toEqual(false);
      expect(combinedValidator.errorMessage).toEqual("You must enter between 4 and 6 characters");

      // invalid => length validator
      expect(combinedValidator.validate("tangerine")).toEqual(false);
      expect(combinedValidator.errorMessage).toEqual("You must enter between 4 and 6 characters");

      // invalid => colour validator (not an acceptable colour)
      expect(combinedValidator.validate("orange")).toEqual(false);
      expect(combinedValidator.errorMessage).toEqual(
        "Please select a valid colour. ex. red, yellow, blue, green, purple, white, black",
      );

      // valid => passes all validators
      expect(combinedValidator.validate("blue")).toEqual(true);
      expect(combinedValidator.errorMessage).toEqual("");
    });
  });
});
