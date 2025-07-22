# Slide 8: Speaker Notes

## TLDR
- Custom Python code enables complex validation logic
- Essential for code generation, math problems, data validation
- Can execute code, run tests, validate outputs programmatically

## In-Depth Knowledge

### When to Use Custom Code Graders

**Perfect For**:
1. Code generation validation
2. Mathematical computation checking
3. Data format validation
4. Performance requirements
5. Multi-step logical validation

**Not Suitable For**:
1. Simple string matching (use Level 1)
2. Subjective quality (use Level 2)
3. When execution is risky

### Technical Implementation

**Execution Environment**:
- Sandboxed Python runtime
- Standard library access
- No network access (by default)
- Memory and time limits

**Available Libraries**:
- `ast`: Code parsing
- `json`: Data validation
- `re`: Pattern matching
- `math`: Calculations
- Standard Python built-ins

### Code Generation Evaluation

**Key Components**:
1. **Code Extraction**: Parse model output
2. **Syntax Validation**: AST parsing
3. **Execution**: Safe namespace
4. **Testing**: Multiple test cases
5. **Error Handling**: Graceful failures

**Common Patterns**:
```python
# Extract code between markers
def extract_python_code(text):
    match = re.search(r'```python\n(.*?)\n```', text, re.DOTALL)
    return match.group(1) if match else text

# Safe execution
namespace = {'__builtins__': safe_builtins}
exec(code, namespace)
```

### Test Case Design

**Structure**:
```json
{
  "function_name": "calculate_average",
  "description": "Calculate average of numbers",
  "test_cases": [
    {"input": [[1, 2, 3]], "expected": 2.0},
    {"input": [[]], "expected": 0},  // Edge case
    {"input": [[-1, 1]], "expected": 0.0}
  ]
}
```

**Edge Cases to Include**:
- Empty inputs
- Single elements
- Negative numbers
- Large numbers
- Type errors

### Advanced Validation Techniques

**1. Performance Testing**:
```python
import time
start = time.time()
result = function(*inputs)
duration = time.time() - start
if duration > max_time:
    return {"pass": False, "reason": "Too slow"}
```

**2. Memory Usage**:
```python
import tracemalloc
tracemalloc.start()
result = function(*inputs)
memory = tracemalloc.get_traced_memory()[1]
```

**3. Code Quality Checks**:
- Function naming conventions
- Docstring presence
- Type hints validation
- Complexity metrics

### Security Considerations

**Sandboxing**:
- Restricted built-ins
- No file system access
- No network calls
- Resource limits

**Safe Built-ins**:
```python
safe_builtins = {
    'len': len, 'range': range, 'int': int,
    'float': float, 'str': str, 'list': list,
    'dict': dict, 'set': set, 'tuple': tuple,
    'sum': sum, 'min': min, 'max': max
}
```

### Debugging Custom Graders

**Common Issues**:
1. **Import Errors**: Module not available
2. **Timeout**: Infinite loops in generated code
3. **Memory**: Large data structures
4. **Format**: Code extraction fails

**Debug Strategy**:
1. Log extracted code
2. Catch specific exceptions
3. Provide detailed error messages
4. Test grader separately

### Real-World Applications

1. **Algorithm Implementation**: Sorting, searching
2. **Data Processing**: ETL pipelines
3. **API Response Validation**: Schema compliance
4. **SQL Query Validation**: Syntax and logic
5. **Configuration Validation**: YAML/JSON structure