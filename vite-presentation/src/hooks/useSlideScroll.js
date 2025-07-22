import { useState, useEffect, useRef, useCallback } from 'react';

function useSlideScroll(slides) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);

  const scrollToSlide = useCallback((index) => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentSlide(index);

    const container = containerRef.current;
    const slideElement = document.getElementById(`slide-${index}`);
    
    if (slideElement && container) {
      // Temporarily disable snap scrolling for smooth animation
      container.classList.add('scrolling');
      
      // Use a more controlled scroll animation
      const targetScrollTop = slideElement.offsetTop;
      const startScrollTop = container.scrollTop;
      const distance = targetScrollTop - startScrollTop;
      const duration = 300; // ms - faster animation
      let start = null;

      const animateScroll = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function - ease-out-quart for snappy feel
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        container.scrollTop = startScrollTop + (distance * easeOutQuart);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // Re-enable snap scrolling after animation
          container.classList.remove('scrolling');
          setIsScrolling(false);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  }, [isScrolling]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  }, [currentSlide, slides.length, scrollToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  }, [currentSlide, scrollToSlide]);

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      if (isScrolling || !containerRef.current) return;

      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Debounce scroll handling
      scrollTimeout = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const containerHeight = container.clientHeight;
        const scrollTop = container.scrollTop;

        let newCurrentSlide = 0;
        let maxVisibleArea = 0;

        slides.forEach((_, idx) => {
          const slideElement = document.getElementById(`slide-${idx}`);
          if (slideElement) {
            const slideTop = slideElement.offsetTop;
            const slideBottom = slideTop + slideElement.offsetHeight;

            const visibleTop = Math.max(slideTop, scrollTop);
            const visibleBottom = Math.min(slideBottom, scrollTop + containerHeight);
            const visibleArea = Math.max(0, visibleBottom - visibleTop);

            if (visibleArea > maxVisibleArea) {
              maxVisibleArea = visibleArea;
              newCurrentSlide = idx;
            }
          }
        });

        if (newCurrentSlide !== currentSlide) {
          setCurrentSlide(newCurrentSlide);
        }
      }, 10); // 10ms debounce - minimal delay
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        clearTimeout(scrollTimeout);
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [currentSlide, isScrolling, slides]);

  return {
    currentSlide,
    containerRef,
    scrollToSlide,
    nextSlide,
    prevSlide
  };
}

export default useSlideScroll;