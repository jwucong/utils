var rollup = require("rollup");
var babel = require("rollup-plugin-babel");

const inputOptions = {
  input: "src/utils.js",
  plugins: [ babel() ]
}
const outputOptions = {
  file: "dist/utils.js",
  format: "iife",
  name: 'jwucong'
}
const f = async () => {
  const bundle = await rollup.rollup(inputOptions)
  bundle.write(outputOptions);
}

f()
