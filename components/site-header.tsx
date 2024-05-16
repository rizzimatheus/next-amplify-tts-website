import initTranslations from "@/app/i18n";
import { MainNav } from "@/components/nav/main-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ModeToggle } from "@/components/nav/mode-toggle";
import TranslationsProvider from "@/components/TranslationsProvider";
import LanguageChanger from "@/components/nav/language-changer";
import { isAuthenticated } from "@/utils/amplify-utils";
import { SignInSignOut } from "./nav/signin-signout";

const i18nNamespaces = ["common"];

export async function SiteHeader({ locale }: Readonly<{ locale: string }>) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const isSignedIn = await isAuthenticated()
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <header className="z-10 fixed top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <MainNav isSignedIn={isSignedIn} />
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center gap-1">
              <LanguageChanger />
              <ModeToggle />
              <SignInSignOut className="hidden md:inline-block"/>
              <MobileNav isSignedIn={isSignedIn} />
            </nav>
          </div>
        </div>
      </header>
    </TranslationsProvider>
  );
}
