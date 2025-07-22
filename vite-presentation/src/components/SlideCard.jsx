import PropTypes from 'prop-types';
import { slideStyles, combineClasses } from './slideStyles';

function SlideCard({ variant = 'slate', title, titleIcon, children, className = '' }) {
  const cardClass = slideStyles.card[variant] || slideStyles.card.slate;
  const titleColorClass = slideStyles.text.accent[variant] || slideStyles.text.primary;
  
  return (
    <div className={combineClasses(slideStyles.card.base, cardClass, className)}>
      {title && (
        <h3 className={combineClasses(slideStyles.title.subsectionTitle, titleColorClass, 'mb-3', titleIcon && 'flex items-center gap-2')}>
          {titleIcon}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

SlideCard.propTypes = {
  variant: PropTypes.oneOf(['red', 'emerald', 'blue', 'purple', 'yellow', 'orange', 'slate']),
  title: PropTypes.string,
  titleIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default SlideCard;