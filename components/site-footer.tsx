import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import initTranslations from "@/app/i18n";

export async function SiteFooter({ locale }: Readonly<{ locale: string }>) {
  const { t } = await initTranslations(locale, ["common"]);
  return (
    <footer>
      <div id="contact" className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm font-bold text-current dark:text-my-yellow">
          {t("footer.contact_me")}
        </div>
        <div className="mb-3 flex space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            href={`mailto:${siteConfig.email}`}
          >
            <span className="sr-only">Mail</span>
            <Icons.Mail className="h-6 w-6 hover:fill-my-yellow" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.linkedin}>
            <span className="sr-only">LinkedIn</span>
            <Icons.Linkedin className="h-6 w-6 hover:fill-my-yellow" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.Github className="h-6 w-6 hover:fill-my-yellow" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.whatsapp}>
            <span className="sr-only">WhatsApp</span>
            <Icons.Whatsapp className="h-6 w-6 hover:fill-my-yellow" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a href="/">{siteConfig.author}</a>
          <div>•</div>
          <div>© 2024</div>
        </div>
      </div>
    </footer>
  );
}
