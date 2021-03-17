import { defaultValidator } from "./validators/default";
import { validators } from "./validators";

type Validator = {
  validate: (value: string) => boolean;
  errorMessage: string;
};

type ValidationRule = {
  name?: string;
  options?: any;
  validator?: (options: any) => Validator;
};

const combineValidators = (first: Validator, second: Validator): Validator => {
  return {
    validate: function(value: string) {
      const firstResult = first.validate(value);
      const secondResult = second.validate(value);

      if (!firstResult) {
        this.errorMessage = first.errorMessage;
      } else if (!secondResult) {
        this.errorMessage = second.errorMessage;
      } else if (firstResult && secondResult) {
        this.errorMessage = "";
      }
      return firstResult && secondResult;
    },
    errorMessage: "",
  };
};

const validatorFactory = ({ name = "default", options, validator }: ValidationRule): Validator => {
  if (validator) {
    return validator(options);
  }

  const validationRuleName = !!validators[name] ? name : "default";

  return validators[validationRuleName].validator(options);
};

const getValidator = (validationRules: ValidationRule[]): Validator => {
  if (validationRules.length === 1) {
    return validatorFactory(validationRules[0]);
  }

  return validationRules.map(rule => validatorFactory(rule)).reduce(combineValidators, defaultValidator());
};

export { getValidator, Validator, ValidationRule };
