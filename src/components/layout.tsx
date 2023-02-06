import { Body } from "styles/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Body>
      <header>Header</header>
      <main>
        <aside>SIDEBAR</aside>
        <section>{children}</section>
      </main>
      <footer>Footer</footer>
    </Body>
  );
}
