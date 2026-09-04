'use client';

import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import RulesSection from '../components/sections/RulesSection';
import TopicsSection from '../components/sections/TopicsSection';
import RewardsSection from '../components/sections/RewardsSection';
import CtaSection from '../components/sections/CtaSection';
// import LiveQuizSection from '../components/sections/LiveQuizSection';
import Footer from '../components/ui/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      {/* <RulesSection /> */}
      {/* <TopicsSection /> */}
      <RewardsSection />
      {/* <LiveQuizSection /> */}
      <Footer />
    </main>
  );
}
