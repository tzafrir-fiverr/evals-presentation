# Level 2: Model-as-Judge Evaluations

## Example: Content Moderation System

### The Challenge
Build a content filter that blocks harmful content while allowing legitimate discussions

### Initial Prompt (Too Strict)
```
Is this message safe? Answer yes or no: {message}
```

**Result**: 78% accuracy
- Blocks legitimate business discussions
- Inconsistent with edge cases
- No nuance for context

### Evaluation Approach
Use GPT-4 to judge if the moderation decision was correct

```python
testing_criteria=[{
    "type": "label_model",
    "model": "gpt-4o",
    "input": [
        {"role": "developer", "content": "Was the moderation decision correct?\n\nMessage: {{item.message}}\nModel said: {{sample.output_text}}\nExpected: {{item.should_allow}}"},
        {"role": "user", "content": "Evaluate if the decision was correct or incorrect"}
    ],
    "passing_labels": ["correct"],
    "labels": ["correct", "incorrect"]
}]
```

### Final Prompt (After Iterations)
```
Analyze this message for policy violations.
Consider context and intent, not just keywords.
Business/educational discussions are allowed.

Respond with JSON:
{"valid": boolean, "reason": "string"}
```

**Result**: 94% accuracy