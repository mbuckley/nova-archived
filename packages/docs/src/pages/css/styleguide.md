---
previousText: 'Architecture'
previousUrl: '/css/architecture'
nextText: 'Colors'
nextUrl: '/foundations/colors'
---
# CSS styleguide

## Naming convention
We use the BEM naming convention. BEM makes it easy to read and understand our CSS by creating clear relationships between class names and components. It's clear if something is a block defining a new style, a modifier that changes a block's default styling somehow, or a child element of a block. It also makes it easy to understand what classes are being applied to markup.
<br><br>
BEM stands for BLOCK ELEMENT MODIFIER:

* `block`: The top level element in a component.
* `element`: Any child of a block - use `__` to denote an element.
* `modifier`: Any small modification to a block or element - use `--` to denote a modifier.
<br><br>
Read the BEM docs for a full breakdown: http://getbem.com/

```scss
.combo-button {} // BLOCK
.combo-button__dropdown {} // ELEMENT
.combo-button--small {} // MODIFIER
```

## Naming component files

SCSS files should match the name of the component.

* Use hyphens and lower case letters
* Don't abbreviate the words in the file name

✅ Good:
```
combo-button.scss
```

🚫 Bad:
```
comboButton.scss
combo_btn.scss
combo_button.scss
```


## Naming component classes
`block` class names should match the name of the component and stylesheet.
<br>`element` & `modifier` class names should build off of the `block` class name.

Use the appropriate dash syntax for `elements` and `modifiers`:
* `--` for modifiers
* `__` for elements

Valid names can only include lowercase characters and hyphens.
<br><br>
✅ Good:
```scss
.combo-button {} // BLOCK
.combo-button--small {} // MODIFIER
.combo-button__dropdown {} // ELEMENT
```
🚫 Bad:
```scss
.combo-button {}
.combo-button-small {}
.combo-button .dropdown {}
```

## Naming component variables
Component variables should follow the BEM convention used for it's class names.

```scss
--combo-button-padding-x: var(spacing-m);
--combo-button-padding-x--small: var(spacing-xs);
```

## Ordering
TIP: To easily sort lines in a selection in VSCode, go to preferences > keyboard shortcuts, and type `sort lines` into the search bar. Bind a shortcut to `sort lines ascending`.

<br>

### Properties
Properties inside of rules should be placed in alphabetical order.

```scss
.class-name {
  display: block;
  font-size: 10px;
  margin-bottom: 20px;
  z-index: 10;
}
```

### Includes
Put includes at the top of a ruleset.

```scss
.class-name {
  @include font-size(body);
  display: block;
  font-size: 10px;
}
```

## Spacing

### Between properties
There shouldn't be any whitespace between properties inside of a rule. This creates visual line breaks that make it hard to scan groups of code, especially when there are single "orphan" properties.

<br>
✅ Good:

```scss
.popover {
  background: red;
  box-shadow: 0 0 0 3px red;
  color: blue;
  font-size: 14px;
  font-weight: bold;
}
```

🚫 Bad:

```scss
.popover {
  background: red;
  color: blue;

  box-shadow: 0 0 0 3px red;

  font-size: 14px;
  font-weight: bold;
}
```

### Between rules
There should be one line of whitespace between rules.

<br>
✅ Good:

```scss
.popover {}

.popover-content {}

.popover-menu-items {}

.popover-menu-items__item {}
```

🚫 Bad:
```scss
.popover {}


.popover-content {}
.popover-menu-items {}


.popover-menu-items__item {}
```

## Structure, nesting, and specificity
SCSS files should retain a flat structure. Nesting should be one level deep and reserved for pseudo class styling only.
For non-pseudo class modifiers, a proper BEM modifier class should be used.

This helps reduce overly specific rules, and makes it easy to find rules in files you aren't familiar with. You can always `cmd + f` a class chain and reliably go to that exact location in a file instead of digging through 3 or 4 levels of nesting.

<br>
✅ Good:

```scss
.menu-item {
  &:hover {}
}
.menu-item--selected {
  &:hover {}
}
```

🚫 Bad:

```scss
.menu-item {
  &:hover {}
  .selected {
    &:hover {}
  }
}
```

When you do need more than one level of specificity, don't use nesting. Instead, write a traditional CSS declaration showing the selector specificity on one line. This makes it easy for others to read your code and understand the inheritance.

<br>
✅ Good:

```scss
.menu-items .menu-items__anchor {}
```

🚫 Bad:

```scss
.menu-items {
  .menu-items__anchor {}
}
```

Avoid element styling unless paired with a class for specificity.
Don't nest elements. Elements are generic, hard to find, and multiple elements of the same type buried deep in a nest make it hard to understand which one is the correct selector. It is hard to `cmd+f` an element.

<br>
✅ Good:

```scss
.menu-items .menu-items__anchor span {}
```

🚫 Bad:

```scss
.menu-items {
  .menu-items__anchor {
    span {}
  }
}
```

To summarize
* Don't be more specific than you need to be -  Don't use 2 levels of specificity if you only need 1.
* Only nest pseudo classes like :hover, :focus, etc.
* When you require specificity, write it out on one line. Don't use nesting.
* Only use element styling when paired with a class for specificity. Never nest an element.
