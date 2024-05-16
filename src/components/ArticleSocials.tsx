'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss, faRssSquare } from '@fortawesome/sharp-solid-svg-icons';
import { faXTwitter, faHackerNews, faReddit } from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';
import { getSiteUrl } from '@/lib/siteUrl';
import { ArticleInfo } from '@/lib/articles/metadata';

export function ArticleSocials({ title, ...props }: ArticleInfo) {
  let pathname = usePathname();
  let siteUrl = getSiteUrl();
  let articleUrl = siteUrl + pathname;
  return (
    <div className='mt-14 flex items-center space-x-4'>
      <div className='h-[1px] flex-grow bg-cream-100 opacity-50'></div>
      <SocialIcon url='/rss/feed.xml' icon={faRssSquare} />
      <SocialIcon
        url={`https://x.com/share?text=${encodeURIComponent(`${title} ${articleUrl} via @rivet_gg`)}`}
        icon={faXTwitter}
      />
      <SocialIcon
        url={`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
          articleUrl
        )}&t=${encodeURIComponent(title)}`}
        icon={faHackerNews}
      />
      <SocialIcon
        url={`https://www.reddit.com/submit?url=${articleUrl}&title=${encodeURIComponent(title)}`}
        icon={faReddit}
      />
      <div className='h-[1px] flex-grow bg-cream-100 opacity-50'></div>
    </div>
  );
}

function SocialIcon({ url, icon }) {
  return (
    <a href={url} target='_blank' rel='noreferrer' className='text-orange-400 hover:text-cream-100'>
      <FontAwesomeIcon icon={icon} size='xl' />
    </a>
  );
}
