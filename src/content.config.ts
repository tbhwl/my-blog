/**
 * 内容集合配置（Astro Content Layer API）
 * 项目与文章都从独立内容文件读取，方便以后扩展。
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/** 项目集合：src/content/projects/*.md */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    /** 项目名称 */
    name: z.string(),
    /** 一句话简介 */
    tagline: z.string(),
    /** 项目简介（列表页/卡片用） */
    description: z.string(),
    /** 项目状态：已完成 / 进行中 / 暂时搁置 */
    status: z.enum(['completed', 'active', 'paused']),
    /** 是否在首页「代表作品」区重点展示 */
    featured: z.boolean().default(false),
    /** 仓库键：对应 src/config/site.ts 中 github 字段里的仓库地址（待补充时留空） */
    repoKey: z.string().optional(),
    /** 技术标签（未知时留空数组，页面显示「待补充」） */
    tech: z.array(z.string()).default([]),
    /** 项目封面图（public 目录下的路径，暂无则留空） */
    cover: z.string().optional(),
    /** 项目截图列表（暂无则留空，页面显示占位区域） */
    screenshots: z.array(z.string()).default([]),
    /** 已实现功能列表（只写真实功能） */
    features: z.array(z.string()).default([]),
    /** 排序权重（越大越靠前） */
    order: z.number().default(0),
  }),
});

/** 文章集合：src/content/posts/*.md */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    /** 标题 */
    title: z.string(),
    /** 摘要（列表页、SEO、RSS 用） */
    description: z.string(),
    /** 发布日期 */
    pubDate: z.coerce.date(),
    /** 最近更新日期（可选） */
    updatedDate: z.coerce.date().optional(),
    /** 分类（矿层）：地表 / 洞穴 / 深层 / 地狱 */
    category: z.enum(['surface', 'cave', 'deep', 'hell']),
    /** 标签 */
    tags: z.array(z.string()).default([]),
    /** 草稿（true 时不发布） */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
