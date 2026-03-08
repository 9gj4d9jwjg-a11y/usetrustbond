import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { WhyEssential } from './sections/WhyEssential';
import { ImpactMetrics } from './sections/ImpactMetrics';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonial } from './sections/Testimonial';
import { DonationValues } from './sections/DonationValues';
import { Transparency } from './sections/Transparency';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-green">
      <Navigation />
      <main>
        <Hero />
        <WhyEssential />
        <ImpactMetrics />
        <HowItWorks />
        <Testimonial />
        <DonationValues />
        <Transparency />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
