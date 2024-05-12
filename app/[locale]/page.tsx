import { isAuthenticated } from "@/utils/amplify-utils";
import initTranslations from "@/app/i18n";
import { PublicPosts } from "@/components/posts/public-posts";
import TranslationsProvider from "@/components/TranslationsProvider";

export default async function Home({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const { t, resources } = await initTranslations(locale, ["home", "posts"]);

  return (
    <TranslationsProvider
      namespaces={["posts"]}
      locale={locale}
      resources={resources}
    >
      <div className="flex flex-col w-full">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-24">
          <div className="container flex flex-col gap-2 md:gap-8 text-center">
            <h1 className="font-bold text-1xl sm:text-1xl md:text-2xl lg:text-2xl">
              {t("introduction.headline1")}
            </h1>
            <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-nowrap">
              🔉Audio Notes📝
            </h1>
            <h1 className="font-bold  text-1xl sm:text-2xl md:text-2xl lg:text-3xl">
              {t("introduction.headline2")}
            </h1>
          </div>
        </section>
        <PublicPosts isSignedIn={await isAuthenticated()} />
      </div>
    </TranslationsProvider>
  );
}
