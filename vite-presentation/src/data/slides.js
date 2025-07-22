export const slides = [
  {
    id: 1,
    title: "From Guesswork to Guaranteed Performance",
    subtitle: "Engineering Reliable LLM Applications",
    description: "Systematic Evaluation with OpenAI API",
    type: "title"
  },
  {
    id: 2,
    title: "The Reality: Most LLM Features Fail Silently",
    type: "problem",
    content: {
      current: {
        title: "What Teams Actually Do",
        items: [
          { text: "Test on 3-5 examples, ship to production", icon: "🎲" },
          { text: "Notice failures from customer complaints", icon: "😱" },
          { text: "Spend weeks tweaking prompts blindly", icon: "🔄" },
          { text: "No idea if changes help or hurt", icon: "🤷" }
        ]
      },
      needed: {
        title: "What Actually Works",
        items: [
          { text: "Test on 100+ examples automatically", icon: "✓" },
          { text: "Catch regressions before deployment", icon: "✓" },
          { text: "Know exactly what improves accuracy", icon: "✓" },
          { text: "Ship with confidence, not hope", icon: "✓" }
        ]
      },
      insight: {
        title: "The Difference", 
        point: "42% → 95% accuracy improvement in real deployments"
      },
      cost: {
        title: "Real Consequences",
        items: [
          "Production rollbacks after customer complaints",
          "Engineering time wasted on blind experimentation",
          "Lost user trust from inconsistent AI behavior"
        ]
      }
    }
  },
  {
    id: 3,
    title: "Three Evaluation Strategies",
    type: "levels",
    content: {
      levels: [
        {
          level: "Exact Match",
          useCase: "When outputs are deterministic",
          grader: "Direct string comparison",
          example: "Classification, structured data extraction",
          when: "Use when there's ONE correct answer"
        },
        {
          level: "Model-as-Judge",
          useCase: "When quality is subjective but definable",
          grader: "GPT-4 evaluates responses",
          example: "Writing quality, helpfulness, tone",
          when: "Use when humans could agree on quality"
        },
        {
          level: "Custom Python",
          useCase: "When you need domain logic",
          grader: "Your validation code",
          example: "Code execution, business rules, complex validation",
          when: "Use when simple checks aren't enough"
        }
      ],
      insight: "Start with Exact Match. Only add complexity when needed."
    }
  },
  {
    id: 4,
    title: "Level 1: Exact Match Evaluations",
    subtitle: "Example: News Categorization",
    type: "example",
    content: {
      challenge: "Categorize news headlines into: Technology, Markets, World, Business, or Sports",
      initial: {
        title: "Initial Prompt (Naive)",
        code: "Categorize this headline: {{item.headline}}",
        result: "42% accuracy",
        problems: [
          'Returns "Tech" instead of "Technology"',
          "Adds explanations we don't want",
          "Inconsistent formatting"
        ]
      },
      improved: {
        title: "Improved Prompt (After Eval)",
        code: `Categorize the following news headline into one of these
categories: Technology, Markets, World, Business, or Sports.

Respond with ONLY the category name, nothing else.

Examples:
- "Apple Unveils New iPhone" → Technology
- "Stock Market Hits Record High" → Markets

Headline: {headline}`,
        result: "95% accuracy",
        insight: "Constraints + examples = consistency"
      }
    }
  },
  {
    id: 5,
    title: "Level 1: Implementation",
    type: "code",
    content: {
      code: `from openai import OpenAI
client = OpenAI()

prompt_template = "Categorize this headline: {{item.headline}}"

# Create the evaluation
eval_config = client.evals.create(
    name="01_exact_match_news_categorization",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "headline": {"type": "string"},
                "category": {"type": "string"}
            }
        }
    },
    testing_criteria=[{
        "type": "string_check",
        "input": "{{sample.output_text}}",
        "reference": "{{item.category}}",
        "operation": "eq"
    }]
)

# Run evaluation with test data
test_data = [
    {"headline": "Apple Unveils New iPhone", "category": "Technology"},
    {"headline": "Fed Raises Interest Rates", "category": "Markets"},
    # ... more test cases
]

run = client.evals.runs.create(
    eval_config.id,
    data_source={
        "type": "completions",
        "source": {
            "type": "file_content",
            "content": [{"item": item} for item in test_data]
        }
    },
    input_messages={
        "type": "template",
        "template": [{"role": "user", "content": prompt_template}]
    },
    model="gpt-4o-mini"
)`
    }
  },
  {
    id: 6,
    title: "Level 2: Model-as-Judge Evaluations",
    subtitle: "Example: Customer Service Writing Quality",
    type: "example",
    content: {
      challenge: "Evaluate quality of customer service responses - tone, empathy, and helpfulness",
      initial: {
        title: "The Challenge",
        code: "Multiple valid responses exist",
        result: "Can't use exact match",
        problems: [
          "Many ways to write a good response",
          "Quality has multiple dimensions",
          "Need consistent evaluation criteria"
        ]
      },
      improved: {
        title: "Solution: AI Evaluator",
        code: `testing_criteria=[{
    "type": "label_model",
    "model": "gpt-4o",
    "input": [
        {
            "role": "developer",
            "content": """You are evaluating customer service email responses.
Rate whether the response is GOOD or BAD based on these criteria:

A GOOD response must:
1. Acknowledge the customer's issue
2. Show empathy or apologize when appropriate
3. Provide a clear solution or next steps
4. Be professional and polite
5. Be concise but complete"""
        },
        {
            "role": "user",
            "content": """Customer Complaint: {{item.complaint}}

Agent Response: {{sample.output_text}}

Is this a GOOD or BAD customer service response?"""
        }
    ],
    "passing_labels": ["GOOD"],
    "labels": ["GOOD", "BAD"]
}]`,
        result: "Consistent quality measurement"
      }
    }
  },
  {
    id: 7,
    title: "Level 2: Implementation",
    type: "code",
    content: {
      code: `from openai import OpenAI
client = OpenAI()

prompt_template = "Write a customer service email response to this complaint: {complaint}"

# Create customer service evaluation
eval_config = client.evals.create(
    name="02_model_judge_customer_service",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "complaint": {"type": "string"},
                "response_guidelines": {"type": "string"}
            }
        }
    },
    testing_criteria=[{
        "type": "label_model",
        "model": "gpt-4o",
        "input": [
            {
                "role": "developer",
                "content": """You are evaluating customer service email responses.
Rate whether the response is GOOD or BAD based on these criteria:

A GOOD response must:
1. Acknowledge the customer's issue
2. Show empathy or apologize when appropriate
3. Provide a clear solution or next steps
4. Be professional and polite
5. Be concise but complete"""
            },
            {
                "role": "user",
                "content": """Customer Complaint: {{item.complaint}}

Agent Response: {{sample.output_text}}

Is this a GOOD or BAD customer service response?"""
            }
        ],
        "passing_labels": ["GOOD"],
        "labels": ["GOOD", "BAD"]
    }]
)

# Test data with customer complaints
test_data = [
    {"complaint": "I ordered a blue shirt but received a red one."},
    {"complaint": "Your website has been down for 3 hours!"}
]

run = client.evals.runs.create(
    eval_config.id,
    data_source={
        "type": "completions",
        "source": {
            "type": "file_content",
            "content": [{"item": item} for item in test_data]
        }
    },
    input_messages={
        "type": "template",
        "template": [{"role": "user", "content": prompt_template}]
    },
    model="gpt-4o-mini"
)
`
    }
  },
  {
    id: 8,
    title: "Level 3: Custom Python Evaluations",
    subtitle: "Example: Number Decomposition",
    type: "example",
    content: {
      challenge: "Find two numbers that sum to a target value",
      whyCustom: {
        title: "When You Need Custom Logic",
        items: [
          "Mathematical correctness validation",
          "JSON structured output validation",
          "Business logic verification"
        ]
      },
      approach: {
        title: "Custom Validation",
        code: `testing_criteria=[{
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
}]`,
        result: "Perfect validation for your specific needs"
      }
    }
  },
  {
    id: 9,
    title: "Level 3: Implementation",
    type: "code",
    content: {
      code: `from openai import OpenAI
client = OpenAI()

prompt_template = "Find two numbers that add up to {target}. Respond in JSON with number1 and number2."

# Create number decomposition evaluation
eval_config = client.evals.create(
    name="03_python_number_decomposition",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "target": {"type": "number"}
            }
        }
    },
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
)

# Test data with various targets
test_data = [
    {"target": 10},
    {"target": 25},
    {"target": 100}
]

# Response format configuration
response_format = {
    "type": "json_schema",
    "json_schema": {
        "name": "number_decomposition",
        "schema": {
            "type": "object",
            "properties": {
                "number1": {"type": "number"},
                "number2": {"type": "number"}
            }
        }
    }
}`
    }
  },
  {
    id: 10,
    title: "The Development Process That Works",
    subtitle: "Data-Driven Iteration",
    type: "process",
    content: {
      cycle: [
        "1. Start with 20-50 real examples",
        "2. Run baseline evaluation",
        "3. Analyze failures systematically",
        "4. Improve based on data, not guesses",
        "5. Measure improvement objectively",
        "6. Add edge cases as you find them"
      ],
      realExample: {
        title: "Actual Improvements We've Seen",
        case: "Vibe Coding Vailidator Reason: 72% → 89% → 95% accuracy",
        discoveries: [
          "Each iteration targeted specific failure patterns",
          "Clear criteria beats vague instructions",
          "Multi-stage validation catches different errors",
          "Real data reveals edge cases you'd never imagine",
          "Avoid overfitting! AI models will try to cheat the system",
          "Consider using train set and test set"
        ]
      }
    }
  },
  {
    id: 12,
    title: "Next level: AI-Agent as prompt optimizer",
    subtitle: "Let Cursor/Claude Code run the optimization loop for you",
    type: "process",
    content: {
      cycle: [
        "Run eval",
        "Analyze results - identify false positives and false negative classes",
        "Propose prompt improvements and/or model configuration changes",
        "Evaluate improved prompt",
        "Repeat until happy with results"
      ]
    }
  },
  {
    id: 13,
    title: "The Bottom Line",
    type: "takeaways",
    content: {
      points: [
        "Stop guessing: Every prompt change measured objectively",
        "Ship confidently: 95%+ accuracy before production", 
        "Catch regressions: Automated testing for LLMs",
        "Real Impact: 5x fewer incidents, 10x faster development",
        "Start Today: Pick one feature, create 20 tests, run eval in 30 minutes"
      ],
      actionCode: `# Your next 30 minutes:
from openai import OpenAI
client = OpenAI()

# 1. Pick your worst-performing LLM feature
# 2. Extract 20 examples from production logs
# 3. Create and run your first eval
# 4. Watch accuracy improve with each iteration`
    }
  }
];