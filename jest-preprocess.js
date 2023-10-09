const babelOptions = {
  presets: [
    ["@babel/preset-env", { loose: true }],
    "babel-preset-gatsby",
    "@babel/preset-typescript",
  ],
};
// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require("babel-jest").default.createTransformer(babelOptions);
