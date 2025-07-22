# Level 1: Code Example

```python
from openai import OpenAI
client = OpenAI()

# Create the evaluation
eval_config = client.evals.create(
    name="01_exact_match_news_categorization",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "headline": {"type": "string"},
                "category": {"type": "string"}
            }
        }
    },
    testing_criteria=[{
        "type": "string_check",
        "input": "{{sample.output_text}}",
        "reference": "{{item.category}}",
        "operation": "eq"
    }]
)

# Run evaluation with test data
test_data = [
    {"headline": "Apple Unveils New iPhone", "category": "Technology"},
    {"headline": "Fed Raises Interest Rates", "category": "Markets"},
    # ... more test cases
]

run = client.evals.runs.create(
    eval_config.id,
    data_source={"type": "completions", "source": {"type": "file_content", "content": [{"item": item} for item in test_data]}},
    input_messages={"type": "template", "template": [{"role": "user", "content": prompt_template}]},
    model="gpt-4o-mini"
)
```