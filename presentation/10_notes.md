# Slide 10: Speaker Notes

## TLDR
- Real-world case study showing iterative improvement
- SQL generation improved from 35% to 91% accuracy
- Each evaluation revealed specific, fixable issues

## In-Depth Knowledge

### Why SQL Generation is Hard

**Challenges**:
1. Multiple correct queries for same result
2. SQL dialect differences
3. Schema understanding required
4. Join vs subquery decisions
5. Performance considerations

**Common Failures**:
- Wrong table/column names
- Incorrect join conditions
- Missing GROUP BY
- Wrong aggregation functions
- SQL injection vulnerabilities

### Iteration 1: Exact Match Limitations

**What We Learned**:
```sql
-- Model output
SELECT * FROM users WHERE age > 18;

-- Expected
SELECT * FROM users WHERE age > 18 ORDER BY id;
```
- Functionally equivalent
- Exact match fails
- Need semantic evaluation

**Dialect Issues**:
- `LIMIT` vs `TOP`
- `STRING_AGG` vs `GROUP_CONCAT`
- Quote characters vary
- Date functions differ

### Iteration 2: Semantic Evaluation

**Implementation**:
```python
def grade(model_sql, expected_sql, test_db):
    # Execute both queries
    model_results = execute_query(model_sql, test_db)
    expected_results = execute_query(expected_sql, test_db)
    
    # Compare result sets
    return compare_results(model_results, expected_results)
```

**New Discoveries**:
1. Model prefers subqueries over joins
2. Missing index usage hints
3. Inconsistent aliasing
4. Non-deterministic ordering

### Iteration 3: Prompt Engineering

**Schema Context**:
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP
);

-- Orders table  
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total DECIMAL(10,2),
    created_at TIMESTAMP
);
```

**Pattern Examples**:
```sql
-- Good: Clear aliases
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Bad: Subquery when JOIN works
SELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = users.id)
FROM users;
```

### Advanced Evaluation Techniques

**1. Query Plan Analysis**:
```python
# Check if query uses indexes
plan = get_query_plan(sql)
if "Seq Scan" in plan and row_count > 1000:
    return {"pass": False, "reason": "Missing index usage"}
```

**2. Security Validation**:
```python
# Check for SQL injection patterns
if re.search(r';\s*DROP|DELETE|UPDATE', sql):
    return {"pass": False, "reason": "Potential SQL injection"}
```

**3. Performance Checks**:
```python
# Execution time limits
start = time.time()
results = execute_query(sql)
if time.time() - start > 1.0:
    return {"pass": False, "reason": "Query too slow"}
```

### Test Case Design

**Categories**:
1. **Simple Selects**: Single table queries
2. **Joins**: Multi-table relationships
3. **Aggregations**: GROUP BY, COUNT, SUM
4. **Complex**: Window functions, CTEs
5. **Edge Cases**: Empty results, NULLs

**Example Test Case**:
```json
{
  "question": "Find users who placed more than 5 orders last month",
  "expected_sql": "SELECT u.* FROM users u JOIN orders o ON u.id = o.user_id WHERE o.created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') AND o.created_at < DATE_TRUNC('month', CURRENT_DATE) GROUP BY u.id HAVING COUNT(o.id) > 5",
  "test_data": {
    "users": [...],
    "orders": [...]
  }
}
```

### Lessons Learned

1. **Start Simple**: Basic evaluation reveals obvious issues
2. **Evolve Grading**: Move from syntax to semantics
3. **Provide Context**: Schema and examples crucial
4. **Test Production Patterns**: Real queries differ from textbook
5. **Iterate Quickly**: Each round reveals new insights

### Production Considerations

1. **Query Caching**: Store validated queries
2. **Fallback Strategies**: When generation fails
3. **User Feedback Loop**: Collect failed queries
4. **Security First**: Always validate/sanitize
5. **Performance Monitoring**: Track slow queries