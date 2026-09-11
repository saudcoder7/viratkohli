import type { Metadata } from "next";
import FormatStoryTimeline from "@/components/FormatStoryTimeline";
import { TEST_MOMENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Test Cricket Timeline — Virat Kohli | The Journey",
  description:
    "A full-screen story mode presenting Virat Kohli's complete Test career arc from debut in Kingston (2011) to retirement (2025). 16 defining milestones.",
};

export default function TestPage() {
  return <FormatStoryTimeline format="test" moments={TEST_MOMENTS} />;
}
