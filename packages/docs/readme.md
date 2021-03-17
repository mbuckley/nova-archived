# Nova Documentation Application

This package contains the Documentation app for Nova.

## Table of contents

- 🚀[Getting Started](#getting-started)
  - 👨‍💻[Development scripts](#development-scripts)

## Getting Started

### Development scripts

ℹ️ These scripts are to be run from the root of the docs package (`~/packages/docs`)

#### `npx lerna bootstrap`

> Installs package dependencies

#### `npm start`

> Starts a local development server

___Before running start, you must build both the core and docs packages first. Ex: `cd packages/core && npm run build` `cd packages/docs && npm run build`___

#### `npm run format`

> Formats the code - using prettier

#### `npm run test`

> Run all tests once

#### `npm run test:watch`

> Run all tests in watch mode - useful for local development

#### `npm run build`

> Builds a production distribution

___Before running build, you must build both the core and docs packages first. Ex: `cd packages/core && npm run build` `cd packages/docs && npm run build`___
