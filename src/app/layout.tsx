import { cookies } from "next/headers";
import "~/styles/globals.css";

import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";

import { Permanent_Marker } from 'next/font/google';

  const permanentMarker = Permanent_Marker({
      weight: '400',
      subsets: ["latin"],
  });


export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className="h-full">
      <body className={`${permanentMarker.className} h-full relative`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Header session={session ? true : false} />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
