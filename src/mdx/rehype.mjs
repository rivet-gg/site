import { mdxAnnotations } from 'mdx-annotations';
import { visit } from 'unist-util-visit';
import rehypeMdxTitle from 'rehype-mdx-title';
import shiki from 'shiki';
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

        // Parse title
        if (node.data?.meta) {
          parentNode.properties.title = node.data.meta;
        }
      }
    });
  };
}

let highlighter;

function rehypeShiki() {
  return async tree => {
    highlighter = highlighter ?? (await shiki.getHighlighter({ theme: 'css-variables' }));

    visit(tree, 'element', node => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        let codeNode = node.children[0];
        let textNode = codeNode.children[0];

        node.properties.code = textNode.value;

        if (node.properties.language) {
          let tokens = highlighter.codeToThemedTokens(textNode.value, node.properties.language);

          textNode.value = shiki.renderToHtml(tokens, {
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
      export const info = convertConfigToInfo(metadataConfig);
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
