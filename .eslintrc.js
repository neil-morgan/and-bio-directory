const {
  createConfig,
  getDependencies
} = require("eslint-config-galex/src/createConfig");
const {
  createReactOverride
} = require("eslint-config-galex/src/overrides/react");

const dependencies = getDependencies();

const reactOverride = createReactOverride({
  ...dependencies,
  rules: {
    "react/function-component-definition": "off"
  }
});

module.exports = createConfig({
  extends: "galex",
  overrides: [reactOverride],
  root: true

  // incrementalAdoption: true,
});
