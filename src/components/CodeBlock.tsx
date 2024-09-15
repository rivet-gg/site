import * as shiki from 'shiki';

export async function CodeBlock({ lang, code }) {
  const shikiTheme = shiki.createCssVariablesTheme({
    name: 'css-variables',
    variablePrefix: '--shiki-',
    variableDefaults: {},
    fontStyle: true
  });
  const out = await shiki.codeToHtml(code, {
    lang,
    theme: shikiTheme
  });

  return <div className='code' dangerouslySetInnerHTML={{ __html: out }} />;
}
