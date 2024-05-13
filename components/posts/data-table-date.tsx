import { useTranslation } from "react-i18next";

export function DataTableDate({ date }: { date: Date }) {
    const { t } = useTranslation();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return (
        <div className="flex flex-col">
          {/* pt-BR or en-US */}
          <span>
            {date.toLocaleDateString(t("table.date_format"), options)}
          </span>
        </div>
      );
}