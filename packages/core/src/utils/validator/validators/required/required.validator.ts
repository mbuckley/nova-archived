import { Validator } from "../../validator.factory";

const requiredValidator = (): Validator => {
  return {
    validate: (value = "") => !!value,
    errorMessage: "This field is required.",
  };
};

export { requiredValidator };
