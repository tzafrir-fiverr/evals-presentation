# Getting Started Today

## Step 1: Install OpenAI SDK
```bash
pip install openai
export OPENAI_API_KEY="your-key"
```

## Step 2: Create Your First Eval
```python
from openai import OpenAI
client = OpenAI()

# Start with exact match for classification
eval_config = client.evals.create(
    name="My First Eval",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "input": {"type": "string"},
                "expected": {"type": "string"}
            }
        }
    },
    testing_criteria=[{
        "type": "string_check",
        "input": "{{sample.output_text}}",
        "reference": "{{item.expected}}",
        "operation": "eq"
    }]
)
```

## Step 3: Build Test Data
- Start with 10-20 real examples
- Include obvious cases first
- Add edge cases as you find them
- Use production data when possible

## Step 4: Run and Iterate
```python
# Test your prompt
run = client.evals.runs.create(
    eval_config.id,
    model="gpt-4o-mini",
    # ... your prompt configuration
)

# Check results at run.report_url
```

## Resources
- OpenAI Evals Docs: platform.openai.com/docs/guides/evals
- Example code: This repository!
- Community: OpenAI Developer Forum