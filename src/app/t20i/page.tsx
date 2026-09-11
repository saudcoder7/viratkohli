import type { Metadata } from "next";
import FormatStoryTimeline from "@/components/FormatStoryTimeline";
import { T20I_MOMENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "T20I Cricket Timeline — Virat Kohli | The Journey",
  description:
    "A full-screen story mode presenting Virat Kohli's complete T20I career arc from debut in Harare (2010) to World Cup triumph & retirement (2024). 11 defining milestones.",
};

export default function T20IPage() {
  return <FormatStoryTimeline format="t20i" moments={T20I_MOMENTS} />;
}
