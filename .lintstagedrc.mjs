/** @type {(import('lint-staged').Configuration)}*/
export default {
  "**/*.{js,jsx,json,css,html}": "prettier . --write",
};
