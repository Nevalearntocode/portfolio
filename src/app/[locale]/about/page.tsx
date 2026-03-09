import type { Metadata } from "next";
import "./about-room.css";
import { AboutRoom } from "@/components/about-room/AboutRoom";
import data from "@/data/about-room.json";
import type { AboutCategory } from "@/types/about-room";

export const metadata: Metadata = {
  title: "About — The Room",
  description: "A personal archive of games, creators, food, and tools I care about.",
};

export default function AboutPage() {
  return <AboutRoom categories={data.categories as AboutCategory[]} />;
}
