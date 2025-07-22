# Slide 9: Speaker Notes

## TLDR
- Complete production-ready code evaluation example
- Handles code extraction, syntax validation, safe execution, and testing
- Shows proper error handling and security considerations

## In-Depth Knowledge

### Code Walkthrough

**1. Code Extraction**:
```python
re.search(r'```python\\n(.*?)\\n```', output_text, re.DOTALL)
```
- Handles markdown formatting
- `re.DOTALL` for multiline code
- Graceful failure if no code block

**2. Syntax Validation**:
```python
ast.parse(code)
```
- Catches syntax errors early
- Provides clear error messages
- Prevents execution of invalid code

**3. Safe Execution Environment**:
- Restricted `__builtins__`
- Only safe functions available
- No file/network access
- Prevents malicious code execution

**4. Test Execution**:
- Checks function existence
- Runs all test cases
- Handles different data types
- Special float comparison

### Security Deep Dive

**Restricted Built-ins**:
```python
'__builtins__': {
    # Math functions
    'len', 'range', 'sum', 'min', 'max', 'abs',
    # Type constructors
    'int', 'float', 'str', 'list', 'dict', 'set',
    # Explicitly excluded: open, exec, eval, __import__
}
```

**Why These Restrictions**:
- Prevent file system access
- Block network calls
- Stop recursive execution
- Limit resource usage

### Error Handling Strategy

**Layered Approach**:
1. **Extraction Errors**: No code found
2. **Syntax Errors**: Invalid Python
3. **Runtime Errors**: Execution failures
4. **Test Errors**: Logic failures

**Error Message Design**:
- Specific about failure type
- Includes test case number
- Shows expected vs actual
- Actionable for debugging

### Float Comparison

**Why Special Handling**:
```python
# Wrong: 0.1 + 0.2 == 0.3  # False!
# Right: abs((0.1 + 0.2) - 0.3) < 1e-6  # True
```

**Tolerance Selection**:
- `1e-6`: Good for most cases
- `1e-9`: High precision needs
- `1e-3`: Approximate calculations

### Test Case Design Patterns

**Comprehensive Coverage**:
```json
{
  "function_name": "calculate_median",
  "test_cases": [
    {"input": [[1, 2, 3]], "expected": 2},      // Odd length
    {"input": [[1, 2, 3, 4]], "expected": 2.5}, // Even length
    {"input": [[1]], "expected": 1},            // Single element
    {"input": [[3, 1, 2]], "expected": 2},      // Unsorted
    {"input": [[-1, 0, 1]], "expected": 0}      // Negative numbers
  ]
}
```

### Performance Considerations

**Optimization Opportunities**:
1. Cache parsed AST
2. Reuse namespaces
3. Batch test execution
4. Timeout handling

**Resource Limits**:
```python
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Execution timeout")

signal.signal(signal.SIGALRM, timeout_handler)
signal.alarm(5)  # 5 second timeout
```

### Common Pitfalls

**1. Over-Permissive Built-ins**:
- Don't include `open`, `exec`, `eval`
- Avoid `__import__`
- No `globals` or `locals`

**2. Insufficient Test Cases**:
- Missing edge cases
- No error conditions
- Type variations

**3. Poor Error Messages**:
- Too generic
- Missing context
- No debugging hints

### Real-World Extensions

1. **Type Checking**:
```python
# Validate return types
if not isinstance(result, expected_type):
    return {"pass": False, "reason": "Wrong return type"}
```

2. **Performance Metrics**:
```python
# Time complexity validation
import time
start = time.time()
result = func(*large_input)
duration = time.time() - start
```

3. **Code Style Checks**:
```python
# Function naming conventions
if not re.match(r'^[a-z_][a-z0-9_]*$', func_name):
    return {"pass": False, "reason": "Invalid function name"}
```