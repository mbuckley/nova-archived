---
name: Specification
about: Write a new component specification
title: 
labels: ':hammer: Specification'
assignees: ''

---

# Overview
_Add a Figma link._
_Add a short one-liner about what the component does, what value it brings._

# Dependencies
## Hard dependencies
_Components that are required before we can implement this component._

## Soft dependencies
_Components that can be added later to simplify our current implementation._

# Specification
## Methods
_Try to rely on publicly exposed methods as little as possible, and instead default to using properties and events as often as you can. As an app scales, it will be easier to manage and pass data through @prop rather than public methods._

## Properties
_Included is a markdown table format below, tweak to communicate as clear as possible._

### propertyName

|  |  |
|---|---|
| Description  |  |
| Attribute   |  |
| Type  | "value" \| "value" \| "value" |
| Default  | "value"  |
| Mutable | ❌ or  ✅ |

## Events
| Name | Description  |
|---|---|
| eventName  | Description.  |
| eventName   | Description.  |

## Best practices
_Add any general best practices in a list here._

### Use when
_Bullet points to describe contexts when you would use this component. Add images as required._

### Do not use when
_Bullet points to describe contexts when you would NOT use this component. Add images as required._

## Accessibility considerations
_Bullet point list of major considerations._

### Keyboard behaviour
_Outside of standard keyboard considerations, anything we wouldn't think of?_

## Visual styling
_Add a Figma link and screenshot if necessary._

## Behaviour
_How does this component behave when interacted with? Does it have any unexpected state changes?_

## Examples
_In this section, list out the various states or configurations of a component that will be used to best illustrate use cases to those reading the documentation. Provide screenshots or Figma links if necessary._

# Spec Sign-off

- [ ] Design/UX <add_@_name_here>
- [ ] Development <add_@_name_here>
