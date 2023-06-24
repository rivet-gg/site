const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const https = require('https');
const stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);

const csvPath = '/Users/nathan/Downloads/Rivet - Blog Posts.csv'; // replace with the path to your CSV file

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', async row => {
    let blogPath = `src/pages/blog/${row.Tags}/${row.Slug}`;

    // create blog post folder
    fs.mkdirSync(blogPath, { recursive: true });

    // download image
    const imageUrl = row['Main Image'];
    if (imageUrl.length == 0) {
      throw new Error(`No image for ${row['Name']}`);
    }
    await downloadImage(imageUrl, `${blogPath}/image.png`);

    const { unified } = await import('unified');
    const { default: rehypeParse} = await import('rehype-parse');
    const {default:rehypeRemark} = await import('rehype-remark');
    const {default:stringify} = await import('remark-stringify');

    const processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeRemark)
      .use(stringify);

    let mdOutput = await processor.process(row['Post Body']);

    // create blog post file
    fs.writeFileSync(
      `${blogPath}/index.mdx`,
      `import { ArticleLayout } from '@/components/ArticleLayout';
import image from './image.png';

export const meta = {
  image,
  author: 'nathan-flurry',
  date: '${new Date(row['Custom Publish Date']).toISOString().split('T')[0]}',
  title: \`${row['Name']}\`,
  description: \`${row['Summary']}\`,
  imageAlt: \`${row['Image Alt Text']}\`,
};

export default props => <ArticleLayout image={image} meta={meta} {...props} />;

${mdOutput}
      `
    );
  });

async function downloadImage(url, path) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
      }
    });

    request.on('response', response => {
      // only handle successful requests
      if (response.statusCode >= 200 && response.statusCode < 300) {
        const file = fs.createWriteStream(path);
        response.pipe(file);
        file.on('finish', function () {
          file.close(resolve); // close() is async, call resolve after close completes.
        });
      } else {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
      }
    });

    request.on('error', err => {
      fs.unlink(path);
      reject(err);
    });
  });
}
