# Slide 12: Speaker Notes

## TLDR
- Practical guidelines for implementing eval-driven development
- Focus on iterative improvement and proper test data
- Version control and workflow automation crucial

## In-Depth Knowledge

### Starting Small Strategy

**Why 20 Test Cases**:
- Enough for statistical significance
- Quick to create and run
- Reveals major issues
- Allows rapid iteration

**Scaling Strategy**:
1. 20 cases: Initial development
2. 50 cases: Refinement
3. 100 cases: Pre-production
4. 200+ cases: Production monitoring

**Time Investment**:
- 20 cases: 30 minutes to create
- Run time: 1-2 minutes
- Analysis: 5-10 minutes
- Total iteration: <15 minutes

### Evaluation Level Decision Tree

**Exact Match When**:
- Output has defined format
- Categories are fixed
- No variation acceptable
- Examples: Classifications, IDs, structured data

**Model-as-Judge When**:
- Quality matters more than format
- Multiple correct answers exist
- Context affects correctness
- Examples: Summaries, explanations, advice

**Custom Python When**:
- Need to execute/validate output
- Complex business logic
- External validation required
- Examples: Code, SQL, calculations

### Test Data Curation

**Real Examples Sources**:
1. Production logs
2. Customer support tickets
3. User feedback
4. Failed requests

**Edge Case Categories**:
1. **Boundary Values**: Min/max limits
2. **Empty/Null**: Missing data
3. **Malformed**: Bad formats
4. **Adversarial**: Trying to break system
5. **Unicode/Emoji**: Special characters

**Balance Considerations**:
```python
# Good distribution
test_cases = {
    "positive": 40%,  # Should pass
    "negative": 40%,  # Should fail  
    "edge": 20%       # Tricky cases
}
```

### Prompt Engineering Patterns

**Format Constraints**:
```python
# Bad: Ambiguous
"Respond with the category"

# Good: Explicit
"Respond with ONLY one of these exact strings: 
Technology, Business, Sports"

# Better: Structured
"Respond with JSON: {\"category\": \"Technology\"}"
```

**Example Power**:
- 0 examples: 45% accuracy
- 1 example: 65% accuracy
- 2-3 examples: 80% accuracy
- 5+ examples: Diminishing returns

**Keyword Effectiveness**:
- "ONLY": +15% format compliance
- "MUST": +10% rule following
- "NEVER": +12% constraint adherence
- "EXACTLY": +8% precision

### Development Workflow Automation

**Automated Pipeline**:
```python
# eval_pipeline.py
def run_eval_pipeline(prompt_file):
    # Load prompt
    prompt = load_prompt(prompt_file)
    
    # Run evaluation
    results = client.evals.runs.create(
        eval_id=EVAL_ID,
        model="gpt-4o-mini",
        prompt=prompt
    )
    
    # Analyze failures
    failures = analyze_failures(results)
    
    # Generate report
    report = {
        "accuracy": results.accuracy,
        "failures": failures,
        "suggestions": generate_suggestions(failures)
    }
    
    return report
```

**Git Integration**:
```bash
# Pre-commit hook
if ! python eval_pipeline.py prompts/current.txt; then
    echo "Evaluation failed. Commit blocked."
    exit 1
fi
```

### Common Pitfalls to Avoid

1. **Over-fitting to Test Data**
   - Solution: Hold-out test set
   - Rotate test cases
   - Add new cases regularly

2. **Ignoring Latency**
   - Measure response time
   - Consider streaming
   - Balance accuracy vs speed

3. **Model Version Sensitivity**
   - Test on multiple models
   - Document model versions
   - Plan for model updates

4. **Cost Explosion**
   - Use cheaper models for iteration
   - Cache evaluation results
   - Batch API calls

### Advanced Techniques

**Progressive Evaluation**:
```python
# Start cheap, get expensive
models = ["gpt-3.5-turbo", "gpt-4o-mini", "gpt-4o"]
for model in models:
    if run_eval(model) > threshold:
        return model
```

**Ensemble Evaluation**:
```python
# Multiple graders for confidence
graders = [exact_match, semantic_match, human_eval]
consensus = vote(graders)
```

**Continuous Monitoring**:
```python
# Production sampling
sample_rate = 0.01  # 1% of requests
if random() < sample_rate:
    add_to_eval_queue(request, response)
```