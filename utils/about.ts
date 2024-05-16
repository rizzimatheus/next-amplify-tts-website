import { useTranslation } from "react-i18next";
import { siteConfig } from "@/config/site";

export const aboutPage = () => {
    const { i18n } = useTranslation();
    if (i18n.language === "pt") {
        return siteConfig.links.about.replaceAll(`/en/`, `/pt/`)
    }
    return siteConfig.links.about
}