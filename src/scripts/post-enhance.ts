/**
 * 文章/项目详情页增强脚本（纯 TypeScript，无框架依赖）
 * - 标题锚点 + 目录（TOC）自动生成
 * - 阅读进度条
 * - 代码块复制按钮
 * - 图片点击放大查看器
 */

/** 与 <h2>/<h3> 文本一一对应的锚点 slug */
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** 目录生成 + 锚点 + 滚动高亮 */
export function initToc(contentRoot: Element, tocRoot: Element): void {
  const headings = Array.from(contentRoot.querySelectorAll('h2, h3'));
  if (headings.length === 0) {
    tocRoot.closest('.post-toc-wrap')?.remove();
    return;
  }
  const used = new Map<string, number>();
  const links: HTMLAnchorElement[] = [];

  for (const h of headings) {
    const base = slugify(h.textContent ?? '');
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    h.id = id;

    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = h.textContent;
    a.dataset.depth = h.tagName.toLowerCase() === 'h2' ? '2' : '3';
    tocRoot.appendChild(a);
    links.push(a);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = links.find((l) => l.getAttribute('href') === `#${entry.target.id}`);
        link?.classList.toggle('is-active', entry.isIntersecting);
      }
    },
    { rootMargin: '-90px 0px -70% 0px' },
  );
  for (const h of headings) observer.observe(h);
}

/** 阅读进度条 */
export function initReadingProgress(bar: HTMLElement): void {
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/** 代码块复制按钮 */
export function initCodeCopy(scope: ParentNode = document): void {
  const pres = scope.querySelectorAll<HTMLElement>('pre.astro-code');
  for (const pre of pres) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn';
    btn.textContent = '复制';
    pre.style.position = 'relative';
    pre.appendChild(btn);

    btn.addEventListener('click', async () => {
      const text = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = '已复制 ✓';
        btn.classList.add('is-copied');
      } catch {
        btn.textContent = '复制失败';
      }
      window.setTimeout(() => {
        btn.textContent = '复制';
        btn.classList.remove('is-copied');
      }, 1800);
    });
  }
}

/** 图片点击放大查看器（放大 / 缩小 / 滚轮缩放 / ESC 关闭） */
export function initImageViewer(scope: ParentNode = document): void {
  const targets = Array.from(scope.querySelectorAll<HTMLImageElement>('img[data-zoom]'));
  if (targets.length === 0) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'img-viewer';
  dialog.innerHTML = `
    <div class="img-viewer__bar">
      <span class="img-viewer__title font-pixel">地图查看器</span>
      <div class="img-viewer__controls">
        <button type="button" data-act="out" class="px-btn px-btn--ghost px-btn--sm" aria-label="缩小">−</button>
        <button type="button" data-act="in" class="px-btn px-btn--sm" aria-label="放大">+</button>
        <button type="button" data-act="close" class="px-btn px-btn--sm" aria-label="关闭">×</button>
      </div>
    </div>
    <div class="img-viewer__stage"><img alt="查看中的图片" class="pixel-art" /></div>
  `;
  document.body.appendChild(dialog);

  const img = dialog.querySelector('img')!;
  const stage = dialog.querySelector<HTMLElement>('.img-viewer__stage')!;
  let scale = 1;

  const setScale = (s: number) => {
    scale = Math.min(6, Math.max(0.4, s));
    img.style.transform = `scale(${scale})`;
  };

  stage.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      setScale(scale + (e.deltaY < 0 ? 0.25 : -0.25));
    },
    { passive: false },
  );

  dialog.querySelectorAll<HTMLButtonElement>('button[data-act]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.act === 'in') setScale(scale + 0.5);
      else if (btn.dataset.act === 'out') setScale(scale - 0.5);
      else dialog.close();
    });
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target === stage) dialog.close();
  });

  for (const el of targets) {
    el.addEventListener('click', () => {
      img.src = el.src;
      img.alt = el.alt;
      setScale(1);
      dialog.showModal();
    });
  }
}
