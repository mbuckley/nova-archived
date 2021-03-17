import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "core",
  testing: {
    browserArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
    setupFiles: ["<rootDir>/setUp.js"],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
    },
    modulePathIgnorePatterns: ["<rootDir>/.*/__mocks__"],
  },
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "@clio/nova-core",
      proxiesFile: "../core-react/src/components.ts",
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "docs-readme",
      footer: "*Built with love!*",
      strict: true,
    },
  ],
  plugins: [
    sass({
      includePaths: ["src/css", "src"],
      injectGlobalPaths: [
        "src/css/base.scss",
      ]
    }),
  ],
  globalStyle: "src/css/core.scss",
  devServer: {
    initialLoadUrl: "/src/components",
  },
};
