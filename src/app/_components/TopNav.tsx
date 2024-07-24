"use client";

import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ModeToggle } from "~/components/ui/ModeToggle";

export default function TopNav() {
  const { theme } = useTheme();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="flex space-x-8">
        <a href="/jebyaa">Jebyaa</a>
        <a href="/inquiry">Inquiry</a>
        <a href="/summary ">Summary</a>
      </div>
      <div>
        <ModeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}
