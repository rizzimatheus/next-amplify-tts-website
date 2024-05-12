"use client";

import { columns } from "@/components/posts/columns";
import { DataTable } from "@/components/posts/data-table";
import { useState, useEffect } from "react";
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { NewPostForm } from "./new-post-form";

const client = generateClient<Schema>();

export function PrivatePosts() {
  const [posts, setPosts] = useState<Array<Schema["PrivatePost"]["type"]>>([]);

  function listPosts() {
    client.models.PrivatePost.observeQuery({
      authMode: "userPool",
    }).subscribe({
      next: (data) => setPosts([...data.items]),
    });
  }

  useEffect(() => {
    listPosts();
  }, []);

  return (
    <>
      <section className="space-y-6 py-2 md:py-6 text-left">
        <div className="container flex flex-col gap-4 w-full sm:w-3/4 lg:w-2/4">
          <NewPostForm isPrivate={true} />
        </div>
      </section>

      <section className="space-y-6 py-8 md:py-6 text-left">
        <div className="container flex flex-col gap-4 w-full lg:w-3/4">
          <DataTable columns={columns} data={posts} isPrivate={true} />
        </div>
      </section>
    </>
  );
}
