module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  printWidth: 110,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  jsxSingleQuote: true,
  overrides: [
    {
      files: '*.yaml',
      options: {
        tabWidth: 2,
        useTabs: false
      }
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        tabWidth: 2,
        proseWrap: 'always',
        printWidth: 80
      }
    }
  ],
  tailwindFunctions: ['clsx'],
  plugins: [require('prettier-plugin-tailwindcss')]
};
