import PropTypes from 'prop-types';

function SlideIndicator({ slides, currentSlide, onSlideClick }) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSlideClick(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide
                ? 'bg-blue-400 scale-125'
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

SlideIndicator.propTypes = {
  slides: PropTypes.array.isRequired,
  currentSlide: PropTypes.number.isRequired,
  onSlideClick: PropTypes.func.isRequired
};

export default SlideIndicator;