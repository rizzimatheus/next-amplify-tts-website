"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePost } from "@/actions/delete-post";
import { Schema } from "@/amplify/data/resource";
import { toast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableDeleteRows<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const { t } = useTranslation();
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto h-8"
      disabled={!table.getSelectedRowModel().rows.length}
      onClick={() => {
        table.getSelectedRowModel().rows.forEach((row) => {
          deletePost((row.original as Schema["PrivatePost"]["type"]).id);
          row.toggleSelected(false);
        });
      }}
    >
      <Trash2 className="sm:mr-2 h-4 w-4" />
      <span className="hidden sm:flex">{t("table.delete_button")}</span>
    </Button>
  );
}

export function DataPublicTableDeleteRows<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const { t } = useTranslation();
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto h-8"
      disabled={!table.getSelectedRowModel().rows.length}
      onClick={() => {
        toast({
          variant: "destructive",
          title: t("table.delete_toast_title"),
          description: t("table.delete_toast_description"),
        });
      }}
    >
      <Trash2 className="sm:mr-2 h-4 w-4" />
      <span className="hidden sm:flex">{t("table.delete_button")}</span>
    </Button>
  );
}
