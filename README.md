# Nova Product Design System

[![Build status](https://badge.buildkite.com/3d938ba40f13fe2eb7bf6a32e5c35150d4063940c94d85d9ee.svg?branch=master)](https://buildkite.com/clio/design-system)
[![badge](https://overlord.clio.systems/badge/clio/design_system)](https://overlord.clio.systems/repos/clio/design_system)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

![Nova product system](nova.png)

## Table of contents

- [Introduction](#introduction)
  - [The system's purpose](#the-systems-purpose)
  - [Key outcomes](#key-outcomes)
  - [How this benefits our customers](#how-this-benefits-our-customers)
- [Using Nova](#using-nova)
- 🚀[Building Nova Components](#building-nova-components)
  - 👨‍💻[Development scripts](#development-scripts)
  - 📦[Packages](#packages)
  - ⛴[Publish New Version](#publish-new-version)
  - 🙋[FAQ](#faq)
  - [Troubleshooting](#troubleshooting)

## Introduction

The Nova Product System is a set of [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), implementation guidelines, and UX best practices that define how we build interfaces on the Clio platform.

### The system's purpose

_The Nova Product System optimizes the front-end development experience for repeatable success in building interfaces that all of our customers love and can rely upon._

### Key outcomes

_By optimizing for developer experience, product teams can focus on creating consistent, high quality, end-user experiences. We optimize for the developer experience by providing clear guidelines, flexible components, and hands-on support._

### How this benefits our customers

_Our goal is to serve customers with a cohesive, accessible, efficient, and easily understood experience across all platforms._

## Using Nova

Please see the [Nova docs guide](https://we.dont.have.a.url.yet) for adding Nova to your project.

## Building Nova Components

### Development scripts

Nova is organized as a monorepo using [Lerna](https://github.com/lerna/lerna). Useful scripts include:

#### `npx lerna bootstrap`

> Installs package dependencies and links packages together

#### `npx lerna run build`

> Builds all package distributions

#### `npx lerna run format`

> Formats the code in all packages - using prettier

### Packages

#### Core

The UI components for Nova live in the core package.

[Documentation](packages/core).

#### Core React

This package contains React Bindings for `@clio/nova-core`. Normally, you should not need to develop directly in this package. When `packages/core` is built, this package will automatically be updated with the latest core components.

[Documentation](packages/core-react)

#### Docs

This is the Documentation App for the Clio Design System.

[Documentation](packages/docs)

#### Playground

The Playground packages are a place where we can use the Nova UI Components in various libraries and frameworks and see the results. Initial integration testing happens in the playground and it is usually a good idea to add a new component or component update to the playground when done.

- [AngularJS](playground/angularjs)
- [React](playground/react)
- [Static HTML/JS](playground/static-html)

### Publish New Version

1. Commit all the changes you want to have published and push to your remote branch on GitHub.
2. Open a new pull request on GitHub.
3. Run `npx lerna version` on your dev machine and select a new version number. To help you with picking a version number, check out [the Semantic Versioning FAQ](https://semver.org/#faq)
4. [Create a new release draft in GitHub](https://github.com/clio/design_system/releases/new) using the correct version Tag that was created in Step 3. Add at least the following details to the release notes:
   1. The things being changed (added/updated/removed). **Highlight any breaking changes.**
   2. Add a link to the diff between this version and the previous version. Example: https://github.com/clio/design_system/compare/v0.2.2...v0.3.0
4. Get your pull request reviewed, approved, and then merge it into the `master` branch.
5. :tada: Buildkite should now publish the updated package(s) to https://clio.jfrog.io/clio/webapp/#/artifacts/browse/tree/General/product-npm-dev-local/@clio
6. Navigate to the [releases in GitHub](https://github.com/clio/design_system/releases) and publish the draft one that you created.

### FAQ

Q. How do I add a new dependency?

A. To add new packages, run the following command from the root of the project.

> `npx lerna add <package>[@version] [packages/<package_name>] [--dev] [--exact]`

Full documentation for this command can be found [here](https://github.com/lerna/lerna/tree/master/commands/add).

### Troubleshooting

#### Dependencies

If you are receiving errors involving dependencies or the `node_modules` package while attempting to run scripts:

1. In your terminal run `npx lerna clean` to remove the `node_modules` in all packages.
2. Run `npx lerna bootstrap` in the root directory.

#### Docker

If your error is docker related, there may be a clash with your local `node_modules` folders and the docker container's `node_modules` folders.

1. Run `docker system prune` (Not required, just to free up system space).
2. Run `docker-compose build` after you have completed the steps in the `Dependencies` section right above this one.
