const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const fs = require('fs');
const util = require('util');

const sass = require('sass');
const nodeSassImport = require('node-sass-import');

const renderSass = util.promisify(sass.render);
const writeFile = util.promisify(fs.writeFile);

const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

/**
 * Delimiter to replace with the css code in the template
 */
const delim = /<%\s*content\s*%>/;

/**
 * Template to embed the css code
 */
const template =
`import {css} from 'lit-element';
export const style = css\`<% content %>\`;`;

async function sassToCss(sassFile) {
  const result = await renderSass({
    file: sassFile,
    importer: (url, ...otherArgs) => {
      if (url.split('/').length === 2) { url += '/_index.scss'; }
      return nodeSassImport(url, ...otherArgs);
    },
    outputStyle: 'compressed'
  });
  // Prefix with common browser prefixes
  const prefixed = await postcss([autoprefixer]).process(result.css, { from: undefined });
  // Strip any Byte Order Marking from output CSS
  let cssStr = prefixed.css.toString();
  if (cssStr.charCodeAt(0) === 0xFEFF) { cssStr = cssStr.substr(1); }
  return cssStr;
}

async function sassRender(sourceFile, outputFile) {
  const match = delim.exec(template);
  if (!match) { throw new Error(`Template does not contain any delimiters`); }
  const replacement = await sassToCss(sourceFile);
  const newContent = template.replace(delim, replacement);
  return writeFile(outputFile, newContent, 'utf-8');
}

const options = [
  {
    name: 'source',
    alias: 's',
    type: String,
    description: 'Template file to render sass into.',
    defaultOption: true,
  },
  {
    name: 'output',
    alias: 'o',
    type: String,
    description: 'Output file path',
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Print this message.',
  }
];

const { source, output, help } = commandLineArgs(options);

function printUsage() {
  console.log(commandLineUsage([
    {
      header: 'sass-render',
      content: 'Render sass into an element\'s lit template',
    },
    {
      header: 'Options',
      optionList: options,
    }
  ]));
}

if (help) {
  printUsage();
  process.exit(0);
}

if (!(source && output)) {
  console.error('Must provide a source, and output file!');
  printUsage();
  process.exit(-1);
}

sassRender(source, output).catch((err) => {
  console.error(err);
  process.exit(-1);
});