import { useEffect, useRef } from 'react';
import { trackEvent } from './useAnalytics';

/**
 * Observa quando a seção de preços entra na viewport e registra o evento.
 * Dispara apenas uma vez por sessão.
 */
export function usePricingObserver(sectionId = 'precos') {
  const tracked = useRef(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el || tracked.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent('pricing_secao_visualizada');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId]);
}
