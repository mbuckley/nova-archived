# Getting Started

1. `npx lerna bootstrap` - Installs or links dependencies for all packages.
2. `npx lerna run build` - Runs the `build` script for every package so that all local packages have the latest `dist` build outputs that can be consumed by other local packages.
3. `npm start` - Start the React app.

## Testing Older Browsers

1. `npx react-scripts build`
2. `serve -s build`

Note: Ensure you have the serve package installed globally (`npm install -g serve`)


## Troubleshooting

If you've run into an issue after running the commands above, try running `npx lerna clean` and then repeat the steps above.
