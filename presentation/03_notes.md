# Slide 3: Speaker Notes

## TLDR
- Three evaluation levels match different use case complexities
- Each level has specific grader types in OpenAI API
- Progressive complexity: start simple, evolve as needed

## In-Depth Knowledge

### Level 1: Exact Match Evaluations

**Technical Details**:
- Grader type: `string_check`
- Operations: `eq` (equals), `contains`, `regex`
- Performance: Fastest, most deterministic
- Cost: Minimal (no additional API calls)

**When to Use**:
- Classification tasks with fixed categories
- Structured JSON output validation
- Boolean decisions (yes/no, true/false)
- Enum-style responses

**Limitations**:
- No semantic understanding
- Case-sensitive by default
- Can't handle variations or synonyms
- Brittle with formatting changes

### Level 2: Model-as-Judge

**Technical Details**:
- Grader type: `label_model`
- Models: o3-mini (fast), o1-mini, gpt-4o (accurate)
- Uses separate API call for evaluation
- Can handle complex rubrics

**When to Use**:
- Quality assessment (helpful, harmless, honest)
- Semantic similarity checking
- Multi-criteria evaluation
- Open-ended response validation

**Best Practices**:
- Use a stronger model to grade a weaker one
- Provide clear grading criteria
- Include examples in grader prompt
- Consider using o3-mini for cost efficiency

### Level 3: Custom Python Code

**Technical Details**:
- Grader type: `python_code`
- Executes in sandboxed environment
- Access to standard libraries
- Can make external API calls

**When to Use**:
- Code execution validation
- Mathematical computation checking
- Complex business logic validation
- Multi-step verification processes

**Advanced Capabilities**:
- AST parsing for code analysis
- Numerical tolerance checking
- External service integration
- Custom scoring algorithms

### Grader Selection Strategy

1. **Start with Level 1** if you have:
   - Predictable outputs
   - Clear success criteria
   - Need for speed/low cost

2. **Move to Level 2** when:
   - Outputs vary in phrasing
   - Quality matters more than exactness
   - Need semantic understanding

3. **Use Level 3** for:
   - Domain-specific validation
   - Complex scoring logic
   - Integration with other systems