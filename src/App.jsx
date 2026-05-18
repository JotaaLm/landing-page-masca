import { useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { usePricingObserver } from './hooks/usePricingObserver';
import { initPageViewTracking } from './hooks/useAnalytics';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import BeforeAfter from './components/BeforeAfter';
import Anatomy from './components/Anatomy';
import Differentials from './components/Differentials';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import ComparisonTable from './components/ComparisonTable';
import HumanComparison from './components/HumanComparison';
import Footer from './components/Footer';

export default function App() {
  useScrollReveal();
  usePricingObserver();

  useEffect(() => {
    initPageViewTracking();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Anatomy />
        <BeforeAfter />
        <Differentials />
        <SocialProof />
        <ComparisonTable />
        <HumanComparison />
        <ContactForm />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
