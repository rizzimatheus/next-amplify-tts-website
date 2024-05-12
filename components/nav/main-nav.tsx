"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "../icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from "react";

export function MainNav({ isSignedIn }: { isSignedIn: boolean }) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const [authCheck, setAuthCheck] = useState(isSignedIn);
  const router = useRouter();
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          router.push("/notes");
          break;
        case "signedOut":
          setAuthCheck(false);
          router.push("/signin");
          break;
      }
    });

    return () => hubListenerCancel();
  }, [router]);

  return (
    <nav className="flex items-center gap-5 w-full">
      <Link href="/" className="flex items-center space-x-2 hover:underline">
        <Icons.Logo className="h-6 w-6" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>

      <div className="flex flex-row justify-start flex-1 space-x-4 lg:space-x-6">
        <Link
          href="/about"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary hidden md:inline-block",
            pathname === "/about" ? "text-foreground" : "text-foreground/60"
          )}
        >
          {t("header.about")}
        </Link>
        {authCheck && (
          <Link
            href="/notes"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary hidden md:inline-block",
              pathname === "/notes" ? "text-foreground" : "text-foreground/60"
            )}
          >
            {t("header.my_notes")}
          </Link>
        )}
      </div>
    </nav>
  );
}
