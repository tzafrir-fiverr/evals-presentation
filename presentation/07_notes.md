# Slide 7: Speaker Notes

## TLDR
- Complete working example of model-as-judge evaluation
- Shows rubric design with concrete examples
- Demonstrates handling context in test data

## In-Depth Knowledge

### Code Architecture Deep Dive

**Schema Design Decisions**:
1. `message`: The content to moderate
2. `should_allow`: Ground truth (boolean)
3. `context`: Critical for accurate evaluation

**Why Context Matters**:
- Same words, different meanings
- Platform-specific norms
- User intent indicators

### Rubric Engineering

**Structure**:
1. Clear role definition
2. Success criteria
3. Concrete examples
4. Binary output requirement

**Key Phrases**:
- "You are evaluating..." - Sets judge role
- "The system should..." - Defines good behavior
- "Examples of CORRECT..." - Reduces ambiguity
- "Respond with only..." - Enforces format

### Test Data Strategy

**Categories to Include**:
1. **Clear Violations**: Obvious hate speech, threats
2. **Clear Allowed**: Normal conversations
3. **Technical Terms**: kill, inject, hack, crash
4. **Medical/Health**: drugs, symptoms, treatments
5. **Financial**: fraud (educational), scams
6. **Edge Cases**: Sarcasm, quotes, fiction

**Data Collection Methods**:
1. Production false positives
2. Adversarial examples
3. Domain-specific terminology
4. Cultural variations

### Advanced Techniques

**Multi-Criteria Evaluation**:
```python
testing_criteria=[
    {...},  # Correctness
    {...},  # Explanation quality
    {...},  # Response time
]
```

**Weighted Scoring**:
- False positives vs false negatives
- Severity-based weights
- Business impact consideration

### Debugging Failed Evaluations

**Common Issues**:
1. **Grader Confusion**: Rubric too complex
   - Solution: Simplify, add examples

2. **Label Mismatch**: Model outputs unexpected format
   - Solution: Validate output schema

3. **Context Missing**: Grader lacks information
   - Solution: Include all relevant fields

### Performance Optimization

**Batching Strategy**:
- Group similar complexity items
- Balance batch sizes (10-50 items)
- Monitor timeout issues

**Caching Opportunities**:
- Cache grader responses for identical inputs
- Store rubric evaluations
- Reuse common test scenarios

### Model Selection Guide

**For Grading**:
- `gpt-4o`: Best accuracy, higher cost
- `o3-mini`: 80% accuracy, 10x cheaper
- `o1-mini`: Good balance

**For Testing**:
- `gpt-4o-mini`: Fast iteration
- `gpt-3.5-turbo`: Cost-effective
- Target model: Final validation

### Real Production Insights

1. **Start Simple**: Binary decisions first
2. **Add Complexity**: Multi-class later
3. **Version Everything**: Rubrics evolve
4. **Monitor Drift**: Models change over time