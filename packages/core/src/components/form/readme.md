# clio-form



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                        | Type                                                                           | Default     |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------- |
| `action`          | `action`           | The URI of a program that processes the form information.                                                                          | `string`                                                                       | `undefined` |
| `allowRedirect`   | `allow-redirect`   | If true, form won't be submitted through an AJAX request and will redirect to the action URL after the form has been submitted.    | `boolean`                                                                      | `undefined` |
| `ariaDescribedby` | `aria-describedby` | The id of the element which describes the form.                                                                                    | `string`                                                                       | `undefined` |
| `ariaLabel`       | `aria-label`       | Labels the form for screen readers.                                                                                                | `string`                                                                       | `undefined` |
| `ariaLabelledby`  | `aria-labelledby`  | The id of the element that labels the form.                                                                                        | `string`                                                                       | `undefined` |
| `autocomplete`    | `autocomplete`     | Indicates whether input elements can by default have their values automatically completed by the browser.                          | `"off" or "on"`                                                                | `undefined` |
| `enctype`         | `enctype`          | When the value of the method attribute is post, enctype is the MIME type of content that is used to submit the form to the server. | `"application/x-www-form-urlencoded" or "multipart/form-data" or "text/plain"` | `undefined` |
| `method`          | `method`           | The HTTP method that the browser uses to submit the form.                                                                          | `"dialog" or "get" or "post"`                                                  | `"post"`    |
| `name`            | `name`             | The name of the form.                                                                                                              | `string`                                                                       | `undefined` |
| `novalidate`      | `novalidate`       | This indicates that the form is not to be validated when submitted.                                                                | `boolean`                                                                      | `undefined` |
| `target`          | `target`           | A name or keyword indicating where to display the response that is received after submitting the form.                             | `string`                                                                       | `undefined` |


## Events

| Event        | Description                               | Type               |
| ------------ | ----------------------------------------- | ------------------ |
| `clioSubmit` | Emitted when the form has been submitted. | `CustomEvent<any>` |


## Methods

### `isDirty() => Promise<boolean>`

Returns true if the form contains dirty inputs.

#### Returns

Type: `Promise<boolean>`



### `isValid() => Promise<boolean>`

Returns true if the form is valid.

#### Returns

Type: `Promise<boolean>`



### `submit() => Promise<void>`

Submit the form.

#### Returns

Type: `Promise<void>`



### `validate() => Promise<void>`

Forces the form to validate. It calls triggerValidationChecks() which calls the .validate() method on each input

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with love!*
