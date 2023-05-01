import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  );
}
