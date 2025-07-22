# Slide 11: Speaker Notes

## TLDR
- Systematic evaluation enables rapid iteration
- Real example shows 42% → 94% improvement
- Each version revealed specific insights

## In-Depth Knowledge

### The Evaluation Loop

**Why It Works**:
1. **Objective Measurement**: Numbers don't lie
2. **Fast Feedback**: Know immediately if changes help
3. **Systematic Progress**: Each iteration builds on last
4. **Confidence**: Quantify improvements

**Time Investment**:
- Initial setup: 2-4 hours
- Per iteration: 15-30 minutes
- Total to production: 1-2 days
- Without evals: Weeks of debugging

### Content Validator Deep Dive

**Version 1 (Original)**:
```
Validate if this message is appropriate: {message}
```
- Problems: Undefined "appropriate"
- Output: Inconsistent format
- No categories

**Version 3 (Categories)**:
```
Categorize this message as:
- SAFE
- TOS_VIOLATION
- SPAM

Message: {message}
```
- Better: Clear categories
- Problem: Still text output
- Mixed formats

**Version 7 (JSON)**:
```
Respond with JSON:
{
  "valid": boolean,
  "category": "SAFE|TOS_VIOLATION|SPAM"
}
```
- Structured output
- Parser-friendly
- Still missing context

**Version 13 (Context-Aware)**:
```
Analyze for policy violations considering context.
Business/educational discussions are allowed.

Schema:
{
  "valid": boolean,
  "reason": "string"  // Empty if valid
}

Examples: [...]
```
- Context consideration
- Clear schema
- Examples included

### Pattern Recognition

**Format Evolution**:
1. Free text → Bullets → JSON
2. Each step improved parseability
3. JSON enabled programmatic processing

**Instruction Clarity**:
1. Vague → Specific → Explicit
2. "appropriate" → "policy violations"
3. Added "ONLY", "MUST", constraints

**Context Handling**:
1. Ignored → Mentioned → Structured
2. Context became first-class input
3. Examples showed edge cases

### Failure Analysis Techniques

**Categorize Failures**:
1. **Format Errors**: Output doesn't match expected
2. **Logic Errors**: Wrong decision made
3. **Edge Cases**: Unusual inputs fail
4. **Consistency**: Same input, different outputs

**Analysis Tools**:
```python
# Group failures by pattern
failures = defaultdict(list)
for result in eval_results:
    if not result.passed:
        pattern = identify_pattern(result)
        failures[pattern].append(result)

# Find common issues
for pattern, cases in failures.items():
    print(f"{pattern}: {len(cases)} failures")
```

### Edge Case Discovery

**Process**:
1. Start with obvious cases
2. Run eval, find failures
3. Analyze why they failed
4. Add similar cases
5. Expand test coverage

**Example Discoveries**:
- Technical jargon confused as threats
- Quotes/citations flagged incorrectly
- Educational content blocked
- Sarcasm misunderstood

### Prompt Debugging Strategies

**1. Ablation Testing**:
- Remove one instruction
- Measure impact
- Keep only what helps

**2. A/B Testing**:
- Test variations simultaneously
- Compare results statistically
- Choose best performer

**3. Progressive Enhancement**:
- Start minimal
- Add complexity gradually
- Stop when plateauing

### Version Control Best Practices

**Track Everything**:
```
prompts/
├── v1_basic.txt
├── v2_categories.txt
├── v3_json.txt
└── v13_context_aware.txt

results/
├── v1_results.json  # 42% accuracy
├── v2_results.json  # 55% accuracy
└── v13_results.json # 94% accuracy
```

**Document Changes**:
- What changed
- Why it changed
- Result impact
- Failed experiments

### Common Improvement Patterns

1. **Output Structure**: Text → Structured → Typed
2. **Instructions**: Vague → Specific → Constrained
3. **Examples**: None → Few → Representative
4. **Context**: Ignored → Mentioned → Integrated
5. **Validation**: None → Basic → Comprehensive