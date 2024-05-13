"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Schema } from "@/amplify/data/resource";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePost } from "@/actions/delete-post";
import { DataTableColumnHeader } from "./data-table-column-header";
import { useTranslation } from "react-i18next";
import { DataTableDate } from "./data-table-date";

export const columns: ColumnDef<Schema["PrivatePost"]["type"]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="table.date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <DataTableDate date={date} />
      )
    },
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  // },
  // {
  //   accessorKey: "owner",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Owner" />
  //   ),
  // },
  {
    accessorKey: "voice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="table.voice" />
    ),
  },
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="table.text" />
    ),
    cell: ({ row }) => {
      return <p className="min-w-32">{row.original.text}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="table.status" />
    ),
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="table.audio" />
    ),
    cell: ({ row }) => {
      const url = row.original.url;
      return url ? (
        <audio controls>
          <source src={url} type="audio/mpeg" />
        </audio>
      ) : (
        ""
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const post = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           {/* <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(post.id)}
  //           >
  //             Copy Note ID
  //           </DropdownMenuItem> */}
  //           <DropdownMenuItem
  //             onClick={() => {
  //               deletePost(post.id);
  //             }}
  //           >
  //             Delete Post
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
