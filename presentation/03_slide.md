# Three Levels of Evaluation

## Level 1: Exact Match (Simple)
- **Use Case**: Classification, multiple choice, structured outputs
- **Grader**: `string_check` with exact equality
- **Example**: Category matching, Yes/No questions

## Level 2: Model-as-Judge (Flexible)
- **Use Case**: Open-ended responses, quality assessment
- **Grader**: `label_model` using GPT-4 or o3-mini
- **Example**: Tone checking, helpfulness scoring

## Level 3: Custom Python (Complex)
- **Use Case**: Domain-specific logic, multi-step validation
- **Grader**: `python_code` with custom functions
- **Example**: Code execution, mathematical verification

---

**Key Insight**: Start simple, add complexity only when needed