"use client";

import { columns } from "@/components/posts/columns";
import { DataTable } from "@/components/posts/data-table";
import { useState, useEffect } from "react";
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { NewPostForm } from "@/components/posts/new-post-form";
import { useTranslation } from "react-i18next";

const client = generateClient<Schema>();

export function PublicPosts({ isSignedIn }: { isSignedIn: boolean }) {
  const [posts, setPosts] = useState<Array<Schema["PublicPost"]["type"]>>([]);
  const { t } = useTranslation();

  const authMode = isSignedIn ? "userPool" : "identityPool";
  function listPosts() {
    client.models.PublicPost.observeQuery({
      authMode: authMode,
    }).subscribe({
      next: (data) => setPosts([...data.items]),
    });
  }

  useEffect(() => {
    listPosts();
  }, []);

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 lg:py-12">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="font-bold  text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-nowrap">
            {t("introduction.public_title")}
          </h1>
          <h3 className="text-1xl sm:text-1xl md:text-2xl lg:text-2xl">
            {t("introduction.description")}
          </h3>
        </div>
      </section>

      <section className="space-y-6 py-2 md:py-6 text-left">
        <div className="container flex flex-col gap-4 w-full sm:w-3/4 lg:w-2/4">
          <NewPostForm isPrivate={false} />
        </div>
      </section>

      <section className="space-y-6 py-8 md:py-6 text-left">
        <div className="container flex flex-col gap-4 w-full lg:w-3/4">
          <DataTable columns={columns} data={posts} isPrivate={false} />
        </div>
      </section>
    </>
  );
}
