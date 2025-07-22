import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useSlideScroll from '../hooks/useSlideScroll';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

const PresentationContext = createContext();

export function usePresentationContext() {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentationContext must be used within PresentationProvider');
  }
  return context;
}

export function PresentationProvider({ children, slides }) {
  const {
    currentSlide,
    containerRef,
    scrollToSlide,
    nextSlide,
    prevSlide
  } = useSlideScroll(slides);

  useKeyboardNavigation(nextSlide, prevSlide);

  const value = {
    slides,
    currentSlide,
    containerRef,
    scrollToSlide,
    nextSlide,
    prevSlide
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}

PresentationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  slides: PropTypes.array.isRequired
};