import { useEffect, useRef } from 'react';

export default function MascotRobot({ className = '' }) {
  const mascotRef = useRef(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return undefined;

    let animationFrame = null;
    const current = { eyeX: 0, eyeY: 0, headX: 0, headY: 0, headTilt: 0 };
    const target = { eyeX: 0, eyeY: 0, headX: 0, headY: 0, headTilt: 0 };

    function renderLook() {
      current.eyeX += (target.eyeX - current.eyeX) * 0.34;
      current.eyeY += (target.eyeY - current.eyeY) * 0.34;
      current.headX += (target.headX - current.headX) * 0.2;
      current.headY += (target.headY - current.headY) * 0.2;
      current.headTilt += (target.headTilt - current.headTilt) * 0.18;

      mascot.style.setProperty('--look-x', `${current.eyeX.toFixed(2)}px`);
      mascot.style.setProperty('--look-y', `${current.eyeY.toFixed(2)}px`);
      mascot.style.setProperty('--head-x', `${current.headX.toFixed(2)}px`);
      mascot.style.setProperty('--head-y', `${current.headY.toFixed(2)}px`);
      mascot.style.setProperty('--head-tilt', `${current.headTilt.toFixed(2)}deg`);
      animationFrame = window.requestAnimationFrame(renderLook);
    }

    function handleMouseMove(event) {
      const rect = mascot.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      target.eyeX = Math.max(-15, Math.min(15, (event.clientX - centerX) / 18));
      target.eyeY = Math.max(-10, Math.min(10, (event.clientY - centerY) / 20));
      target.headX = target.eyeX * 0.38;
      target.headY = target.eyeY * 0.62 + Math.max(0, target.eyeY) * 0.28;
      target.headTilt = Math.max(-1.2, Math.min(2.8, target.eyeY * 0.22));
    }

    function resetLook() {
      target.eyeX = 0;
      target.eyeY = 0;
      target.headX = 0;
      target.headY = 0;
      target.headTilt = 0;
    }

    renderLook();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', resetLook);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', resetLook);
    };
  }, []);

  return (
    <div className={`mascot-robot ${className}`} ref={mascotRef} aria-hidden="true">
      <svg className="robot-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <rect className="robot-body" x="100" y="140" width="100" height="80" rx="40" />
        <g className="robot-chest-logo" transform="translate(156 160) scale(0.036)">
          <path d="M150 475V375C150 225 283 225 350 325L450 475C517 575 650 575 650 475V375C650 225 517 225 450 325L350 475C283 575 150 575 150 475Z" />
          <path d="M359 338.5L441 461.5" />
        </g>
        <rect className="robot-neck" x="140" y="130" width="20" height="20" />
        <g className="robot-head">
          <rect className="robot-face" x="80" y="50" width="140" height="100" rx="50" />
          <rect className="robot-visor" x="100" y="80" width="100" height="40" rx="20" />
          <g className="robot-eyes">
            <rect className="robot-eye" x="119" y="94" width="22" height="10" rx="5" />
            <rect className="robot-eye" x="159" y="94" width="22" height="10" rx="5" />
          </g>
        </g>
        <circle className="robot-hand" cx="60" cy="180" r="15">
          <animate attributeName="cy" values="180;190;180" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle className="robot-hand" cx="240" cy="180" r="15">
          <animate attributeName="cy" values="180;170;180" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
