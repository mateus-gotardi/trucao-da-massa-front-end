"use client";
import { Inter } from "@next/font/google";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

const H1 = styled.h1`
  color: red;
`;

export default function Home() {
  return (
    <main>
      <H1 className={inter.className}>Hello World</H1>
    </main>
  );
}
