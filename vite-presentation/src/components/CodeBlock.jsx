import PropTypes from 'prop-types';
import { Code } from './Icons';
import { slideStyles, combineClasses } from './slideStyles';

function CodeBlock({ code, language = 'python', title, variant = 'default', className = '' }) {
  const wrapperClass = variant === 'large' ? slideStyles.codeBlock.wrapperLarge : slideStyles.codeBlock.wrapper;
  
  return (
    <>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <Code />
          <span className={slideStyles.text.accent.green + ' font-medium'}>{title}</span>
        </div>
      )}
      <div className={combineClasses(wrapperClass, className)}>
        <pre className={slideStyles.codeBlock.code}>
          <code className={`language-${language} text-sm${language === 'python' ? ' whitespace-pre-wrap' : ''}`}>
            {code}
          </code>
        </pre>
      </div>
    </>
  );
}

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'large']),
  className: PropTypes.string
};

export default CodeBlock;