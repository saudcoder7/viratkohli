import type { Metadata } from "next";
import FormatStoryTimeline from "@/components/FormatStoryTimeline";
import { ODI_MOMENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ODI Cricket Timeline — Virat Kohli | The Journey",
  description:
    "A full-screen story mode presenting Virat Kohli's complete ODI career arc from debut in Dambulla (2008) to present. 16 defining milestones.",
};

export default function ODIPage() {
  return <FormatStoryTimeline format="odi" moments={ODI_MOMENTS} />;
}
