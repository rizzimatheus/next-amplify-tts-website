interface Config {
  locales: readonly string[];
  defaultLocale: string;
  prefixDefault?: boolean;
  serverSetCookie?: 'if-empty' | 'always' | 'never';
}

const i18nConfig: Config = {
  locales: ["en", "pt"],
  defaultLocale: "en",
  prefixDefault: false,
  serverSetCookie: "never",
};

export default i18nConfig;
