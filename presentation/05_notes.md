# Slide 5: Speaker Notes

## TLDR
- Complete working example of exact match evaluation
- Shows both eval creation and running
- Demonstrates the two-step process: configure then execute

## In-Depth Knowledge

### Code Architecture

**Step 1: Evaluation Creation**
- Creates reusable evaluation configuration
- Defines the schema for test data
- Sets up grading criteria
- Returns `eval_id` for future runs

**Step 2: Running Evaluations**
- Can run same eval multiple times
- Test different models or prompts
- Compare results across runs
- Track improvements over time

### Key API Components

**`data_source_config`**:
- `type: "custom"`: For user-provided test data
- `item_schema`: Validates test data structure
- `include_sample_schema`: Auto-includes model output schema

**`testing_criteria`**:
- Array allows multiple graders
- Each grader runs independently
- Results aggregated for final score

**`string_check` operations**:
- `eq`: Exact equality
- `contains`: Substring match
- `regex`: Pattern matching
- `not_eq`: Inverse matching

### Running the Evaluation

**`data_source` types**:
1. `completions`: Generate new outputs
2. `stored_completions`: Use previous outputs
3. `file_upload`: Bulk test data

**`input_messages`**:
- `template` type with variable substitution
- Supports full conversation history
- `{{item.field}}` notation for data access

### Cost Optimization

- Use `gpt-4o-mini` for evaluation runs
- Batch multiple test cases
- Set `max_completions_tokens` appropriately
- Use `temperature: 0` for consistency

### Error Handling

Common errors:
1. Schema mismatch: Test data doesn't match schema
2. Invalid reference: `{{item.field}}` doesn't exist
3. Timeout: Too many test cases in one run
4. Rate limits: Split large evaluations

### Results Interpretation

```python
# Check results
run = client.evals.runs.retrieve(eval_id, run_id)
print(f"Passed: {run.result_counts.passed}")
print(f"Failed: {run.result_counts.failed}")
```

Results include:
- Per-item pass/fail
- Aggregate statistics
- Token usage
- Execution time