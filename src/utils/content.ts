/**
 * 内容相关工具函数
 */
import { categoryMap, siteConfig } from '@/config/site';

/** 项目 repoKey → 统一配置里的 GitHub Releases 下载页（未配置时返回空串，不编造） */
export function resolveRepoUrl(repoKey: string | undefined): string {
  if (!repoKey) return '';
  const repoMap: Record<string, string> = {
    terrariaWorldParser: siteConfig.github.terrariaWorldParserRepo,
  };
  const repo = repoMap[repoKey];
  return repo ? `https://github.com/${repo}/releases` : '';
}

/** 格式化日期为「YYYY 年 M 月 D 日」 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}

/** 格式化日期为 ISO（用于 <time datetime>） */
export function toISODate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

/** 估算中文阅读时长（分钟） */
export function readingTimeMinutes(text: string): number {
  const cjk = (text.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length;
  const words = (text.replace(/[\u4e00-\u9fff\u3040-\u30ff]/g, ' ').match(/\b\w+\b/g) || []).length;
  const minutes = Math.max(1, Math.round(cjk / 400 + words / 200));
  return minutes;
}

/** 根据分类键取矿层定义（未知键回退到「地表」） */
export function getCategory(key: string) {
  return categoryMap.get(key) ?? categoryMap.get('surface')!;
}

/** 生成分类页 slug 键（未知名 → 地表） */
export function normalizeCategoryKey(key: string | undefined): string {
  return categoryMap.has(key ?? '') ? key! : 'surface';
}
