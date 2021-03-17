import { defaultValidator } from "./default";
import { lengthValidator } from "./length";
import { requiredValidator } from "./required";

// When creating a new validator, import and include it here so the factory method has access to it.
const validators = {
  default: { validator: defaultValidator },
  length: { validator: lengthValidator },
  required: { validator: requiredValidator },
};

export { validators };
