import type { Metadata } from "next";
import FormatStoryTimeline from "@/components/FormatStoryTimeline";
import { IPL_MOMENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "IPL Cricket Timeline — Virat Kohli | The Journey",
  description:
    "A full-screen story mode presenting Virat Kohli's 18-year RCB journey from 2008 to back-to-back championships in 2025 and 2026. 12 defining milestones.",
};

export default function IPLPage() {
  return <FormatStoryTimeline format="ipl" moments={IPL_MOMENTS} />;
}
