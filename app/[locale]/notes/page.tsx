import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { Posts } from "@/components/posts/posts";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";

import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
Amplify.configure(outputs, {ssr: true});

const i18nNamespaces = ["posts"];

export default async function Home({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const user = await AuthGetCurrentUserServer();

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="flex flex-col w-full">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-12">
          <div className="container flex flex-col gap-4 text-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-nowrap">
              {t("introduction.private_title")} {user?.signInDetails?.loginId?.split("@")[0].toUpperCase()}
            </h1>
            <h3 className="text-1xl sm:text-1xl md:text-2xl lg:text-2xl">
              {t("introduction.description")}
            </h3>
          </div>
        </section>
        <Posts />
      </div>
    </TranslationsProvider>
  );
}
