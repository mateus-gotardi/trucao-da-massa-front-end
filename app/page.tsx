"use client";
import { Card } from "@/components";
import { ITrucoCard } from "utils/interfaces";

export default function Home() {
  const sampleCard: ITrucoCard = {
    value: "Q",
    suit: "ouros",
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Card card={sampleCard} />
      <Card card={{ value: "4", suit: "copas" }} />
      <Card card={{ value: "5", suit: "espadas" }} />
      <Card card={{ value: "6", suit: "paus" }} />
      <Card card={{ value: "7", suit: "ouros" }} />
      <Card card={{ value: "Q", suit: "copas" }} />
      <Card card={{ value: "J", suit: "copas" }} />
      <Card card={{ value: "K", suit: "copas" }} />
    </div>
  );
}
