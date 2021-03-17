# Validator Service

The validation service can be used to allow developers to add custom validation easily or
to take advantage of existing common validation types. Any supported form control can accept
a `validationRules` property. This can be used to set one or many validation rules on the control that are a combination of custom and internally defined rules.

After a form has been submitted, and the form control is considered invalid based on the
validator, the error UI would be triggered. This includes a customizable message as well as
displaying an invalid UI state for the control itself.

## Built-in Validators

The design system comes with commonly needed validators baked in and using them is as simple as passing the `name` property with the name of the validator.

The standard validators are:

- [Required](./validators/required/readme.md)
- [Length](./validators/length/readme.md)

> To add a new built-in validator, copy/rename the [length](./validators/length) validator folder and updated as required. Make sure to import and include your new validator in the [validators index file](./validators/index.ts)

## Custom Validators

A custom validator can be added by passing a validation rule directly to the form control.

- A validator rule may define a `validate` function which returns a boolean. It also defines an `errorMessage` to display if `validate()` returns `false`.
- The form control's value will be provided to the validator everytime validation occurs
  (currently on blur and on form submit). If the form control is considered invalid, the error message will be displayed in `<clio-form-error>` below the control.

### Examples

#### Check that the input contains an acceptable colour value

```html
<clio-form novalidate="true">
  <clio-input name="colour-input" label="Colour validator"></clio-input>
</clio-form>
```

```typescript
const customColourValidator = () => {
  const acceptableColours = ["red", "yellow", "blue", "green", "purple", "white", "black"];
  return {
    validate: (value = "") => acceptableColours.includes(value),
    errorMessage: `Please select a valid color. ex. ${acceptableColours.join(", ")}`,
  };
};
const colourInput = document.querySelector("clio-input[name='colour-input']");
colourInput.validationRules = [{ validator: customColourValidator }];
```

#### Using the options parameter

Validators also accept an `options` parameter which is used to pass extra context to the `validate` function. You can leverage this when creating your own custom validator as well.

```html
<clio-form novalidate="true">
  <clio-input name="min-max-input" label="Min >= 5 & max =< 15 length check on input"></clio-input>
</clio-form>
```

```typescript
const minMaxInput = document.querySelector("clio-input[name='min-max-input']");
// This will allow the validate() function for "length" to access options.min and options.max
minMaxInput.validationRules = [{ name: "length", options: { min: 5, max: 15 } }];
```

#### Using multiple validators on an input

Multiple validators can be set on a single `<clio-input>`. If any of them return `false`, the field is considered invalid, and the error message for the validation rule that didn't pass will display.

```html
<clio-form novalidate="true">
  <clio-input type="number" name="less-than-ten" label="Required and less than ten"></clio-input>
</clio-form>
```

```typescript
const numberInput = document.querySelector("clio-input[name='less-than-ten']");
const lessThanTenValidator = () => {
  return {
    validate: value => !isNaN(value) && value < 10,
    errorMessage: "That number is too large. Enter an number less than 10.",
  };
};
// This will allow the validate() function for "length" to access options.min and options.max
numberInput.validationRules = [{ name: "required" }, { validator: lessThanTenValidator }];
```
