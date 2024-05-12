"use client";

import { Button, ButtonProps } from "../ui/button";
import { useTranslation } from "react-i18next";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

interface SignInSignOutProps extends ButtonProps {
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function SignInSignOut({
  onOpenChange,
  className,
  ...props
}: Readonly<SignInSignOutProps>) {
  const { t } = useTranslation();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const router = useRouter();
  const signOutSignIn = async () => {
    onOpenChange?.(false);
    if (user) {
      await signOut();
    } else {
      router.push("/signin");
    }
  };

  return (
    <Button
      onClick={signOutSignIn}
      variant="secondary"
      className={className}
      {...props}
    >
      {user ? t("header.sign_out") : t("header.sign_in")}
    </Button>
  );
}
