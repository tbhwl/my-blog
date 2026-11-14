/**
 * RSS 订阅源 /rss.xml
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: site ?? siteConfig.url,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `/posts/${p.id}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
};
