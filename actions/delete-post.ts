"use server";

import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";

export const deletePost = async (id: string) => {
  const isSignedIn = await isAuthenticated()
  if (!isSignedIn) {
    return;
  }

  const { data, errors } = await cookieBasedClient.models.Post.delete({
    id,
  });
};
