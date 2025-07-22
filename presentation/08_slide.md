# Level 3: Custom Python Code Evaluations

## Example: Number Decomposition

### The Challenge
Find two numbers that sum to a target value (with structured output)

### Why Custom Code?
- Need to validate mathematical correctness
- JSON structured output validation
- Simple custom logic that doesn't fit string matching
- Demonstrates extending beyond built-in criteria

### Evaluation Approach
```python
testing_criteria=[{
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
```

### Results
- Works with structured outputs (JSON schema)
- 100% accuracy with proper prompting
- Key benefits: Type safety, guaranteed format, easy validation