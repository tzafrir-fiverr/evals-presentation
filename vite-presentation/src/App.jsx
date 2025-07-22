import { useState } from 'react';
import { PresentationProvider, usePresentationContext } from './contexts/PresentationContext';
import NavigationControls from './components/NavigationControls';
import SlideIndicator from './components/SlideIndicator';
import SlideRenderer from './components/SlideRenderer';
import PresentationInstructions from './components/PresentationInstructions';
import { slides } from './data/slides';
import { speakerNotes } from './data/notes2';
import PropTypes from 'prop-types';

function PresentationContent() {
  const {
    slides,
    currentSlide,
    containerRef,
    scrollToSlide,
    nextSlide,
    prevSlide
  } = usePresentationContext();
  
  const [showNotes, setShowNotes] = useState(false);
  const currentSlideData = slides[currentSlide];
  const notes = currentSlideData ? speakerNotes[currentSlideData.id] : null;

  const RenderNoteValue = ({ value }) => {
    if (typeof value === 'string' || typeof value === 'number' || value === null) {
      return <span className="text-gray-300">{value}</span>;
    } else if (Array.isArray(value)) {
      return (
        <ul className="mt-1 space-y-1 list-disc pl-5">
          {value.map((item, i) => (
            <li key={i} className="text-gray-300">
              <RenderNoteValue value={item} />
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object') {
      return (
        <div className="space-y-2 ml-4">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="border-l-2 border-cyan-500/30 pl-2">
              <span className="font-medium text-cyan-200">{k}:</span>
              <RenderNoteValue value={v} />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  RenderNoteValue.propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object
    ])
  };

  return (
    <div className="bg-slate-900 text-white font-sans">
      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={prevSlide}
        onNext={nextSlide}
      />

      <SlideIndicator
        slides={slides}
        currentSlide={currentSlide}
        onSlideClick={scrollToSlide}
      />

      <div ref={containerRef} className="snap-y snap-mandatory overflow-y-auto h-screen scroll-container">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            id={`slide-${idx}`}
            className="snap-start w-full slide-container"
          >
            <SlideRenderer slide={slide} />
          </div>
        ))}
      </div>

      <PresentationInstructions />
      
      {/* Notes Button */}
      {notes && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl shadow-2xl shadow-purple-500/30 transition-all duration-300 ease-in-out hover:shadow-purple-500/50 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-400/50`}
          aria-label={showNotes ? "Hide speaker notes" : "Show speaker notes"}
        >
          <span className={`relative inline-block transition-transform duration-300 ${showNotes ? "rotate-90" : ""}`}>
            {showNotes ? '✕' : '📝'}
          </span>
        </button>
      )}

      {/* Notes Panel */}
      <div
        className={`fixed top-0 right-0 h-full z-40 bg-slate-900/95 backdrop-blur-xl border-l border-purple-500/20 transition-all duration-500 ease-in-out overflow-hidden ${showNotes ? "w-96 shadow-2xl shadow-purple-500/20" : "w-0"}`}
      >
        {showNotes && notes && (
          <div className="h-full overflow-y-auto p-6 animate-fadeIn">
            {/* Notes Header */}
            <div className="mb-6 pb-4 border-b border-purple-500/20">
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Speaker Notes
              </h3>
              <p className="text-sm text-gray-400">
                {notes.title}
              </p>
            </div>

            {/* TLDR Section */}
            {notes.tldr && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wider">
                  Key Points
                </h4>
                <ul className="space-y-2">
                  {notes.tldr.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Points */}
            {notes.mainPoints && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-blue-300 mb-2 uppercase tracking-wider">
                  Main Points
                </h4>
                <div className="space-y-3">
                  {notes.mainPoints.map((point, idx) => (
                    <div key={idx} className="text-sm text-gray-300 pl-4 border-l-2 border-blue-500/30">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Details */}
            {notes.technicalDetails && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-green-300 mb-2 uppercase tracking-wider">
                  Technical Details
                </h4>
                <div className="space-y-2">
                  {notes.technicalDetails.map((detail, idx) => (
                    <div key={idx} className="text-sm text-gray-300 bg-slate-800/50 p-2 rounded">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other note sections based on slide type */}
            {Object.entries(notes).map(([key, value]) => {
              // Skip already rendered sections and non-array/object values
              if (['title', 'tldr', 'mainPoints', 'technicalDetails', 'transitionNote'].includes(key) || 
                  typeof value === 'string' || 
                  !value) {
                return null;
              }

              // Format the key for display
              const displayKey = key.replace(/([A-Z])/g, ' $1').trim();

              return (
                <div key={key} className="mb-6">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-2 uppercase tracking-wider">
                    {displayKey}
                  </h4>
                  <div className="text-sm text-gray-300">
                    <RenderNoteValue value={value} />
                  </div>
                </div>
              );
            })}

            {/* Transition Note */}
            {notes.transitionNote && (
              <div className="mt-8 pt-4 border-t border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wider">
                  Transition
                </h4>
                <p className="text-sm text-gray-300 italic">
                  &ldquo;{notes.transitionNote}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <PresentationProvider slides={slides}>
      <PresentationContent />
    </PresentationProvider>
  );
}

export default App;