"use client";
import StyledComponentsRegistry from "lib/registry";
import { GlobalStyle } from "styles/global";
import { Body } from "styles/layout";
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <Head />
      <StyledComponentsRegistry>
        <Body>
          <GlobalStyle />
          <header>Header</header>
          <main>
            <aside>SIDEBAR</aside>
            <section>{children}</section>
          </main>
          <footer>Footer</footer>
        </Body>
      </StyledComponentsRegistry>
    </html>
  );
}
