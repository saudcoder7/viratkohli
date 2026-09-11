import Navigation from "@/components/Navigation";
import CursorGlow from "@/components/CursorGlow";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import StatsWidget from "@/components/StatsWidget";
import AwardsWall from "@/components/AwardsWall";
import Gallery from "@/components/Gallery";
import FanZone from "@/components/FanZone";
import Footer from "@/components/Footer";
import { FormatProvider } from "@/lib/FormatContext";

export default function Home() {
  return (
    <FormatProvider>
      <CursorGlow />
      <Navigation />

      <main>
        {/* Hero */}
        <Hero />

        {/* Career Highlights */}
        <Highlights />

        {/* Format Stats & Achievements */}
        <StatsWidget />

        {/* Awards */}
        <AwardsWall />

        {/* Gallery */}
        <Gallery />

        {/* Fan Zone */}
        <FanZone />
      </main>

      <Footer />
    </FormatProvider>
  );
}
