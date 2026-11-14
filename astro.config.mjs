// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ⚠️ 待补充：部署到 Cloudflare Pages 后，替换为你自己的域名。
// 此地址会出现在 sitemap.xml、RSS、canonical 和 og:url 中。
const SITE_URL = 'https://my-blog-3th.pages.dev';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: 'light',
      wrap: true,
      // 不配置 langs：Shiki 会按 Markdown 代码块里出现的语言自动按需加载
    },
  },
});
