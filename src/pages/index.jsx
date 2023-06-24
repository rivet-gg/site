import { formatDate } from '@/lib/formatDate';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';

export default function Index() {
  return <div>Rivet</div>;
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed();
  }

  return {
    props: {
      articles: (await getAllArticles()).slice(0, 4).map(({ component, ...meta }) => meta)
    }
  };
}
