# Slide 4: Speaker Notes

## TLDR
- Exact match evaluation reveals formatting inconsistencies
- Simple categorization task shows dramatic improvement (42% → 95%)
- Key improvements: explicit categories, output format, examples

## In-Depth Knowledge

### Why This Example Works

1. **Real Problem**: News categorization is used in:
   - Content recommendation systems
   - Automated news aggregators
   - Sentiment analysis pipelines
   - Trading signal generation

2. **Common Failures**:
   - Abbreviations ("Tech" vs "Technology")
   - Extra explanations ("Technology - this article discusses...")
   - Wrong delimiter ("Technology;" or "technology")
   - Multiple categories ("Technology/Business")

### Technical Implementation Details

**Evaluation Configuration**:
```python
testing_criteria=[{
    "type": "string_check",
    "input": "{{sample.output_text}}",
    "reference": "{{item.category}}",
    "operation": "eq"
}]
```

**Why `string_check`**:
- Deterministic (no randomness)
- Fast (no additional API calls)
- Clear pass/fail criteria
- Perfect for classification tasks

### Prompt Engineering Insights

1. **"Respond with ONLY"**: Critical phrase that enforces format
2. **Explicit category list**: Prevents model creativity
3. **Examples**: Show exact format expected
4. **No room for interpretation**: Every word matters

### Real-World Impact

- **Trading Systems**: Wrong category = wrong trading signal
- **Content Filters**: Misclassification = wrong audience
- **Analytics**: Bad data in = bad insights out

### Common Pitfalls to Avoid

1. **Assuming model understands context**
   - Models don't know your category definitions
   - "Business" vs "Markets" needs clear distinction

2. **Flexible matching temptation**
   - Don't use `contains` operation
   - Don't normalize in prompt
   - Fix the prompt, not the grader

3. **Under-specifying format**
   - "category name" is ambiguous
   - "ONLY the category name" is clear

### Evolution Path
This simple evaluation often leads to:
- Discovering need for subcategories
- Handling ambiguous cases
- Multi-label classification
- Confidence scoring (Level 2)