import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GeistSans } from "geist/font/sans";
import TopNav from "./_components/TopNav";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { Toaster } from "~/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className={`${GeistSans.variable} felx flex-col gap-4`}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system">
            <TopNav /> {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

export const metadata = {
  title: "Blue Line",
  description: "Blue Line",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
