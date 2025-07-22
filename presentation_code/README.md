# OpenAI Evals API - Presentation Code Examples

This directory contains runnable code examples that demonstrate the three levels of evaluation using the OpenAI Evals API.

## Prerequisites

1. Install dependencies:
```bash
pip install openai python-dotenv
```

2. Set up your OpenAI API key:
```bash
export OPENAI_API_KEY="your-api-key-here"
# Or create a .env file with: OPENAI_API_KEY=your-api-key-here
```

## Examples

### 1. Exact Match Evaluation
**File**: `01_exact_match_news_categorization.py`

Demonstrates the simplest form of evaluation - exact string matching for classification tasks.

```bash
python 01_exact_match_news_categorization.py
```

**Key concepts**:
- `string_check` grader type
- Deterministic evaluation
- Fast and cost-effective

### 2. Model-as-Judge Evaluation
**File**: `02_model_judge_content_moderation.py`

Shows how to use another model (GPT-4) to evaluate nuanced responses that require context understanding.

```bash
python 02_model_judge_content_moderation.py
```

**Key concepts**:
- `label_model` grader type
- Context-aware evaluation
- Handling subjective quality

### 3. Custom Python Code Evaluation
**File**: `03_custom_python_code_generation.py`

Demonstrates custom Python code for mathematical validation - finding two numbers that sum to a target value using structured JSON output.

```bash
python 03_custom_python_code_generation.py
```

**Key concepts**:
- `python` grader type
- Structured output with JSON schema
- Mathematical validation logic
- Clear, presentation-friendly example

### 4. Case Study: SQL Query Generator
**File**: `04_sql_query_evaluation.py`

A complete example showing how evaluations drive iterative improvement of prompts.

```bash
python 04_sql_query_evaluation.py
```

**Key concepts**:
- Progressive prompt improvement
- Structured requirements validation
- Real-world complexity

## Running the Examples

Each script:
1. Creates an evaluation configuration
2. Runs the evaluation with test data
3. Provides a URL to view results
4. Outputs the eval_id and run_id for future reference

## Understanding Results

After running each example, visit the provided report URL to see:
- Overall accuracy metrics
- Individual test case results
- Token usage and costs
- Detailed failure analysis

## Tips

1. **Start Simple**: Begin with exact match evaluation
2. **Iterate Quickly**: Run evaluations frequently during development
3. **Version Everything**: Track prompts and their performance
4. **Analyze Failures**: Failed test cases reveal improvement opportunities

## Next Steps

1. Modify the test data to match your use case
2. Experiment with different prompt templates
3. Create your own custom graders
4. Build evaluation into your development workflow