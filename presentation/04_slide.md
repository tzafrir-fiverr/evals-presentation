# Level 1: Exact Match Evaluations

## Example: News Categorization

### The Challenge
Categorize news headlines into: Technology, Markets, World, Business, or Sports

### Initial Prompt (Naive)
```
Categorize this headline: {headline}
```

**Result**: 42% accuracy
- Returns "Tech" instead of "Technology"
- Adds explanations we don't want
- Inconsistent formatting

### Improved Prompt (After Eval)
```
Categorize the following news headline into one of these 
categories: Technology, Markets, World, Business, or Sports.

Respond with ONLY the category name, nothing else.

Examples:
- "Apple Unveils New iPhone" → Technology
- "Stock Market Hits Record High" → Markets

Headline: {headline}
```

**Result**: 95% accuracy