export const THEME_MODE = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const EXPORT_FILE_NAME = {
  TAGS: (from: string, to: string) => `[Admin Portal] Tags ${from} - ${to}`,
  TRAFFICS: (from: string, to: string) => `[Admin Portal] Traffics ${from} - ${to}`,
}