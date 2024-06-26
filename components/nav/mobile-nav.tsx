"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site";
import { useTranslation } from "react-i18next";
import { SignInSignOut } from "./signin-signout";
import { aboutPage } from "@/utils/about";

export function MobileNav({ isSignedIn }: { isSignedIn: boolean }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [authCheck, setAuthCheck] = useState(isSignedIn);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center hover:underline"
        >
          <Icons.Logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href={aboutPage()}>
            {t("header.about")}
          </MobileLink>
          {authCheck && (
          <MobileLink onOpenChange={setOpen} href="/notes">
            {t("header.my_notes")}
          </MobileLink>
          )}
          <SignInSignOut className="mt-8" onOpenChange={setOpen}/>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: Readonly<MobileLinkProps>) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={`hover:underline ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
