import { mdxAnnotations } from 'mdx-annotations';
import { visit } from 'unist-util-visit';
import rehypeMdxTitle from 'rehype-mdx-title';
import * as shiki from 'shiki';
import { toString } from 'mdast-util-to-string';
import * as acorn from 'acorn';
import { slugifyWithCounter } from '@sindresorhus/slugify';

function rehypeParseCodeBlocks() {
  return tree => {
    visit(tree, 'element', (node, _nodeIndex, parentNode) => {
      if (node.tagName === 'code') {
        // Parse language
        if (node.properties.className) {
          parentNode.properties.language = node.properties.className[0]?.replace(/^language-/, '');
        }

        // Parse annotations
        if (parentNode.properties?.annotation) {
          try {
            // Annotations can only be strings
            let annotations = JSON.parse(parentNode.properties.annotation);

            for (let key in annotations) {
              parentNode.properties[key] = annotations[key];
            }
          } catch (e) {
            console.error('invalid annotations in code block', e);
          }
        }
      }
    });
  };
}

const cssVariableTheme = shiki.createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
});

/** @type {import("shiki").Highlighter} */
let highlighter;

function rehypeShiki() {
  return async tree => {
    if (highlighter == undefined) {
      highlighter = await shiki.getHighlighter({
        theme: cssVariableTheme,
        langs: [
          'bash',
          'batch',
          'cpp',
          'csharp',
          'docker',
          'gdscript',
          'html',
          'ini',
          'js',
          'json',
          'json',
          'powershell',
          'ts',
          'typescript',
          'yaml'
        ]
      });
    }

    visit(tree, 'element', node => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        let codeNode = node.children[0];
        let textNode = codeNode.children[0];

        node.properties.code = textNode.value;

        if (node.properties.language) {
          textNode.value = highlighter.codeToHtml(textNode.value, {
            lang: node.properties.language,
            theme: cssVariableTheme,
            elements: {
              pre: ({ children }) => children,
              code: ({ children }) => children,
              line: ({ children }) => `<span>${children}</span>`
            }
          });
        }
      }
    });
  };
}

function rehypeSlugify() {
  return tree => {
    let slugify = slugifyWithCounter();
    visit(tree, 'element', node => {
      if ((node.tagName === 'h2' || node.tagName == 'h3') && !node.properties.id) {
        node.properties.id = slugify(toString(node));
      }
    });
  };
}

function rehypeAddCustomCode() {
  return tree => {
    let exports = [
      `import {convertConfigToMetadata,convertConfigToInfo} from "@/lib/articles/metadata";
      let metadataConfig = typeof config === 'undefined' ? undefined : config;
      export const metadata = convertConfigToMetadata(metadataConfig);
      export const info = convertConfigToInfo(metadataConfig, import.meta.url);
      `
    ];

    let code = exports.join('\n');

    tree.children.push({
      type: 'mdxjsEsm',
      value: code,
      data: {
        estree: acorn.parse(code, {
          sourceType: 'module',
          ecmaVersion: 'latest'
        })
      }
    });
  };
}

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeParseCodeBlocks,
  rehypeShiki,
  rehypeSlugify,
  rehypeMdxTitle,
  rehypeAddCustomCode
];
