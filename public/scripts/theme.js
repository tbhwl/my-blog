/**
 * 主题初始化脚本（阻塞加载，避免页面闪烁）
 * 逻辑：优先使用用户保存的选择；否则跟随系统主题。
 */
(function () {
  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {
    /* 隐私模式下忽略 */
  }
  var isNight =
    saved !== null
      ? saved === 'night'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', isNight ? 'night' : 'day');
  document.documentElement.style.colorScheme = isNight ? 'dark' : 'light';
})();
