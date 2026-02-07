/** @type {(import('prettier').Config)} */
const config = {
  semi: false,
  singleQuote: false,
  printWidth: 100,
  trailingComma: "all",
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: ["^@core/(.*)$", "", "^@server/(.*)$", "", "^@ui/(.*)$", "", "^[./]"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
}

export default config
