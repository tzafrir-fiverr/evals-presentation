import PropTypes from 'prop-types';
import { ChevronUp, ChevronDown } from './Icons';

function NavigationControls({ currentSlide, totalSlides, onPrev, onNext }) {
  return (
    <div className="fixed top-8 right-8 z-50 flex flex-col gap-2">
      <button
        onClick={onPrev}
        disabled={currentSlide === 0}
        className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronUp />
      </button>
      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronDown />
      </button>
    </div>
  );
}

NavigationControls.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  totalSlides: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default NavigationControls;