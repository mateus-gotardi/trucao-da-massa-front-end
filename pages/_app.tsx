import type { AppProps } from "next/app";
import { GlobalStyle } from "styles/global";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      
        <Component {...pageProps} />
      
    </>
  );
}
