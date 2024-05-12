import initTranslations from "@/app/i18n";

export default async function Home({
    params: { locale },
  }: Readonly<{ params: { locale: string } }>) {
    const { t, resources } = await initTranslations(locale, ["home", "posts"]);
  
    return (
        <h1>About Page</h1>
    )
}