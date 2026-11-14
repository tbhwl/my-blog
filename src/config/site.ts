/**
 * 全站统一配置（重要配置集中管理，避免散落写死）
 *
 * 带「⚠️ 待补充」标记的字段，请在你拿到真实信息后填写。
 * 未填写的字段不会导致网站构建失败，对应区域会自动隐藏或显示「待补充」占位。
 */

/** 矿层（文章分类）定义：以世界纵向剖面为概念 */
export interface CategoryDef {
  /** 分类键（内容文件 frontmatter 里使用） */
  key: string;
  /** 矿层名称 */
  name: string;
  /** 一句话说明 */
  tagline: string;
  /** 矿层类型（决定配色与图标） */
  kind: 'surface' | 'cave' | 'deep' | 'hell';
}

export const categories: CategoryDef[] = [
  { key: 'surface', name: '地表', tagline: '生活、随笔', kind: 'surface' },
  { key: 'cave', name: '洞穴', tagline: '教程、学习笔记', kind: 'cave' },
  { key: 'deep', name: '深层', tagline: '技术原理、项目复盘', kind: 'deep' },
  { key: 'hell', name: '地狱', tagline: '踩坑、翻车记录', kind: 'hell' },
];

export const categoryMap = new Map(categories.map((c) => [c.key, c]));

export const siteConfig = {
  /** 网站名称 */
  name: '这很泰不好丸啦',
  /** 一句话定位 */
  tagline: '一个属于自己的像素世界',
  /** 网站描述（SEO / OG / RSS 用） */
  description:
    '「这很泰不好丸啦」是一个以复古像素风为视觉特色的综合性个人博客：展示个人项目与作品，记录学习过程、技术笔记和生活随笔，让访客像探索一个像素世界一样认识我。',
  /** ⚠️ 待补充：部署后替换为真实域名（请与 astro.config.mjs 的 site 保持一致） */
  url: 'https://my-blog-3th.pages.dev',
  /** 建站年份 */
  since: 2026,

  /** ⚠️ 待补充：作者信息（没有的信息一律不编造） */
  author: {
    /** 展示昵称 */
    name: '冒险者',
    /** ⚠️ 待补充：一句话自我介绍（留空显示占位） */
    bio: '',
    /** ⚠️ 待补充：联系邮箱（留空则隐藏联系方式） */
    email: '',
  },

  /** GitHub 相关配置（⚠️ 全部待补充；未配置时相关区域自动隐藏或显示占位） */
  github: {
    /** ⚠️ 待补充：GitHub 用户名 */
    username: '',
    /** ⚠️ 待补充：泰拉瑞亚世界存档解析器仓库，格式 "用户名/仓库名" */
    terrariaWorldParserRepo: 'tbhwl/terraria-world-parser',
  },

  /**
   * Giscus 评论配置（⚠️ 待补充；repo 留空 = 评论功能整体关闭）
   * 填写步骤见 README.md「GitHub 集成」章节。
   */
  giscus: {
    repo: '',
    repoId: '',
    category: '',
    categoryId: '',
    mapping: 'pathname',
  },

  /**
   * 世界事件日志（首页「世界事件」区域）。
   * 只记录真实发生的事，没有真实数据时保持空数组。
   */
  events: [
    {
      date: '2026-11-14',
      type: 'site' as const,
      text: '「这很泰不好丸啦」正式上线，像素世界开始生成。',
    },
    {
      date: '2026-11-14',
      type: 'project' as const,
      text: '泰拉瑞亚世界存档解析器展示页上线（项目已完成，仅展示）。',
    },
  ],
};

/** 首页 Hero 随机副标题（原创文案，随页面加载随机抽取一条） */
export const heroSubtitles: string[] = [
  '正在生成世界……',
  '今天也在挖矿（指学习）。',
  '这里没有最终 Boss，只有越来越强的我。',
  '把每一次踩坑都写成冒险日志。',
  '像素越多，世界越大。',
  '地表、洞穴、深层、地狱：一路向下，一路向上。',
  '存档里的世界能变成地图，脑子的世界能变成这里。',
];

/** 主导航（世界观：导航栏 = 像素快捷栏 Hotbar） */
export const navItems = [
  { href: '/', label: '出生点', icon: 'home', exact: true },
  { href: '/projects/', label: '作品', icon: 'chest', exact: false },
  { href: '/posts/', label: '日志', icon: 'book', exact: false },
  { href: '/archive/', label: '归档', icon: 'layers', exact: false },
  { href: '/about/', label: '档案', icon: 'id', exact: false },
  { href: '/search/', label: '搜索', icon: 'search', exact: false },
] as const;

/** GitHub 个人主页地址（未配置用户名时为空，页脚自动隐藏） */
export function githubProfileUrl(): string {
  const u = siteConfig.github.username;
  return u ? `https://github.com/${u}` : '';
}
