import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up', // 'fade-up', 'fade-down', 'slide-left', 'slide-right', 'zoom-in', 'pop'
  delay = 0,
  duration = 700,
  threshold = 0.15,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-12 scale-[0.98]';
        case 'fade-down':
          return 'opacity-0 -translate-y-12 scale-[0.98]';
        case 'slide-left':
          return 'opacity-0 -translate-x-14';
        case 'slide-right':
          return 'opacity-0 translate-x-14';
        case 'zoom-in':
          return 'opacity-0 scale-90 translate-y-6';
        case 'pop':
          return 'opacity-0 scale-75';
        default:
          return 'opacity-0 translate-y-10';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${getAnimationStyles()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
