import { toJs } from 'estree-util-to-js';
import { fromJs } from 'esast-util-from-js';

function recmaModifyPostLayout() {
  return (tree, file) => {
    if (!file.history?.[0]?.includes('(posts)')) {
      return tree;
    }
    // find a function declaration that defines MDXContent
    let contentDeclaration = tree.body.findIndex(
      node => node.type === 'FunctionDeclaration' && node.id.name === 'MDXContent'
    );

    if (contentDeclaration === -1) {
      return tree;
    }

    /*
    convert:
    `
    return MDXLayout ? _jsxDEV(MDXLayout, Object.assign({}, props, {
      children: _jsxDEV(_createMdxContent, props, undefined, false, {
        fileName: "some path"
      }, this)
    }), undefined, false, {
      fileName: "some path"
    }, this) : _createMdxContent(props);
    `

    to:

    `
    return MDXLayout ? _jsxDEV(MDXLayout, Object.assign({info}, props, {
      children: _jsxDEV(_createMdxContent, props, undefined, false, {
        fileName: "some path"
      }, this)
    }), undefined, false, {
      fileName: "some path"
    }, this) : _createMdxContent(props);
    `


    */

    tree.body[contentDeclaration].body.body[1] = fromJs(
      toJs(tree.body[contentDeclaration].body.body[1])
        .value.replaceAll('MDXLayout', '__Layout')
        .replaceAll('Object.assign({}, props,', 'Object.assign({info}, props,'),
      {
        allowReturnOutsideFunction: true
      }
    ).body[0];

    tree.body = [
      ...fromJs(`import {ArticleLayout as __Layout } from "@/components/ArticleLayout"`, {
        module: true
      }).body,
      ...tree.body
    ];
  };
}

export const recmaPlugins = [recmaModifyPostLayout];
