import { CheckCircle, XCircle, Zap, Target } from './Icons';
import { usePrismHighlight } from '../hooks/usePrismHighlight';
import PropTypes from 'prop-types';
import SlideLayout from './SlideLayout';
import SlideCard from './SlideCard';
import CodeBlock from './CodeBlock';
import { slideStyles, combineClasses } from './slideStyles';

const SlideRenderer = ({ slide }) => {
  usePrismHighlight();

  if (slide.type === 'title') {
    return (
      <SlideLayout>
        <div className={slideStyles.container.maxW4xl}>
          <div className="mb-8">
            <h1 className={slideStyles.title.large}>
              {slide.title}
            </h1>
            <h2 className={slideStyles.title.subtitle}>
              {slide.subtitle}
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-300 font-medium">
              {slide.description}
            </p>
            <p className="text-base md:text-lg text-gray-400">
              {slide.author}
            </p>
            <p className="text-sm md:text-base text-gray-500">
              {slide.date}
            </p>
          </div>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'problem') {
    return (
      <SlideLayout variant="problem">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <SlideCard variant="red" title={slide.content.current.title} titleIcon={<XCircle />}>
              <ul className={slideStyles.list.base}>
                {slide.content.current.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>

            <SlideCard variant="emerald" title={slide.content.needed.title} titleIcon={<CheckCircle />}>
              <ul className={slideStyles.list.base}>
                {slide.content.needed.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>
          </div>

          <div className={combineClasses(slideStyles.card.base, slideStyles.card.gradient.redOrange)}>
            <h3 className={combineClasses(slideStyles.title.sectionTitle, slideStyles.text.accent.orange, 'mb-4 flex items-center gap-2')}>
              <Target />
              {slide.content.cost.title}
            </h3>
            <ul className={slideStyles.list.base}>
              {slide.content.cost.items.map((item, idx) => (
                <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                  <span className={combineClasses(slideStyles.text.accent.orange, slideStyles.list.bullet)}>•</span>
                  {typeof item === 'string' ? (
                    <span>{item}</span>
                  ) : (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-orange-400 underline decoration-orange-600/30 hover:decoration-orange-400 transition-colors"
                    >
                      {item.text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'levels') {
    return (
      <SlideLayout variant="levels">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          
          <div className="space-y-6 mb-8">
            {slide.content.levels.map((level, idx) => (
              <SlideCard key={idx} variant="slate">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${slideStyles.badge.medium} bg-gradient-to-r ${level.color}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className={combineClasses(slideStyles.title.sectionTitle, slideStyles.text.primary)}>{level.level}</h3>
                    <p className={slideStyles.text.muted}>{level.subtitle}</p>
                  </div>
                </div>
                <div className={combineClasses('space-y-2', slideStyles.text.secondary)}>
                  <p><span className={combineClasses(slideStyles.text.accent.blue, 'font-medium')}>Use Case:</span> {level.useCase}</p>
                  <p><span className={combineClasses(slideStyles.text.accent.green, 'font-medium')}>Grader:</span> {level.grader}</p>
                  <p><span className={combineClasses(slideStyles.text.accent.purple, 'font-medium')}>Example:</span> {level.example}</p>
                </div>
              </SlideCard>
            ))}
          </div>

          <div className={combineClasses(slideStyles.card.base, slideStyles.card.gradient.purpleBlue, 'text-center')}>
            <p className="text-lg font-medium text-purple-300 flex items-center justify-center gap-2">
              <Zap />
              Key Insight: {slide.content.insight}
            </p>
          </div>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'example') {
    return (
      <SlideLayout variant="example">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-xl text-gray-400 mb-8 text-center">{slide.subtitle}</p>
          )}
          
          {slide.content.challenge && (
            <SlideCard variant="blue" className="mb-8">
              <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.blue, 'mb-2')}>The Challenge</h3>
              <p className={slideStyles.text.secondary}>{slide.content.challenge}</p>
            </SlideCard>
          )}

          {slide.content.whyCustom && (
            <SlideCard variant="purple" className="mb-8">
              <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.purple, 'mb-3')}>{slide.content.whyCustom.title}</h3>
              <ul className="space-y-2">
                {slide.content.whyCustom.items.map((item, idx) => (
                  <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                    <span className={combineClasses(slideStyles.text.accent.purple, slideStyles.list.bullet)}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>
          )}

          <div className="space-y-6">
            {slide.content.initial && (
              <SlideCard variant="red">
                <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.red, 'mb-3')}>{slide.content.initial.title}</h3>
                <CodeBlock code={slide.content.initial.code} className="mb-4" />
                <div className="flex items-center gap-3 mb-3">
                  <span className={combineClasses(slideStyles.text.accent.red, 'font-medium')}>Result:</span>
                  <span className="text-white font-semibold">{slide.content.initial.result}</span>
                </div>
                {slide.content.initial.problems && (
                  <ul className="space-y-1">
                    {slide.content.initial.problems.map((problem, idx) => (
                      <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                        <span className={combineClasses(slideStyles.text.accent.red, slideStyles.list.bullet)}>•</span>
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </SlideCard>
            )}

            {slide.content.improved && (
              <SlideCard variant="emerald">
                <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.emerald, 'mb-3')}>{slide.content.improved.title}</h3>
                <CodeBlock code={slide.content.improved.code} className="mb-4" />
                <div className="flex items-center gap-3">
                  <span className={combineClasses(slideStyles.text.accent.emerald, 'font-medium')}>Result:</span>
                  <span className="text-white font-semibold">{slide.content.improved.result}</span>
                </div>
              </SlideCard>
            )}

            {slide.content.approach && (
              <SlideCard variant="emerald">
                <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.emerald, 'mb-3')}>{slide.content.approach.title}</h3>
                <CodeBlock code={slide.content.approach.code} className="mb-4" />
                <div className="flex items-center gap-3">
                  <span className={combineClasses(slideStyles.text.accent.emerald, 'font-medium')}>Result:</span>
                  <span className="text-white font-semibold">{slide.content.approach.result}</span>
                </div>
              </SlideCard>
            )}
          </div>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'code') {
    return (
      <SlideLayout variant="code">
        <div className={slideStyles.container.maxW7xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          
          <SlideCard variant="slate">
            <CodeBlock 
              code={slide.content.code} 
              title="Python Code Example" 
              variant="large"
            />
          </SlideCard>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'case_study') {
    return (
      <SlideLayout variant="caseStudy">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          
          <SlideCard variant="yellow" className="mb-8">
            <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.yellow, 'mb-2')}>Challenge</h3>
            <p className={slideStyles.text.secondary}>{slide.content.challenge}</p>
          </SlideCard>

          <SlideCard variant="slate">
            <h3 className={combineClasses(slideStyles.title.sectionTitle, slideStyles.text.accent.blue, 'mb-4')}>{slide.content.evolution.title}</h3>
            <div className="space-y-3">
              {slide.content.evolution.steps.map((step, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl">
                  <span className="text-white font-medium">{step.stage}</span>
                  <span className={combineClasses(slideStyles.text.accent.green, 'font-bold text-lg')}>{step.accuracy}</span>
                  <span className="text-gray-400 text-sm">{step.note}</span>
                </div>
              ))}
            </div>
          </SlideCard>

          <div className={combineClasses(slideStyles.card.base, slideStyles.card.gradient.purpleBlue, 'mt-8 text-center')}>
            <p className="text-lg font-medium text-purple-300 flex items-center justify-center gap-2">
              <Zap />
              Key Insight: {slide.content.insight}
            </p>
          </div>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'process') {
    return (
      <SlideLayout variant="process">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-xl text-gray-400 mb-8 text-center">{slide.subtitle}</p>
          )}
          
          <SlideCard variant="slate" className="mb-8">
            <div className="grid gap-3">
              {slide.content.cycle.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-slate-900/30 rounded-xl">
                  <div className={combineClasses(slideStyles.badge.small, slideStyles.badge.gradient.greenBlue)}>
                    {idx + 1}
                  </div>
                  <span className={slideStyles.text.secondary}>{step}</span>
                </div>
              ))}
            </div>
          </SlideCard>

          {slide.content.realExample && (
            <SlideCard variant="emerald">
              <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.emerald, 'mb-3')}>{slide.content.realExample.title}</h3>
              <p className="text-white font-semibold mb-4">{slide.content.realExample.case}</p>
              <ul className="space-y-2">
                {slide.content.realExample.discoveries.map((discovery, idx) => (
                  <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                    <span className={combineClasses(slideStyles.text.accent.emerald, slideStyles.list.bullet)}>•</span>
                    <span>{discovery}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>
          )}

          {slide.content.warnings && (
            <SlideCard variant="amber">
              <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.amber, 'mb-3')}>{slide.content.warnings.title}</h3>
              <ul className="space-y-2">
                {slide.content.warnings.points.map((point, idx) => (
                  <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                    <span className={combineClasses(slideStyles.text.accent.amber, slideStyles.list.bullet)}>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>
          )}
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'best_practices') {
    return (
      <SlideLayout variant="bestPractices">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          
          <div className="space-y-6">
            {slide.content.practices.map((practice, idx) => (
              <SlideCard key={idx} variant="slate">
                <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.purple, 'mb-2')}>{practice.title}</h3>
                <p className={slideStyles.text.secondary}>{practice.desc}</p>
              </SlideCard>
            ))}
          </div>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'getting_started') {
    return (
      <SlideLayout variant="gettingStarted">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          
          <SlideCard variant="slate" className="mb-8">
            <div className="space-y-6">
              {slide.content.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={combineClasses(slideStyles.badge.small, slideStyles.badge.gradient.cyanBlue, 'flex-shrink-0')}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.cyan, 'mb-2')}>{step.step}</h3>
                    {step.code && (
                      <CodeBlock code={step.code} language="bash" className="mb-2" />
                    )}
                    {step.desc && (
                      <p className={slideStyles.text.secondary}>{step.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SlideCard>

          <SlideCard variant="blue">
            <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.blue, 'mb-4')}>Resources</h3>
            <ul className="space-y-2">
              {slide.content.resources.map((resource, idx) => (
                <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                  <span className={combineClasses(slideStyles.text.accent.blue, slideStyles.list.bullet)}>•</span>
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </SlideCard>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'takeaways') {
    return (
      <SlideLayout variant="takeaways">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          
          <div className="space-y-4 mb-8">
            {slide.content.points.map((point, idx) => (
              <SlideCard key={idx} variant="slate">
                <div className="flex items-start gap-3">
                  <div className={combineClasses(slideStyles.badge.small, slideStyles.badge.gradient.orangeRed, 'flex-shrink-0')}>
                    {idx + 1}
                  </div>
                  <p className={slideStyles.text.secondary}>{point}</p>
                </div>
              </SlideCard>
            ))}
          </div>

          <SlideCard variant="slate">
            <CodeBlock 
              code={slide.content.actionCode} 
              title="Call to Action" 
              variant="large"
            />
          </SlideCard>
        </div>
      </SlideLayout>
    );
  }

  if (slide.type === 'future') {
    return (
      <SlideLayout variant="default">
        <div className={slideStyles.container.maxW4xl}>
          <h1 className={slideStyles.title.main}>
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-xl text-gray-400 mb-8 text-center">{slide.subtitle}</p>
          )}
          
          <div className="grid gap-6">
            <SlideCard variant="blue">
              <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.cyan, 'mb-4')}>{slide.content.integrations.title}</h3>
              <ul className="space-y-2">
                {slide.content.integrations.items.map((item, idx) => (
                  <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                    <span className={combineClasses(slideStyles.text.accent.cyan, slideStyles.list.bullet)}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>

            <SlideCard variant="purple">
              <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.purple, 'mb-4')}>{slide.content.advanced.title}</h3>
              <ul className="space-y-2">
                {slide.content.advanced.items.map((item, idx) => (
                  <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                    <span className={combineClasses(slideStyles.text.accent.purple, slideStyles.list.bullet)}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>

            <SlideCard variant="blue">
              <h3 className={combineClasses(slideStyles.title.subsectionTitle, slideStyles.text.accent.blue, 'mb-4')}>{slide.content.ecosystem.title}</h3>
              <ul className="space-y-2">
                {slide.content.ecosystem.items.map((item, idx) => (
                  <li key={idx} className={combineClasses(slideStyles.list.item, slideStyles.text.secondary)}>
                    <span className={combineClasses(slideStyles.text.accent.blue, slideStyles.list.bullet)}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SlideCard>
          </div>

          {slide.content.vision && (
            <div className={combineClasses(slideStyles.card.base, slideStyles.card.gradient.purpleBlue, 'mt-8 text-center')}>
              <p className="text-lg font-medium text-purple-300 flex items-center justify-center gap-2">
                <Zap />
                {slide.content.vision}
              </p>
            </div>
          )}
        </div>
      </SlideLayout>
    );
  }

  return (
    <SlideLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Slide {slide.id}</h1>
        <p className="text-xl text-gray-400">Content not yet implemented</p>
      </div>
    </SlideLayout>
  );
};

SlideRenderer.propTypes = {
  slide: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.object
  }).isRequired
};

export default SlideRenderer;