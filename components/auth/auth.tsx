"use client";

import { Amplify } from "aws-amplify";
import config from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";

Amplify.configure(config, { ssr: true });

export const Auth = ({ children }: { children: React.ReactNode }) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};
