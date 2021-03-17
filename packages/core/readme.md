# Nova Core UI Components

This package contains the Web Components that make up the reusable UI building blocks of the Nova Design System. These components are designed to be used in frontend view libraries/frameworks (such as React, Angular), or on their own through traditional JavaScript in the browser.

## Table of contents

- 🚀[Getting Started](#getting-started)
  - 👨‍💻[Development scripts](#development-scripts)
- 🧩[Naming Components](#naming-components)

## Getting Started

### Development scripts

ℹ️ These scripts are to be run from the root of the core package (`~/packages/core`)

#### `npm install`

> Installs package dependencies

#### `npm start`

> Starts a local development server with live reload

#### `npm run start:qa`

> Starts the development server with polyfills enabled. Useful for testing older browsers such as Internet Explorer 11

#### `npm run format`

> Formats the code - using prettier

#### `npm run lint:css:components`

> Lints all component css - using stylelint

#### `npm run lint:ts:components`

> Lints all typescript files - using ESlint

#### `npm run test`

> Run all tests once

#### `npm run test:watch`

> Run all tests in watch mode - useful for local development

#### `npm run build`

> Builds a production distribution and updates `packages/core-react` bindings

_Make sure you are on node version 10.\* before building a production bundle._

## Naming Components

When creating new component tags use the prefix `clio`.
