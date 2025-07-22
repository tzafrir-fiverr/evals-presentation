import PropTypes from 'prop-types';

// Configurable padding for slides
const SLIDE_BOTTOM_PADDING = 240; // pixels - prevents accidental slide changes
const SLIDE_PADDING = 32; // pixels

const gradientClasses = {
  default: 'from-slate-900 via-purple-900 to-slate-900',
  problem: 'from-slate-900 via-red-900/20 to-slate-900',
  levels: 'from-slate-900 via-blue-900/20 to-slate-900',
  example: 'from-slate-900 via-green-900/20 to-slate-900',
  code: 'from-slate-900 via-indigo-900/20 to-slate-900',
  caseStudy: 'from-slate-900 via-yellow-900/20 to-slate-900',
  process: 'from-slate-900 via-green-900/20 to-slate-900',
  bestPractices: 'from-slate-900 via-purple-900/20 to-slate-900',
  gettingStarted: 'from-slate-900 via-cyan-900/20 to-slate-900',
  takeaways: 'from-slate-900 via-orange-900/20 to-slate-900'
};

function SlideLayout({ variant = 'default', children, className = '' }) {
  const gradientClass = gradientClasses[variant] || gradientClasses.default;
  
  return (
    <div 
      className={`min-h-screen flex flex-col justify-center px-6 bg-gradient-to-br ${gradientClass} ${className}`}
      style={{ 
        padding: `${SLIDE_PADDING}px`, 
        paddingBottom: `${SLIDE_BOTTOM_PADDING}px` 
      }}
    >
      {children}
    </div>
  );
}

SlideLayout.propTypes = {
  variant: PropTypes.oneOf(Object.keys(gradientClasses)),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default SlideLayout;