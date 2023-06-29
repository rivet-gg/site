import fs from 'fs';

let backendPath = '../rivet';

let errorsPath = 'src/pages/docs/general/errors';

export async function generateErrors() {
  let errorPages = [];
  fs.rmSync(errorsPath, { recursive: true, force: true });

  processErrorDir(`${backendPath}/errors`, errorsPath, errorPages);

  function processErrorDir(inputPath, outputPath, pages) {
    console.log(`Processing dir ${inputPath} -> ${outputPath}`);
    fs.mkdirSync(outputPath, { recursive: true });

    for (const dirEntry of fs.readdirSync(inputPath)) {
      let inputPathEntry = `${inputPath}/${dirEntry}`;
      let outputPathEntry = `${outputPath}/${dirEntry}`;

      let stat = fs.statSync(inputPathEntry);

      if (stat.isFile && dirEntry.endsWith('.md')) {
        console.log(`Copying file ${inputPath} -> ${outputPath}`);

        let errorDoc = fs.readFileSync(inputPathEntry, 'utf8');

        // Read metadata
        let title = errorDoc.match(/^#\s+(.*)$/m)[1];
        if (!title) throw `Missing title: ${inputPathEntry}`;
        let name = errorDoc.match(/^name\s*=\s*"([\w_]+)"\s*$/m)[1];
        if (!name) throw `Missing name: ${inputPathEntry}`;
        let httpStatus = parseInt(errorDoc.match(/^http_status\s*=\s*(\d+)\s*$/m)[1]);
        if (httpStatus >= 500 && httpStatus < 600) {
          continue;
        }

        // Strip error doc
        errorDoc = errorDoc.replace(/---.*---\s+#[^\n]+\s+/gs, '');
        errorDoc = `# ${title}\n\n<Summary>{\`${name}\`}</Summary>\n\n${errorDoc}`;
        fs.writeFileSync(outputPathEntry.replace('.md', '.mdx'), errorDoc);

        pages.push({
          title: name,
          href: outputPathEntry.replace('.md', '').substring('src/pages'.length)
        });
      } else if (stat.isDirectory) {
        processErrorDir(inputPathEntry, outputPathEntry, pages);

        // TODO: For nested pages
        // let subPages = [];
        // processErrorDir(inputPathEntry, outputPathEntry, subPages);
        // if (subPages.length > 0) {
        //   pages.unshift({
        //     group: dirEntry,
        //     pages: subPages
        //   });
        // }
      }
    }

    pages.sort((a, b) => a.title.localeCompare(b.title));
  }

  fs.writeFileSync('src/generated/errorPages.json', JSON.stringify(errorPages, null, 2));
}

generateErrors();
