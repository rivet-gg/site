import { remarkPlugins } from './remark.mjs';
import { rehypePlugins } from './rehype.mjs';
import { recmaPlugins } from './recma.mjs';

export const config = {
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins
  }
};
