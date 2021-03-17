# Required Validator

Validates that a string length falls within a range or meets a single min/max value

Rule name: `length`

## Examples

### Check if value is within range

```html
<clio-form novalidate="true">
  <clio-input name="range-input" label="Length validator - check range between 5 and 15 (inclusive)"></clio-input>
</clio-form>
```

```typescript
const rangeInput = document.querySelector("clio-input[name='range-input']");
rangeInput.validationRule = { name: "length", options: { min: 5, max: 15 };
```

### Check if value is at least 5 characters in length

```html
<clio-form novalidate="true">
  <clio-input
    name="min-length-input"
    label="Length validator - check value is at least 5 characters in length"
  ></clio-input>
</clio-form>
```

```typescript
const minLengthInput = document.querySelector("clio-input[name='min-length-input']");
minLengthInput.validationRule = { name: "length", options: { min: 5 };
```

### Check that value is no longer than 15 characters in length

```html
<clio-form novalidate="true">
  <clio-input
    name="max-length-input"
    label="Length validator - check value is at most 15 characters in length"
  ></clio-input>
</clio-form>
```

```typescript
const maxLengthInput = document.querySelector("clio-input[name='max-length-input']");
maxLengthInput.validationRule = { name: "length", options: { max: 15 };
```

[View Source](./length.validator.ts)
