"use client";

import { Authenticator } from "@aws-amplify/ui-react";

export const AuthClient = ({ isSignedIn }: { isSignedIn: boolean }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-full mt-10">
      <Authenticator
        i18nIsDynamicList={true}
        // socialProviders={["facebook", "google"]}
        // signUpAttributes={["name"]}
      />
    </div>
  );
};
