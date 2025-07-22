# Best Practices for Development

## 1. Start Small, Iterate Fast
- Begin with 20 test cases
- Run evals every prompt change
- Add cases as you discover issues
- Target: 100-200 cases for production

## 2. Choose the Right Evaluation Level
```python
if output_is_deterministic:
    use_exact_match()
elif output_needs_quality_check:
    use_model_as_judge()
elif output_needs_execution:
    use_custom_python()
```

## 3. Test Data Best Practices
- **Real examples** > Synthetic data
- **Edge cases** from production failures
- **Adversarial** examples to test limits
- **Balanced** dataset (not all positive/negative)

## 4. Prompt Engineering Patterns
- **Constrain output format** (JSON > text)
- **Provide examples** (2-3 optimal)
- **Use explicit keywords** ("ONLY", "MUST")
- **Include failure modes** in instructions

## 5. Development Workflow
```bash
# 1. Create eval
eval_id = create_evaluation(...)

# 2. Iterate on prompt
while accuracy < target:
    prompt = improve_prompt(failures)
    results = run_evaluation(prompt)
    
# 3. Version everything
git commit -m "Prompt v7: 78% accuracy"
```