/**
 * https://github.com/pacocoursey/next-themes/
 */

export const colorSchemes = ['light', 'dark'];
export const MEDIA = '(prefers-color-scheme: dark)';

export const themes = ['light', 'dark'] as const;
export type Theme = (typeof themes)[number];

export function getSystemTheme(
  e: MediaQueryList | MediaQueryListEvent = window.matchMedia(MEDIA),
) {
  const isDark = e.matches;
  const systemTheme = isDark ? 'dark' : 'light';

  return systemTheme;
}

export function getManualTheme(savedTheme?: string) {
  const themeName: string =
    savedTheme ||
    localStorage.getItem(import.meta.env.PUBLIC_THEME_KEY) ||
    import.meta.env.PUBLIC_DEFAULT_THEME;
  if (
    (themes as unknown as { includes(x: string): x is Theme }).includes(
      themeName,
    )
  )
    return themeName;
}

const el = document.documentElement;

export function applyTheme(_theme?: Theme) {
  const theme = _theme ?? getManualTheme() ?? getSystemTheme();
  el.classList.remove(...themes);
  el.classList.add(theme);

  if (themes.includes(theme)) {
    el.style.colorScheme = theme;
  }
}
