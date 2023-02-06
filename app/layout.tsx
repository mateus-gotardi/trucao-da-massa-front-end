"use client";
import StyledComponentsRegistry from "lib/registry";
import { GlobalStyle } from "styles/global";
import { Body } from "styles/layout";
import Head from "./head";

import { Roboto_Slab } from "@next/font/google";

const Roboto = Roboto_Slab({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <Head />
      <StyledComponentsRegistry>
        <GlobalStyle />
        <Body>

          <header>Header</header>
          <main>
            <aside>SIDEBAR</aside>
            <section className={Roboto.className}>{children}</section>
          </main>
          <footer>Footer</footer>
        </Body>
      </StyledComponentsRegistry>
    </html>
  );
}
