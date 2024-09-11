import { HeroPattern } from '@/components/HeroPattern';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Button } from '@/components/Button';
import { faRss } from '@fortawesome/sharp-solid-svg-icons';
import { getAllArticles } from '@/lib/getAllArticles';
import { formatTimestamp } from '@/lib/formatDate';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleInfo } from '@/lib/articles/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Rivet'
};

function Article({
  category,
  title,
  description,
  author,
  images,
  date,
  slug
}: ArticleInfo & { slug: string }) {
  let href = `/blog/${slug}`;
  return (
    <article className='flex flex-col items-start justify-between'>
      <div>
        {/* Image */}
        <div className='relative w-full'>
          <Link href={href}>
            <Image
              src={images.hero.image}
              alt={images.hero.alt}
              className='aspect-[2/1] w-full object-cover'
            />
          </Link>
          <div className='pointer-events-none absolute inset-0 border-2 ring-white/50'></div>
        </div>

        {/* Date & category */}
        <div className='mt-8 flex items-center gap-x-3 text-xs'>
          <time dateTime={formatTimestamp(date)} className='text-charcole-500'>
            {formatTimestamp(date)}
          </time>
          <div className='relative z-10 bg-charcole-950 font-medium text-cream-400'>{category.name}</div>
        </div>

        {/* Description */}
        <div className='group relative'>
          <h3 className='mt-2 text-lg font-semibold leading-6 text-cream-100 group-hover:text-cream-200'>
            <Link href={href}>
              <span className='absolute inset-0'></span>
              {title}
            </Link>
          </h3>
          <p className='mt-3 line-clamp-3 text-sm leading-6 text-white/80'>{description}</p>
        </div>
      </div>

      <div className='max-w-xl'>
        {/* Author */}
        <div className='relative mt-4 flex items-center gap-x-4'>
          <Image
            src={author.avatar}
            width={40}
            height={40}
            alt={author.name}
            className='h-10 w-10 rounded-full bg-cream-100'
          />
          <div className='text-sm leading-6'>
            <div className='font-semibold text-cream-100'>{author.name}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function BlogPage() {
  let articles = await getAllArticles();
  return (
    <>
      <HeroPattern />
      <SimpleLayout
        title='Blog'
        floatRight={
          <Button icon={faRss} href='/rss/feed.xml'>
            RSS Feed
          </Button>
        }
      >
        <div className='mb-8 mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-3'>
          {articles.map(article => (
            <Article key={article.slug} {...article.info} slug={article.slug} />
          ))}
        </div>
      </SimpleLayout>
    </>
  );
}
