---
nextText: 'Styleguide'
nextUrl: '/css/styleguide'
---
# Architecture


## File structure

In `packages/core`:

```
src
  components
    button
      button.scss
    popover
      popover.scss
  css
    variables
      colors.scss
      spacing.scss
      typography.scss

    base.scss
    core.scss
    reset.scss
```

## reset.scss
`reset.scss` is where we store our CSS reset. We are simply using https://meyerweb.com/eric/tools/css/reset/.
<br>We chose a full reset instead of a `normalize.css` approach so we don't have unexpected styling cascading into our styles and components. We define our own base element styles in `base.css`.

## core.scss
`core.scss` is where we put all of our foundational styles. This file imports `reset.scss` and all of our `variables`. It also sets some global styling on the `*` and `body` elements.

`core.scss` is passed to stencil's globalStyle config parameter, and so anything added to core is also automatically added to all of our web components. Don't put anything in `core.scss` that shouldn't be available in every web component.

## base.scss
`base.scss` is where we define all default html element styling. It should be imported after `core.scss`.

## Variables
Our design system uses CSS custom properties. Global properties are scoped to the `:root` element. Component specific properties are scoped to the `:host` element.

All of our global variables are stored in `src/css/variables`.
```scss
// Global (src/css/variables/spacing.scss)
:root {
  --spacing-xs: 4px;
  --spacing-s: 8px;
  --spacing-m: 12px;
  --spacing-l: 20px;
  --spacing-xl: 32px;
}
```

All of our component variables are stored in `src/components/component-name/component-name.scss`.
```scss
// Component (src/components/button/button.scss)
:host {
  --clio-button-border-radius: 3px;
  --clio-button-border-width: 1px;
  --clio-button-font-family: var(--font-family);
  --clio-button-font-size: 13px;
  --clio-button-padding-x: var(--spacing-m);
  --clio-button-padding-y: var(--spacing-s);
}
```

Read about CSS custom properties here: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

## Components
Component specific CSS is stored in the `components` directory.
