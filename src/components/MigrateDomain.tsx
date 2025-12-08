"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { usePathname } from "next/navigation";

export default function MigrateDomain() {
  const [open, setOpen] = React.useState(true);
  const path = usePathname();

  const OLD_DOMAIN = "vilm-react.vercel.app";
  const newDomain = "https://vilm.hanasa.id" + path + "?utm_source=old_domain";

  useEffect(() => {
    console.log("Current hostname:", window.location.hostname);
    if (window.location.hostname === OLD_DOMAIN) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [setOpen]);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Domain Migration Notice</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            We have migrated to{" "}
            <Link href={newDomain} className="font-semibold hover:underline">
              https://vilm.hanasa.id
            </Link>
            . Please note that you will need to re-enter your authentication
            token on the new domain.
          </AlertDialogDescription>
          <AlertDialogAction>
            <Link href={newDomain} className="w-full">
              Go to New Domain
            </Link>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
