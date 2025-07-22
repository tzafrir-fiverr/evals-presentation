# Level 3: Complete Code Example

```python
# Number decomposition with structured output
eval_config = client.evals.create(
    name="03_custom_python_number_decomposition",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "target": {"type": "number"}
            },
            "required": ["target"]
        }
    },
    testing_criteria=[{
        "name": "Number Sum Validator",
        "type": "python",
        "source": '''
def grade(sample, item):
    result = sample['output_json']
    actual_sum = result['number1'] + result['number2']
    target = item['target']
    
    if actual_sum == target:
        return 1.0
    else:
        return 0.0
'''
    }]
)

# Test data
test_data = [
    {"target": 10},
    {"target": 0},
    {"target": -5},
    {"target": 100}
]

# Run with structured output
run = client.evals.runs.create(
    eval_config.id,
    data_source={
        "type": "completions",
        "source": {"type": "file_content", "content": [{"item": item} for item in test_data]},
        "input_messages": {
            "type": "template",
            "template": [{"role": "user", "content": "Find any two numbers that when added together equal {{item.target}}."}]
        },
        "model": "gpt-4o-mini",
        "sampling_params": {
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "NumberDecomposition",
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "number1": {"type": "number"},
                            "number2": {"type": "number"}
                        },
                        "required": ["number1", "number2"]
                    }
                }
            }
        }
    }
)
```