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
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import HumanComparison from './components/HumanComparison';
import PrivacyNotice from './components/PrivacyNotice';
import CookieConsent from './components/CookieConsent';
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
        <HumanComparison />
        <PainPoints />
        <Anatomy />
        <BeforeAfter />
        <ContactForm />
        <Differentials />
        <Pricing />
      </main>
      <Footer />
      <PrivacyNotice />
      <CookieConsent />
    </>
  );
}
