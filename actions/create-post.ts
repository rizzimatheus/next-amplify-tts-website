"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { v4 as uuid } from "uuid";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);
const client = generateClient<Schema>();

export const createPost = async (voice: string, text: string) => {
  if (!voice || !text) return;

  const { data, errors } = await cookieBasedClient.models.Post.create(
    {
      id: uuid(),
      voice: voice,
      text: text,
      status: "Processing",
      url: "",
    },
    {
      authMode: "userPool",
    }
  );
};

export const createPublicPost = async (voice: string, text: string) => {
  if (!voice || !text) return;

  const { data, errors } = await client.models.PublicPosts.create(
    {
      id: uuid(),
      voice: voice,
      text: text,
      status: "Processing",
      url: "",
    },
    {
      authMode: "identityPool",
    }
  );
};
