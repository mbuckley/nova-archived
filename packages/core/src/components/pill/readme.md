# clio-pill



<!-- Auto Generated Below -->


## Usage

### Javascript

```html
<clio-pill>Default</clio-pill>
<clio-pill color="green">Green</clio-pill>
<clio-pill color="teal">Teal</clio-pill>
<clio-pill color="grey">Grey</clio-pill>
<clio-pill color="yellow">Yellow</clio-pill>
<clio-pill color="orange">Orange</clio-pill>
<clio-pill color="red">Red</clio-pill>
```


### React

```tsx
import React from 'react';

import { ClioPill } from '@clio/nova-core-react';

export const ButtonExample: React.FC = () => (
  <ClioPill>Default</ClioPill>
  <ClioPill color="green">Green</ClioPill>
  <ClioPill color="teal">Teal</ClioPill>
  <ClioPill color="grey">Grey</ClioPill>
  <ClioPill color="yellow">Yellow</ClioPill>
  <ClioPill color="orange">Orange</ClioPill>
  <ClioPill color="red">Red</ClioPill>
);

```



## Properties

| Property | Attribute | Description                                                         | Type                                                           | Default  |
| -------- | --------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | -------- |
| `color`  | `color`   | Sets the background color and corresponding text color of the pill. | `"green" or "grey" or "orange" or "red" or "teal" or "yellow"` | `"grey"` |


## CSS Custom Properties

| Name                        | Description                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `--pill--green-background`  | The green pill's background color. Defaults to --green-300.                                    |
| `--pill--green-text`        | The green pill's text color. Defaults to --green-700.                                          |
| `--pill--orange-background` | The orange pill's background color. Defaults to --orange-300.                                  |
| `--pill--orange-text`       | The orange pill's text color. Defaults to --orange-700.                                        |
| `--pill--red-background`    | The red pill's background color. Defaults to --red-300.                                        |
| `--pill--red-text`          | The red pill's text color. Defaults to --red-700.                                              |
| `--pill--teal-background`   | The teal pill's background color. Defaults to --teal-300.                                      |
| `--pill--teal-text`         | The teal pill's text color. Defaults to --teal-700.                                            |
| `--pill--yellow-background` | The yellow pill's background color. Defaults to --yellow-300.                                  |
| `--pill--yellow-text`       | The yellow pill's text color. Defaults to --yellow-700.                                        |
| `--pill-background`         | The default pill background color when no color prop is passed. Defaults to global --grey-300. |
| `--pill-height`             | The pill's height. Defaults to 18px.                                                           |
| `--pill-padding-x`          | The pill's horizontal padding. Defaults to global --spacing-s.                                 |
| `--pill-text`               | The pill's default text color when no color prop is passed. Defaults to global --grey-700.     |


----------------------------------------------

*Built with love!*
