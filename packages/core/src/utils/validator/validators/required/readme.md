# Required Validator

Validates that the value not null or undefined.

Rule name: `required`

## Example

```html
<clio-form novalidate="true">
  <clio-input name="required-input" label="Default validator - just required"></clio-input>
</clio-form>
```

```typescript
const requiredInput = document.querySelector("clio-input[name='required-input']");
// use the required validator
requiredInput.validationRule = { name: "required" };
```

[View Source](./required.validator.ts)
