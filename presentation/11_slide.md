# Evolution Through Evaluation

## The Eval-Driven Development Cycle

```
1. Create Initial Prompt
   ↓
2. Build Test Dataset (20-50 examples)
   ↓
3. Run Evaluation → Get Baseline (e.g., 40%)
   ↓
4. Analyze Failures
   ↓
5. Improve Prompt
   ↓
6. Re-evaluate → Measure Improvement
   ↓
7. Add Edge Cases to Dataset
   ↓
8. Repeat Until Target Met
```

## Real Improvements from This Repository

### Content Validator Evolution
- **v1**: Simple yes/no → 42% accuracy
- **v3**: Added categories → 65% accuracy  
- **v7**: JSON structure → 78% accuracy
- **v13**: Context-aware → 94% accuracy

### Key Discoveries Through Evaluation
1. **Format matters**: JSON > free text
2. **Examples crucial**: 2-3 examples = +20% accuracy
3. **Explicit constraints**: "ONLY" keyword = +15% accuracy
4. **Context handling**: Separate rules = +10% accuracy

## Without Evals
- Would have shipped v1
- Never discovered format issues
- Missed edge cases
- No confidence in changes