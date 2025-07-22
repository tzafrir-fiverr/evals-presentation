# Slide 13: Speaker Notes

## TLDR
- Concrete steps to implement evaluations immediately
- Start simple with exact match, evolve as needed
- Resources and community support available

## In-Depth Knowledge

### Quick Start Guide

**Environment Setup**:
```bash
# Create project
mkdir my-llm-app && cd my-llm-app
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install openai python-dotenv

# Create .env file
echo "OPENAI_API_KEY=your-key-here" > .env
```

**Project Structure**:
```
my-llm-app/
├── .env
├── evals/
│   ├── configs/
│   │   └── classification_eval.py
│   ├── data/
│   │   └── test_cases.json
│   └── results/
├── prompts/
│   ├── v1_initial.txt
│   └── v2_improved.txt
└── run_eval.py
```

### Building Effective Test Data

**Data Collection Strategies**:

1. **Manual Creation**:
```json
[
  {
    "input": "How do I reset my password?",
    "expected": "account_help"
  },
  {
    "input": "When will my order arrive?",
    "expected": "shipping"
  }
]
```

2. **Production Sampling**:
```python
# Sample from logs
sampled_data = []
for log in production_logs:
    if random.random() < 0.01:  # 1% sample
        sampled_data.append({
            "input": log.user_input,
            "expected": log.verified_output
        })
```

3. **Synthetic Generation**:
```python
# Generate variations
base_cases = ["password reset", "account locked", "forgot email"]
variations = []
for case in base_cases:
    variations.extend([
        f"How do I {case}?",
        f"Help with {case}",
        f"I need to {case}",
        f"{case} not working"
    ])
```

### Common First Projects

**1. Classification Task**:
- Customer intent classification
- Email categorization
- Bug report triaging
- Content tagging

**2. Extraction Task**:
- Entity extraction from text
- Key information from documents
- Structured data from emails
- Contact info parsing

**3. Validation Task**:
- Input format checking
- Business rule compliance
- Data quality assessment
- Schema validation

### Debugging Your First Eval

**Common Issues**:

1. **No Output**:
```python
# Check API key
print(client.api_key[:8] + "...")  # Should show first 8 chars

# Verify eval creation
print(f"Eval ID: {eval_config.id}")
```

2. **All Tests Fail**:
```python
# Debug output format
test_run = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "test"}]
)
print(f"Raw output: {test_run.choices[0].message.content}")
```

3. **Grader Errors**:
```python
# Test grader separately
test_output = "Technology"
test_expected = "Technology"
# Should pass if grader configured correctly
```

### Cost Management

**Estimation**:
```python
# Cost calculator
def estimate_cost(num_tests, model="gpt-4o-mini"):
    costs = {
        "gpt-3.5-turbo": 0.0015,  # per 1K tokens
        "gpt-4o-mini": 0.003,
        "gpt-4o": 0.03
    }
    
    avg_tokens = 100  # per test
    total_tokens = num_tests * avg_tokens
    cost = (total_tokens / 1000) * costs[model]
    
    return f"${cost:.2f}"

# 100 tests ≈ $0.03 with gpt-4o-mini
```

**Optimization Tips**:
1. Use `gpt-4o-mini` for development
2. Set `max_completion_tokens` appropriately
3. Cache results during development
4. Batch similar tests

### Next Steps After First Eval

**Week 1**:
- Create 3 different evaluations
- Try all three grader types
- Build 50+ test cases
- Achieve 80%+ accuracy

**Week 2**:
- Implement model-as-judge
- Add edge cases from production
- Create evaluation pipeline
- Version control prompts

**Month 1**:
- Custom Python graders
- Automated testing in CI/CD
- Production monitoring
- Team knowledge sharing

### Community Resources

**Official Resources**:
- Docs: https://platform.openai.com/docs/guides/evals
- API Reference: https://platform.openai.com/docs/api-reference/evals
- Cookbook: OpenAI examples repository

**Community**:
- OpenAI Developer Forum
- Discord servers (AI/ML focused)
- GitHub discussions
- Stack Overflow tags: `openai-api`, `llm-evaluation`

**Learning Path**:
1. Run examples from this repo
2. Modify for your use case
3. Share results with team
4. Contribute improvements back