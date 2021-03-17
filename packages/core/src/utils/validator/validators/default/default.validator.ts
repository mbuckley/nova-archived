import { Validator } from "../../validator.factory";

const defaultValidator = (): Validator => {
  return {
    validate: (_value: string) => true,
    errorMessage: "Please fill out this form",
  };
};

export { defaultValidator };
