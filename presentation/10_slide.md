# Case Study: SQL Query Generator

## The Challenge
Build a natural language to SQL query generator for a customer database

## Initial Attempt (No Eval)
```
Prompt: "Convert this to SQL: {question}"
Result: 35% correct queries
```

## Iteration 1: Basic Evaluation
- Created 50 test cases with expected SQL
- Used exact match evaluation
- **Discovery**: Model uses different SQL dialects randomly
- **Fix**: Specify PostgreSQL explicitly
- **Result**: 45% accuracy

## Iteration 2: Semantic SQL Evaluation
- Switched to custom Python evaluation
- Execute both queries, compare results
- **Discovery**: Model's queries work but use different syntax
- **Fix**: Provide schema context and examples
- **Result**: 72% accuracy

## Iteration 3: Advanced Prompting
```
Given the following PostgreSQL schema:
[detailed schema]

Convert the question to SQL. Follow these patterns:
- Use JOIN not subqueries when possible
- Always use table aliases
- Include ORDER BY for deterministic results

Examples:
[3 examples showing edge cases]

Question: {question}
```
- **Result**: 91% accuracy

## Key Insight
Without evaluation, we would never have discovered these systematic issues