# Clio CSS Foundation

## Linting
To lint a specific file:

```bash
npm run lint path/to/file.scss
```

To lint the component files:

```bash
npm run lint-components
```

To lint the test files to see how Stylelint works:

```bash
npm run lint-test
```

## Generating CSS
To output all the Sass files as CSS files:

```bash
npm run build
```

## Guidelines

### Class names
Class names must follow a BEM convention. Read the BEM docs here: http://getbem.com/

BEM stands for BLOCK ELEMENT MODIFIER

```scss
.form-field {} // BLOCK
.form-field__input {} // ELEMENT
.form-field__label {} // ELEMENT
.form-field__input--small {} // MODIFIER
```

The name of your BLOCK class must match your component's name. Your component's name is based on your component's SCSS file name.
If your component's SCSS file is called `combo-button.scss`, your BLOCK class will be `.combo-button`.
The linter will complain if you don't follow this naming convention.

Valid names can only include lowercase characters and hyphens.

```scss
/* Valid */
combo-button.scss
dropdown.scss

/* Invalid */
comboButton.scss
Dropdown.scss
```

The name of your ELEMENTS and MODIFIERS must use your BLOCK name as a prefix:

```scss
/* Valid */
.combo-button {} // BLOCK
.combo-button--small {} // MODIFIER
.combo-button__dropdown {} // ELEMENT

/* Not valid */
.combo-button {}
.combo-button-small {}
.combo-button .dropdown {}
```

### Spacing
#### Between properties
There shouldn't be any whitespace between properties inside of a rule. This creates visual line breaks that make it hard to scan groups of code, especially when there are single "orphan" properties.

```scss
/* Good */
.popover {
  background: red;
  color: blue;
  box-shadow: 0 0 0 3px red;
  font-size: 14px;
  font-weight: bold
}

/* Bad */
.popover {
  background: red;
  color: blue;

  box-shadow: 0 0 0 3px red;

  font-size: 14px;
  font-weight: bold;
}
```

#### Between rules
There shouldn't be any whitespace between rules, unless those rules are part of a group (see the next section). Spacing is reserved for creating visual groups of elements.

```scss
/* Good */
.popover {}
.popover-content {}
.popover-menu-items {}
.popover-menu-items__item {}

/* Bad */
.popover {}

.popover-content {}

.popover-menu-items {}

.popover-menu-items__item {}
```

#### Between rule groups
To create groups of rules, use a comment to name the group. You should put a line of white space between groups after the last rule in the previous group and before the comment.

```scss
/* Popover base */
.popover {}
.popover-content {}

/* Popover menu items */
.popover-menu-items {}
.popover-menu-items__item {}

/* Popover footer */
.popover-footer {}
```

### Structure, nesting, and specificity
SCSS files should retain a flat structure. Nesting should be one level deep and reserved for pseudo class styling only.
For non-pseudo class modifiers, a proper BEM modifier class should be used.

This helps reduce overly specific rules, and makes it easy to find rules in files you aren't familiar with. You can always `cmd + f` a class and reliably go to that exact location in a file instead of digging through 3 or 4 levels of nesting.


```scss
/* Good */
.menu-item {
  &:hover {}
}
.menu-item--selected {
  &:hover {}
}

/*
Outputted CSS for hover states - 2 levels of specificity in both cases
.menu-item:hover {}
.menu-item--selected:hover {}
*/

/* Bad */
.menu-item {
  &:hover {
  }
  li {
    a {
      .selected {
        &:hover {}
      }
    }
  }
}
/*
Outputted CSS for hover states - 4 levels of specificity
.menu-item:hover {}
.menu-item li a.selected:hover {}
*/
```

When you do need more than one level of specificity, don't use nesting. Instead, write a traditional CSS declaration showing the selector specificity on one line. This makes it easy for others to read your code and understand the inheritance.

```scss
/* Good */
.menu-items .menu-items__anchor {}

/* Bad */
.menu-items {
  .menu-items__anchor {}
}
```

Avoid element styling unless paired with a class for specificity.
Don't nest elements. Elements are generic, hard to find, and multiple elements of the same type buried deep in a nest make it hard to understand which one is the correct selector. It is hard to `cmd+f` an element.

```scss
/* Good */
.menu-items .menu-items__anchor span {}

/* Bad */
.menu-items {
  .menu-items__anchor {
    span {}
  }
}
```

To summarize:
* Don't be more specific than you need to be -  Don't use 2 levels of specificity if you only need 1.
* Only nest pseudo classes like :hover, :focus, etc.
* When you require specificity, write it out on one line. Don't use nesting.
* Only use element styling when paired with a class for specificity. Never nest an element.



### Property order
TBD

### Variables
TBD

### Element styling
TBD


## Linter Rules
These are the linter rules we follow. See all the errors here https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md#possible-errors

```
"block-no-empty": true,
"color-named": "never",
"color-no-invalid-hex": true,
"comment-whitespace-inside": "always",
"comment-no-empty": true,
"declaration-block-no-duplicate-properties": true,
"declaration-block-no-shorthand-property-overrides": true,
"declaration-no-important": true,
"indentation": 2,
"length-zero-no-unit": true,
"max-nesting-depth": 1,
"no-eol-whitespace": true,
"no-descending-specificity": true,
"no-duplicate-at-import-rules": true,
"no-duplicate-selectors": true,
"no-extra-semicolons": true,
"property-no-unknown": true,
"rule-empty-line-before": "never",
"selector-max-empty-lines": 0,
"selector-max-id": 0,
"selector-max-specificity": "0,3,3",
"selector-nested-pattern": "^&:(?:.+?)$",
"selector-pseudo-class-no-unknown": true,
"selector-pseudo-element-no-unknown":true,
"string-no-newline": true,
"unit-no-unknown": true,
"scss/dollar-variable-colon-space-after": "always",
"scss/double-slash-comment-whitespace-inside": "always"
```

#### No empty blocks
You should never have an empty block in your SCSS.

```scss
/* Good */
a {
  color: red;
}

/* Bad */
a {}
```

#### Whitespace in comments
Comments should always have whitespace between the comment and the comment markers.

```scss
/* Good comment */

/*Bad comment*/
```

#### No !important
Never use important.

```scss
/* Good */
a {
  color: red;
}

/* Bad */
a {
  color: red!important;
}
```

#### Indentation of 2 spaces
Rules should always be indented by 2 spaces.

```scss
/* Good */
a {
  color: red;
}

/* Bad */
a {
color: red;
}
```

#### No units on length measurements of 0
Don't include units when the value is 0.

```scss
/* Good */
a {
  margin: 0;
}

/* Bad */
a {
  margin: 0px;
}
```

#### Max nesting depth of 1 level
Never nest more than 1 level deep, and nest pseudo classes only.

```scss
/* Good */
a {
  color: red;
  &:hover {
    color: blue;
  };
}
a.selected {
  color: blue;
}

/* Bad */
a {
  color: red;
  &:hover {
    &:focus {
      color: red;
    }
    .selected {
      color: blue;
    }
    color: blue;
  };
}
```

#### No whitespace at the end of a line
Never nest more than 1 level deep, and nest pseudo classes only.

```scss
/* Good */
a {
  color: red;
}

/* Bad */
a {
  color: red;••//Dots are whitespace
}
```

#### Rule empty line before
Don't include empty lines between rules

```scss
/* Good */
a {
  color: red;
}
.class {
  color: blue;
}

/* Bad */
a {
  color: red;
}

.class {
 color: blue;
}
```

#### No empty lines in selectors
Don't include empty lines in selectors

```scss
/* Good */
.a,
.b {
  color: red;
}

/* Bad */
.a,

b{
  color: red;
}
```
