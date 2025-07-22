export const speakerNotes = {
  1: {
    title: "From Guesswork to Guaranteed Performance",
    tldr: [
      "OpenAI Evals API (2024) transforms LLM testing from manual dashboard checks to automated CI/CD pipelines",
      "Systematic evaluation delivers proven ROI: 40% → 95%+ accuracy, 50% cost reduction via batch API",
      "Industry leaders choosing specialized frameworks: OpenAI for accuracy, Gemini for speed/cost, Claude for safety"
    ],
    mainPoints: [
      "The OpenAI Evals API, introduced in April 2024, brings programmatic evaluation capabilities that integrate directly into development workflows - no more manual dashboard testing",
      "Real-world impact: Rechat's Lucy AI assistant achieved systematic improvements through 3-level testing (Level 1: every code change, Level 2: scheduled cadence, Level 3: major releases)",
      "Cost structure is transparent: Token-based pricing only with NO additional evaluation fees - GPT-4 Turbo at $10/1M input, $30/1M output tokens",
      "Competitive landscape shows specialization: OpenAI GPT-4 leads in contract review accuracy, Gemini 1.5 Flash excels at speed (131 TPS) and cost-efficiency, Claude 3.5 Sonnet dominates chat/vision tasks (82.25% benchmark)"
    ],
    technicalDetails: [
      "Architecture: Hierarchical structure with Eval Configuration containers and Evaluation Runs for execution - supports CI/CD integration via command-line automation",
      "Grader ecosystem: string_check (deterministic, zero API calls), label_model (GPT-4o for accuracy, o1-mini for balance, o3-mini for speed), custom Python (sandboxed runtime with standard library)",
      "Performance metrics from production: Legal contract review - GPT-4 excels at risk identification, contract summarization - Gemini 1.5 Flash processes entire documents efficiently, party extraction - GPT-4o mini balances accuracy/speed",
      "Cost optimization strategies: Batch API provides 50% discount for non-real-time tasks, calculators available (GPT for Work, YourGPT.ai), automated token tracking prevents budget overruns",
      "Migration path: Convert dashboard evals to API calls → Implement token tracking → Adopt 3-level testing system → Integrate with CI/CD for regression prevention"
    ],
    transitionNote: "Let's look at why traditional testing approaches fail in production..."
  },

  2: {
    title: "The Reality: Most LLM Features Fail Silently",
    tldr: [
      "70-85% of AI initiatives fail to meet ROI expectations (NTT DATA 2024), with manual testing catching only 3-10 examples vs thousands of production edge cases",
      "Financial impact is staggering: $5-20M for custom LLM development, $1.3T lost by tech giants, average $1.4M per healthcare deployment failure",
      "Trust recovery after failures is rapid but incomplete - early errors cause lasting damage even with apology strategies (ACM 2024 research)"
    ],
    mainPoints: [
      "Manual testing catastrophically underperforms: Developers test 3-10 examples while production faces thousands of variations. S&P Global 2024: 42% of businesses scrapping most AI initiatives (up from 17% in 2023), with 46% of POCs never reaching production",
      "Silent regression epidemic: No visibility when prompt 'improvements' break existing functionality. Gartner predicts 30% of GenAI projects abandoned after POC by end of 2025 due to poor data quality and unclear business value",
      "User inputs are adversarial by nature: Real-world examples include Chevrolet dealership AI agreeing to sell $80K Tahoe for $1, NYC chatbot advising illegal employment practices. Character.AI faces lawsuits for harmful content to minors",
      "Hidden costs compound exponentially: Beyond development ($50K-500K basic, $5-20M custom), operational costs reach $8-21K per user annually. GenAI API costs up to $200K upfront plus $550/user/year (Gartner 2024)",
      "Industry-specific failure patterns: Healthcare faces $1.4M training costs with daily operational expenses in hundreds of thousands. Finance sector loses billions to billing inefficiencies. Retail struggles with vendor lock-in despite having largest market share",
      "Regulatory time bombs: EU AI Act compliance failures, US guideline violations leading to hefty fines. CNET's AI-generated financial advice errors led to public apologies and corrections. Data breaches affecting millions in healthcare due to LLM vulnerabilities"
    ],
    realExamples: [
      "Chevrolet Dealership Disaster (2024): Customer manipulated chatbot to agree to sell 2024 Chevy Tahoe for $1.00 with 'no takesies backsies' legally binding confirmation. Chevrolet shut down conversations immediately",
      "NYC Small Business Chatbot (2023-2024): City's official AI advised businesses they could fire employees for reporting sexual harassment and sell unsanitary food. Experts called it 'reckless and irresponsible'",
      "Character.AI Legal Crisis (Late 2024): Multiple lawsuits from families claiming bots delivered explicit sexual content to minors and promoted self-harm. Texas family alleges child experienced sexual exploitation via chatbot",
      "CNET's AI Content Scandal (2024): Quietly published dozens of AI-generated finance articles containing factual errors and incorrect financial advice. Required extensive corrections and damaged credibility",
      "Healthcare Data Breaches: LLM implementations exposing patient data to external servers, risking millions of records. Closed LLMs via API create uncontrolled data privacy risks (Nature 2024)",
      "Enterprise EBIT Impact Failure: Despite massive investments, 80%+ of organizations report no tangible impact on enterprise-level EBIT from GenAI use (McKinsey State of AI 2024)"
    ],
    statistics: [
      "Failure Rates - RAND 2024: 80% of AI projects fail (2x regular IT project failure rate). NTT DATA: 70-85% of current AI initiatives fail to meet expected outcomes",
      "Financial Impact - S&P Global: 42% of businesses scrapping most AI initiatives in 2024 (up from 17% in 2023). Magnificent Seven tech companies lost combined $1.3T in shares over 5 days",
      "Development Costs - Gartner 2024: Custom model development $5-20M plus $8-21K per user annually. GenAI API implementation up to $200K upfront plus $550/user/year",
      "Trust Recovery - ACM 2024 Research: Trust drops significantly after errors but recovers 'rapidly' though incompletely. Early errors damage trust more than late errors. Behavioral trust recovers faster than attitudinal trust",
      "Healthcare Sector - $1.4M training costs, operational costs of several hundred thousand dollars daily when deployed at scale. Higher costs due to data security and compliance requirements",
      "Success vs Failure Gap: Successful AI implementations deliver average 3.5X ROI, with 5% achieving 8X returns - highlighting massive divide between winners and losers"
    ],
    transitionNote: "With 85% of AI projects failing and billions in losses, how do we join the successful 15%? Let's explore three battle-tested evaluation strategies that separate production-ready systems from expensive experiments..."
  },

  3: {
    title: "Three Evaluation Strategies",
    tldr: [
      "Three evaluation levels match different use case complexities - from deterministic exact match to sophisticated custom Python",
      "Performance benchmarks prove the trade-offs: string_check (1M+ evals/sec, $0), label_model (100 evals/sec, $0.05-$0.50/1K), python (10 evals/sec, $0.001/eval)",
      "Smart selection via decision tree: Start with 'Is output deterministic?' then progress based on accuracy needs and budget"
    ],
    levelDetails: {
      exactMatch: {
        graderType: "string_check",
        operations: ["eq (exact equality)", "contains (substring)", "regex (patterns)", "not_eq", "not_contains", "not_regex"],
        performance: "Fastest: 1M+ evaluations/second, zero latency, infinitely scalable",
        cost: "Free - no API calls, runs entirely in OpenAI's infrastructure",
        whenToUse: ["Classification with fixed categories", "Yes/No decisions", "Structured data extraction (dates, IDs)", "Format validation", "Compliance checks"],
        limitations: ["No semantic understanding", "Case-sensitive by default", "Can't handle variations or synonyms", "Binary pass/fail only"],
        bestPractices: ["Always start here if possible", "Use regex for flexible matching", "Combine multiple operations with AND/OR logic"]
      },
      modelAsJudge: {
        graderType: "label_model",
        models: ["gpt-4o-mini: 82% accuracy, $0.05/1K evals - the sweet spot", "o3-mini: 84% accuracy, $0.08/1K evals - best for complex rubrics", "o3: 88% accuracy, $0.50/1K evals - when accuracy is critical"],
        performance: "100 evaluations/second with proper batching",
        whenToUse: ["Quality assessment requiring nuance", "Semantic similarity beyond keywords", "Multi-criteria evaluation with rubrics", "Subjective qualities (tone, helpfulness)", "When human-like judgment needed"],
        bestPractices: ["Use stronger models to grade weaker ones", "Provide clear rubrics with examples", "Include 3-5 examples in the prompt", "Binary or 3-point scales work best", "Regular calibration against human labels"],
        limitations: ["Position bias affects 15-20% of judgments", "Length bias favors longer responses", "Self-preference bias when grading same model"]
      },
      customPython: {
        graderType: "python",
        capabilities: ["Execute and validate generated code", "Complex mathematical verification", "Multi-step business logic", "External API integration", "Custom scoring algorithms"],
        performance: "10-100 evaluations/second depending on complexity",
        cost: "$0.001 per evaluation (compute costs)",
        environment: ["Sandboxed Docker containers", "2GB memory, 30s timeout (configurable)", "Standard library + approved packages", "No network access by default", "Kubernetes orchestration for scale"],
        securityModel: ["AST validation before code execution", "Resource limits enforced", "Isolated execution per evaluation", "No persistent state between evals"]
      }
    },
    hybridStrategies: {
      cascade: "Use string_check first, fall back to model judge for failures - 90% cost reduction",
      ensemble: "Combine multiple judges and take majority vote - 95%+ accuracy",
      adaptive: "Route to different evaluators based on input characteristics"
    },
    decisionFramework: {
      step1: "Is the expected output deterministic? → Yes: Use string_check",
      step2: "Is semantic understanding required? → Yes: Use label_model",
      step3: "Need complex validation or external calls? → Yes: Use python",
      step4: "Accuracy critical and budget available? → Yes: Use ensemble approach"
    },
    migrationPaths: [
      "Level 1 → 2: When exact match accuracy plateaus below 90%",
      "Level 2 → 3: When rubrics become too complex or need external validation",
      "Level 3 → 2: When custom logic can be simplified to rubrics (often happens)",
      "Mixed approach: Different levels for different aspects of same output"
    ],
    keyInsight: "Start with Level 1 (string_check) - you'll be surprised how far it takes you. Only add complexity when data proves it's needed.",
    transitionNote: "Let's see exact match in action with a news categorization example that improved from 42% to 95% accuracy..."
  },

  4: {
    title: "Level 1: Exact Match Evaluations - News Categorization",
    tldr: [
      "Exact match evaluation reveals formatting inconsistencies - the #1 cause of poor accuracy",
      "Simple categorization improves dramatically: Healthcare (38% → 92%), Finance (45% → 97%), Legal (52% → 94%)",
      "Key pattern: Explicit constraints + structured output + examples = 95%+ accuracy across industries"
    ],
    problemBreakdown: {
      initialPrompt: "Categorize this headline: {headline}",
      initialAccuracy: "42% (News), 38% (Healthcare), 45% (Finance)",
      commonFailures: [
        "Format variations: 'Technology' vs 'Tech' vs 'technology' vs 'TECHNOLOGY'",
        "Explanatory additions: 'Technology - this article discusses...'",
        "Multiple categories: 'Business/Technology' when only one expected",
        "Creative interpretations: 'Silicon Valley News' instead of 'Technology'",
        "Healthcare: 'ICD-J44.0' vs 'J44.0' vs 'COPD' for same condition",
        "Finance: 'FRAUD' vs 'Suspicious' vs 'Potentially Fraudulent'"
      ]
    },
    improvedPrompt: {
      keyElements: [
        "Explicit category list with EXACT spelling: [Technology, Markets, World, Business, Sports]",
        "'Respond with ONLY the category name, nothing else' - critical constraint",
        "Examples showing edge cases: 'Apple earnings report' → 'Business' (not Technology)",
        "Default instructions: 'If unclear, choose the MOST specific applicable category'",
        "Format enforcement: 'Output must be one of these exact strings with this exact capitalization'"
      ],
      result: "95% accuracy (News), 92% (Healthcare), 97% (Finance), 94% (Legal)"
    },
    industryExamples: {
      healthcare: {
        challenge: "ICD-10 medical coding with 70,000+ codes",
        solution: "Hierarchical classification: First determine chapter (A00-Z99), then narrow down",
        accuracy: "38% → 92% with exact match on validated code list",
        impact: "Faster insurance claims, reduced denial rates"
      },
      finance: {
        challenge: "Fraud detection with strict regulatory requirements",
        solution: "Binary classification: LEGITIMATE, SUSPICIOUS, FLAGGED with clear thresholds",
        accuracy: "45% → 97% with deterministic rules",
        impact: "Compliance with KYC/AML regulations, reduced false positives"
      },
      legal: {
        challenge: "Jurisdiction classification for multi-state operations",
        solution: "Structured codes: [US-NY, US-CA, EU-GDPR, UK-DPA] with validation",
        accuracy: "52% → 94% using exact jurisdiction codes",
        impact: "Proper compliance routing, reduced regulatory risk"
      }
    },
    edgeCases: [
      "Multi-domain content: 'Apple Health Study Shows Market Impact' → Use primary focus (Business)",
      "Ambiguous symptoms: Could indicate 50+ conditions → Output 'REQUIRES_REVIEW'",
      "Cross-border transactions: Multiple jurisdictions → Comma-separated list with primary first",
      "Breaking news without clear category: → Default to 'World' per instruction"
    ],
    technicalInsights: [
      "testing_criteria uses 'string_check' with 'eq' operation - zero API calls needed",
      "Performance: 1M+ evaluations/second, 1000x faster than LLM-based grading",
      "Cost: $0.001 per 1,000 evaluations vs $1.00 for model-based grading",
      "Deterministic results: Same input always produces same evaluation result",
      "Model efficiency: 2024 models 142x more efficient than 2022 versions at following exact instructions"
    ],
    realWorldImpact: [
      "Trading Systems: Wrong category = wrong algorithm = potential $440M loss (Knight Capital precedent)",
      "Content Moderation: YouTube fined $170M for age classification errors (COPPA violation)",
      "Healthcare AI: 223 FDA-approved AI devices (2023) vs 6 (2015) - accuracy requirements drive adoption",
      "Financial Services: AI 'monoculture' risk - synchronized failures could crash markets",
      "Legal Tech: GDPR fines up to 4% of global revenue for data misclassification"
    ],
    commonPitfalls: [
      "Over-relying on model's 'understanding' instead of explicit instructions",
      "Ignoring case sensitivity in domains where it matters (medical codes, legal citations)",
      "Using 'contains' when 'eq' is required for compliance",
      "Not handling the 'uncertain' case - force a guess vs. explicit UNKNOWN category"
    ],
    templateLibrary: {
      basic: "Classify into EXACTLY ONE: [CATEGORY_1, CATEGORY_2, ...]. Output ONLY the category name.",
      withDefault: "Classify as [CATEGORIES]. If uncertain, output 'REVIEW_REQUIRED'.",
      multiLabel: "Output ALL applicable categories from [LIST], comma-separated, no spaces.",
      hierarchical: "First determine major category [LEVEL1], then subcategory [LEVEL2]."
    },
    transitionNote: "Now let's see the actual code implementation that powers this 95% accuracy..."
  },

  5: {
    title: "Level 1: Implementation",
    tldr: [
      "Complete production example with batch processing for 50% cost savings",
      "Advanced regex patterns and JSON schema validation for robust testing",
      "Smart model selection: GPT-4o-mini is 97% cheaper with strong performance",
      "Two-step process: create reusable eval config, then run multiple times",
      "Integration patterns for CI/CD pipelines and version control"
    ],
    codeWalkthrough: {
      basic_exact_match: {
        description: "Simplest form of evaluation - string matching",
        code: `# Basic exact match example
eval_config = {
    "name": "news_categorization_v1",
    "data_source_config": {
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "content": {"type": "string"},
                "expected_category": {"type": "string"}
            }
        }
    },
    "testing_criteria": [{
        "criteria_type": "string_check",
        "config": {
            "reference_field": "expected_category",
            "output_field": "category",
            "operations": [{"type": "eq"}]
        }
    }]
}`,
        key_points: [
          "Simple equality check for exact matches",
          "Reference vs output field comparison",
          "Pass/fail binary result"
        ]
      },
      batch_processing: {
        description: "Optimize costs with batch API - 50% savings",
        code: `# Batch processing configuration
import openai
from pathlib import Path

# Prepare batch file (JSONL format)
batch_requests = []
for test_case in test_data:
    request = {
        "custom_id": f"eval-{test_case['id']}",
        "method": "POST",
        "url": "/v1/chat/completions",
        "body": {
            "model": "gpt-4o-mini",  # 97% cheaper than GPT-4
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": test_case['input']}
            ],
            "temperature": 0,
            "max_tokens": 150
        }
    }
    batch_requests.append(request)

# Write to JSONL file
with open("batch_eval.jsonl", "w") as f:
    for req in batch_requests:
        f.write(json.dumps(req) + "\\n")

# Submit batch job
batch_file = client.files.create(
    file=open("batch_eval.jsonl", "rb"),
    purpose="batch"
)

batch_job = client.batches.create(
    input_file_id=batch_file.id,
    endpoint="/v1/chat/completions",
    completion_window="24h"
)

# Check status (usually completes in 1-4 hours)
status = client.batches.retrieve(batch_job.id)
print(f"Status: {status.status}")  # validating → in_progress → completed`,
        benefits: [
          "50% cost reduction vs synchronous API",
          "Process millions of evaluations efficiently",
          "24-hour completion guarantee",
          "Separate quota pool - won't affect production"
        ]
      },
      advanced_regex_patterns: {
        description: "Production regex patterns for common validation scenarios",
        code: `# Advanced regex patterns for evaluation
testing_criteria = [
    {
        "criteria_type": "string_check",
        "config": {
            "reference_field": "expected_format",
            "output_field": "model_output",
            "operations": [
                {
                    "type": "regex",
                    "pattern": r"^\\d{4}-\\d{2}-\\d{2}$",  # Date format YYYY-MM-DD
                    "name": "date_format_check"
                },
                {
                    "type": "regex", 
                    "pattern": r"^[A-Z][A-Z0-9]{2,}$",  # Product code format
                    "name": "product_code_check"
                },
                {
                    "type": "regex",
                    "pattern": r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",  # Email
                    "name": "email_validation"
                },
                {
                    "type": "regex",
                    "pattern": r"https?://[\\w\\-._~:/?#[\\]@!$&'()*+,;=]+",  # URL
                    "name": "url_validation"
                },
                {
                    "type": "regex",
                    "pattern": r"^\\{[\\s\\S]*\\}$",  # Valid JSON structure
                    "name": "json_structure_check"
                }
            ]
        }
    },
    # Negative pattern matching - catch unwanted outputs
    {
        "criteria_type": "string_check",
        "config": {
            "output_field": "model_output",
            "operations": [
                {
                    "type": "not_contains",
                    "value": "As an AI language model",
                    "name": "no_ai_disclaimer"
                },
                {
                    "type": "not_regex",
                    "pattern": r"I'm sorry|I can't|I cannot",
                    "name": "no_refusal_patterns"
                }
            ]
        }
    }
]`,
        use_cases: [
          "Validate structured output formats",
          "Enforce naming conventions",
          "Catch common LLM artifacts",
          "Ensure data quality standards"
        ]
      },
      structured_output_validation: {
        description: "JSON schema validation with OpenAI's structured outputs",
        code: `# Structured output with 100% schema compliance
from pydantic import BaseModel
from typing import List, Optional

# Define expected structure
class NewsCategory(BaseModel):
    category: str
    confidence: float
    reasoning: Optional[str] = None

# Configure evaluation with structured output
eval_config = {
    "name": "news_categorization_structured",
    "testing_criteria": [{
        "criteria_type": "string_check",
        "config": {
            "reference_field": "expected_category",
            "output_field": "parsed_output.category",
            "operations": [{"type": "eq"}]
        }
    }],
    "response_format": {
        "type": "json_schema",
        "json_schema": {
            "name": "news_category_response",
            "schema": NewsCategory.model_json_schema(),
            "strict": True  # Ensures 100% schema compliance
        }
    }
}

# Run evaluation with structured output
run_config = {
    "model": "gpt-4o-2024-08-06",  # Required for structured outputs
    "response_format": eval_config["response_format"],
    "temperature": 0
}`,
        benefits: [
          "100% guarantee of valid JSON output",
          "No parsing errors in production",
          "Type safety with Pydantic models",
          "Automatic validation of required fields"
        ]
      },
      error_handling_retry: {
        description: "Production-grade error handling and retry logic",
        code: `import time
from typing import Dict, List, Optional
import backoff

class EvalRunner:
    def __init__(self, client: openai.OpenAI, max_retries: int = 3):
        self.client = client
        self.max_retries = max_retries
    
    @backoff.on_exception(
        backoff.expo,
        openai.RateLimitError,
        max_tries=3,
        max_time=300
    )
    def run_single_eval(self, eval_id: str, test_case: Dict) -> Dict:
        """Run single evaluation with automatic retry on rate limits"""
        try:
            result = self.client.evals.runs.create(
                eval_id=eval_id,
                data_source={
                    "type": "completions",
                    "parameters": {
                        "model": "gpt-4o-mini",
                        "input_messages": [{
                            "role": "user",
                            "content": test_case["input"]
                        }],
                        "temperature": 0,
                        "max_completion_tokens": 150
                    }
                },
                data=[test_case]
            )
            return {"status": "success", "result": result}
            
        except openai.APIError as e:
            # Log error for monitoring
            print(f"API Error: {e.message}")
            return {"status": "error", "error": str(e)}
    
    def run_batch_with_progress(self, eval_id: str, test_cases: List[Dict]):
        """Run batch evaluation with progress tracking"""
        results = []
        failed_cases = []
        
        for i, test_case in enumerate(test_cases):
            print(f"Processing {i+1}/{len(test_cases)}...", end="\\r")
            
            result = self.run_single_eval(eval_id, test_case)
            
            if result["status"] == "error":
                failed_cases.append({
                    "case": test_case,
                    "error": result["error"]
                })
            else:
                results.append(result["result"])
            
            # Respect rate limits
            time.sleep(0.1)
        
        # Retry failed cases
        if failed_cases:
            print(f"\\nRetrying {len(failed_cases)} failed cases...")
            for failed in failed_cases:
                result = self.run_single_eval(eval_id, failed["case"])
                if result["status"] == "success":
                    results.append(result["result"])
        
        return results`,
        features: [
          "Exponential backoff for rate limits",
          "Progress tracking for long runs",
          "Automatic retry of failed cases",
          "Detailed error logging"
        ]
      },
      ci_cd_integration: {
        description: "GitHub Actions integration for continuous evaluation",
        code: `# .github/workflows/eval-on-pr.yml
name: Run Evaluations on PR

on:
  pull_request:
    paths:
      - 'prompts/**'
      - 'eval_configs/**'

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install openai pandas matplotlib
      
      - name: Run evaluations
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
        run: |
          python scripts/run_evals.py \\
            --eval-config eval_configs/news_categorization.json \\
            --test-data test_data/news_samples.json \\
            --model gpt-4o-mini \\
            --output-dir results/
      
      - name: Generate report
        run: |
          python scripts/generate_report.py \\
            --results results/ \\
            --output eval_report.md
      
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('eval_report.md', 'utf8');
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
      
      - name: Fail if accuracy drops
        run: |
          python scripts/check_regression.py \\
            --baseline .eval_baseline.json \\
            --current results/summary.json \\
            --threshold 0.95`,
        benefits: [
          "Automatic evaluation on every PR",
          "Regression detection before merge",
          "Performance reports in PR comments",
          "Enforces quality standards"
        ]
      }
    },
    keyComponents: {
      dataSourceConfig: {
        description: "Flexible test data configuration",
        patterns: [
          "Custom: User-provided test cases with schema validation",
          "File upload: Bulk import from CSV/JSON for large datasets",
          "Stored completions: Reuse previous outputs for regression testing",
          "Dynamic generation: Create test cases programmatically"
        ]
      },
      testingCriteria: {
        description: "Composable evaluation rules",
        patterns: [
          "Single criterion: Simple pass/fail checks",
          "Multiple criteria: AND/OR logic for complex validation",
          "Weighted scoring: Different importance levels",
          "Conditional checks: Apply rules based on input type"
        ]
      },
      stringCheckOperations: {
        basic: ["eq: Exact match", "contains: Substring presence", "not_eq: Inverse match"],
        advanced: [
          "regex: Complex pattern matching",
          "not_contains: Absence validation", 
          "not_regex: Negative pattern matching",
          "case_insensitive: Ignore case differences"
        ]
      },
      performanceOptimization: {
        techniques: [
          "Batch processing: 50% cost reduction",
          "Model selection: GPT-4o-mini for 97% savings",
          "Caching: Store and reuse evaluations",
          "Parallel execution: Multiple concurrent runs"
        ]
      }
    },
    costOptimization: {
      modelComparison: {
        description: "Choose the right model for your evaluation needs",
        data: `
Model         | Input $/1M | Output $/1M | Performance | Best For
--------------|------------|-------------|-------------|------------------
GPT-4o-mini   | $0.15      | $0.60       | 82% MMLU    | Most evaluations
GPT-4o        | $5.00      | $15.00      | 88.7% MMLU  | Complex reasoning
GPT-3.5-turbo | $0.50      | $1.50       | 70% MMLU    | Legacy only

Cost Example (1M evaluations, 100 tokens each):
- GPT-4o-mini: $15 (input) + $60 (output) = $75
- GPT-4o: $500 (input) + $1,500 (output) = $2,000
- Savings: 96.25% by using GPT-4o-mini`,
        recommendations: [
          "Start with GPT-4o-mini for all evaluations",
          "Only upgrade to GPT-4o if accuracy < 90%",
          "Use batch API for additional 50% savings",
          "Monitor token usage with max_completion_tokens"
        ]
      },
      batchProcessingStrategy: {
        description: "Maximize efficiency with batch API",
        tips: [
          "Group evaluations by similar prompts",
          "Submit jobs during off-peak hours",
          "Use 24h completion window for best rates",
          "Process up to 50,000 requests per batch"
        ]
      }
    },
    commonErrors: {
      schemaValidation: {
        error: "Schema mismatch: Test data doesn't match schema",
        solution: `# Validate before submission
from jsonschema import validate, ValidationError

try:
    validate(instance=test_data, schema=item_schema)
except ValidationError as e:
    print(f"Schema error: {e.message}")
    print(f"Failed at: {e.path}")`
      },
      templateErrors: {
        error: "Invalid reference: {{item.field}} doesn't exist",
        solution: `# Check all template variables exist
import re

template = "Categorize: {{item.title}} - {{item.content}}"
variables = re.findall(r'{{item\\.([^}]+)}}', template)

for var in variables:
    if var not in test_data[0]:
        print(f"Missing field: {var}")`
      },
      rateLimits: {
        error: "Rate limit exceeded during evaluation",
        solution: "Use batch API or implement exponential backoff"
      },
      timeout: {
        error: "Evaluation timeout with large dataset",
        solution: "Split into smaller batches of 100-500 items"
      }
    },
    transitionNote: "Exact match works great for structured outputs, but what about evaluating quality, tone, and nuance? That's where Model-as-Judge comes in..."
  },

  6: {
    title: "Level 2: Model-as-Judge Evaluations",
    tldr: [
      "Model-as-judge enables nuanced evaluation beyond exact matching - essential for quality, tone, and subjective criteria",
      "GPT-4o achieves 0.67-0.81 Spearman correlation with human judges; o3 reduces errors by 20% vs o1",
      "Cost-performance sweet spot: GPT-4o-mini at $0.15/$0.60 per 1M tokens - 33x cheaper than GPT-4o with 85% of the accuracy"
    ],
    whyNeeded: [
      "Multiple valid responses exist - customer service can be helpful in many ways",
      "Quality has multiple dimensions requiring balanced assessment: empathy (30%), accuracy (40%), clarity (30%)",
      "Exact match fails when semantic meaning matters more than specific wording",
      "Human-like judgment needed for subjective qualities: tone, professionalism, completeness",
      "Real-world example: 'I understand your frustration' vs 'I get why you're upset' - both show empathy"
    ],
    rubricDesign: {
      structure: [
        "Clear judge role: 'You are evaluating customer service quality...'",
        "Specific criteria with weights: Acknowledgment (20%), Empathy (30%), Solution (40%), Professional tone (10%)",
        "Output format specification: Binary (GOOD/BAD), Scale (1-5), or Categories (Excellent/Good/Poor)",
        "Chain-of-Thought prompting: 'First assess X, then consider Y, finally determine Z'",
        "Calibration examples: Show 2-3 examples of each rating level"
      ],
      criteria: [
        "Acknowledge the issue: 'I see you're having trouble with...' (+20 points)",
        "Show empathy: 'I understand how frustrating this must be...' (+30 points)",
        "Provide clear solution: Specific steps, timeline, or escalation path (+40 points)",
        "Professional tone: No casual language, proper grammar (+10 points)",
        "Bonus: Proactive prevention advice (+10 points)"
      ],
      advancedPatterns: [
        "Hierarchical evaluation: First check if response addresses issue at all, then evaluate quality",
        "Multi-perspective: Evaluate from customer view, company policy view, and efficiency view",
        "Dynamic rubrics: Adjust criteria based on issue severity (billing vs technical)",
        "Compositional scoring: Break down into sub-scores then aggregate"
      ]
    },
    modelSelection: [
      "GPT-4o-mini ($0.15/$0.60 per 1M): Best value, 85% accuracy, 100ms latency - recommended starting point",
      "o3-mini: Coding/reasoning focus, web search capability, 82% accuracy at competitive pricing",
      "o4-mini (2025): Optimized for fast evals, excels at mathematical/coding tasks per AIME benchmarks",
      "GPT-4o ($5/$20 per 1M): Highest accuracy (88%), use only for critical evaluations",
      "o3 (standard): 20% error reduction vs o1, best for complex multi-step reasoning"
    ],
    performanceBenchmarks: {
      accuracy: {
        "GPT-4o": "88% agreement with human raters",
        "GPT-4o-mini": "85% agreement - only 3% drop for 33x cost savings",
        "o3-mini": "82% agreement, excels at technical content",
        "Claude-3-Haiku": "83% agreement, faster response times"
      },
      correlation: {
        "Spearman": "0.67-0.81 with human judgments (Shankar et al., 2024)",
        "Kendall-Tau": "Superior correlation using G-Eval framework",
        "Inter-rater": "0.72 between different LLM judges"
      },
      latency: {
        "GPT-4o-mini": "100-200ms per evaluation",
        "Batch processing": "10x throughput improvement",
        "Caching": "50ms for repeated rubrics"
      }
    },
    biassMitigation: [
      "Position bias (15-20% of judgments affected): Randomly swap response order in A/B comparisons",
      "Length bias (models favor longer responses): Normalize scores by response length or set max length",
      "Style bias (formal preferred over casual): Use rubrics that explicitly value appropriate style for context",
      "Self-preference bias (30% higher scores for same model): Always use different model for judging",
      "Anchoring bias: Randomize example order in few-shot prompts"
    ],
    calibrationTechniques: [
      "Human baseline: Label 100 examples manually, measure model agreement",
      "Consistency checking: Same input evaluated multiple times should score within 0.5 points",
      "Edge case validation: Intentionally bad/good examples should score 0/5",
      "Drift monitoring: Weekly recalibration to catch model behavior changes",
      "Multi-model consensus: Use 3 different models, flag cases with high variance"
    ],
    realApplications: [
      "Customer Service (Zendesk): Evaluate tone, solution quality, policy compliance - 89% correlation with CSAT",
      "Code Review (GitHub Copilot): Assess code quality, best practices, security - GPT-4.1 achieves 54.6% on SWE-bench",
      "Content Moderation (Discord): Check toxicity, relevance, constructiveness - 91% accuracy with human review",
      "Educational Assessment (Coursera): Grade essays, provide feedback - 0.82 correlation with instructor grades",
      "Medical Documentation (Epic): Evaluate clinical note quality, completeness - reduces review time by 60%",
      "Financial Analysis (Bloomberg): Assess report clarity, accuracy, insights - catches 85% of quality issues"
    ],
    whenNotToUse: [
      "Deterministic outputs: Use Level 1 string_check instead (1000x faster)",
      "High-stakes decisions: Medical diagnosis, legal judgments, financial trading require human oversight",
      "Real-time requirements: <50ms latency needs preclude API calls",
      "Domain expertise required: Specialized knowledge beyond training data",
      "Adversarial environment: Evaluation can be gamed if rubric is known",
      "Cost-prohibitive scale: Millions of daily evaluations may exceed budget"
    ],
    transitionNote: "Let's see how to implement model-as-judge with production-ready code, including calibration and bias mitigation..."
  },

  7: {
    title: "Level 2: Implementation",
    tldr: [
      "Complete production example with multi-criteria weighted scoring using G-Eval framework",
      "Advanced calibration techniques including position bias mitigation and consistency scoring",
      "A/B testing framework for comparing judge models with statistical significance",
      "Human-in-the-loop integration for continuous improvement and quality assurance"
    ],
    rubricEngineering: {
      basicBinaryPattern: {
        description: "Simple GOOD/BAD classification with Chain-of-Thought",
        code: `# Binary evaluation with reasoning
rubric = {
    "developer_message": '''You are evaluating customer service responses.
    
First, check if the response acknowledges the customer's issue.
Then, assess if it provides a helpful solution.
Finally, evaluate the overall tone and professionalism.

A GOOD response must:
1. Acknowledge the specific problem
2. Provide a clear solution or next steps
3. Maintain professional and empathetic tone

Respond with only: GOOD or BAD''',
    
    "user_message_template": '''Customer Issue: {{item.issue}}
Agent Response: {{sample.response}}

Is this a GOOD or BAD response?''',
    
    "passing_labels": ["GOOD"],
    "model": "gpt-4o-mini"  # Best cost/performance ratio
}`,
        keyPoints: [
          "Chain-of-thought prompting improves consistency",
          "Binary choice reduces ambiguity",
          "Explicit criteria prevent drift"
        ]
      },
      multiCriteriaWeighted: {
        description: "Advanced G-Eval pattern with weighted scoring",
        code: `# Multi-criteria evaluation with G-Eval framework
from typing import Dict, List
import json

class GEvalRubric:
    def __init__(self):
        self.criteria = {
            "acknowledgment": {
                "weight": 0.2,
                "prompt": "Does the response acknowledge the customer's specific issue? (1-5)",
                "examples": {
                    5: "I understand you're frustrated about the billing error of $47.50",
                    3: "I see you have a concern",
                    1: "How can I help you today?"
                }
            },
            "solution_quality": {
                "weight": 0.4,
                "prompt": "How helpful and actionable is the solution provided? (1-5)",
                "examples": {
                    5: "I've credited $47.50 to your account (ref: CR-12345). You'll see it within 24 hours.",
                    3: "We can look into this issue for you",
                    1: "Please contact billing department"
                }
            },
            "empathy": {
                "weight": 0.3,
                "prompt": "How well does the response demonstrate empathy? (1-5)",
                "examples": {
                    5: "I completely understand how concerning unexpected charges can be",
                    3: "I apologize for the inconvenience",
                    1: "This is our policy"
                }
            },
            "professionalism": {
                "weight": 0.1,
                "prompt": "How professional is the tone and language? (1-5)",
                "examples": {
                    5: "Professional, clear, grammatically correct",
                    3: "Mostly professional with minor issues",
                    1: "Casual, errors, or inappropriate"
                }
            }
        }
    
    def create_evaluation_prompt(self, criterion: str) -> str:
        return f'''You are evaluating customer service quality.
        
{self.criteria[criterion]["prompt"]}

Examples:
{json.dumps(self.criteria[criterion]["examples"], indent=2)}

Provide only a number 1-5.'''
    
    async def evaluate(self, response: str, issue: str) -> Dict[str, float]:
        scores = {}
        
        for criterion, config in self.criteria.items():
            # Get individual criterion score
            prompt = self.create_evaluation_prompt(criterion)
            score = await self.get_model_score(prompt, issue, response)
            scores[criterion] = score * config["weight"]
        
        # Calculate weighted total
        total = sum(scores.values())
        scores["total"] = total
        scores["pass"] = total >= 3.5  # Threshold for passing
        
        return scores`,
        benefits: [
          "Transparent scoring breakdown",
          "Adjustable weights based on business priorities",
          "Consistent evaluation across criteria",
          "Detailed feedback for improvement"
        ]
      },
      additiveScalePattern: {
        description: "Additive scoring for complex rubrics",
        code: `# Additive scale pattern - each positive attribute adds points
rubric_config = {
    "base_score": 0,
    "criteria": [
        {
            "name": "acknowledges_issue",
            "points": 20,
            "required": True,
            "pattern": r"understand|acknowledge|see that you|hear you"
        },
        {
            "name": "apologizes",
            "points": 15,
            "required": False,
            "pattern": r"sorry|apologize|regret"
        },
        {
            "name": "provides_timeline",
            "points": 25,
            "required": True,
            "pattern": r"\\d+\\s*(hours?|days?|business days?|minutes?)"
        },
        {
            "name": "offers_compensation",
            "points": 20,
            "required": False,
            "pattern": r"credit|refund|discount|compensate"
        },
        {
            "name": "prevents_future",
            "points": 20,
            "required": False,
            "pattern": r"prevent|avoid|future|going forward"
        }
    ],
    "passing_score": 60,
    "excellent_score": 85
}`
      }
    },
    calibrationImplementation: {
      positionBiassMitigation: {
        description: "Swap order to detect and mitigate position bias",
        code: `async def evaluate_with_position_calibration(
    response_a: str,
    response_b: str,
    rubric: str
) -> Dict[str, float]:
    """Evaluate both responses in both orders to detect position bias"""
    
    # Evaluate in original order
    result_1 = await model_judge(
        rubric=rubric,
        response_1=response_a,
        response_2=response_b
    )
    
    # Evaluate in swapped order
    result_2 = await model_judge(
        rubric=rubric,
        response_1=response_b,
        response_2=response_a
    )
    
    # Check for position bias
    if result_1.winner != opposite(result_2.winner):
        # Position bias detected
        bias_score = abs(result_1.confidence - result_2.confidence)
        
        if bias_score > 0.3:
            # High bias - use ensemble of models
            result_3 = await alternative_model_judge(
                rubric=rubric,
                response_a=response_a,
                response_b=response_b
            )
            return aggregate_results([result_1, result_2, result_3])
    
    # No significant bias - use average
    return {
        "winner": result_1.winner,
        "confidence": (result_1.confidence + result_2.confidence) / 2,
        "position_bias_detected": False
    }`,
        effectiveness: "Reduces position bias from 15-20% to under 5%"
      },
      consistencyCalibration: {
        description: "Ensure consistent scoring across multiple runs",
        code: `class ConsistencyCalibrator:
    def __init__(self, threshold: float = 0.2):
        self.threshold = threshold
        self.calibration_samples = []
    
    async def calibrate(self, eval_function, test_samples: List[Dict]):
        """Run multiple evaluations to measure consistency"""
        
        consistency_scores = []
        
        for sample in test_samples:
            scores = []
            
            # Evaluate same sample 5 times
            for _ in range(5):
                score = await eval_function(sample)
                scores.append(score)
            
            # Calculate variance
            variance = np.var(scores)
            consistency_scores.append({
                "sample": sample,
                "variance": variance,
                "scores": scores
            })
            
            # Flag high variance samples
            if variance > self.threshold:
                print(f"High variance detected: {variance}")
                print(f"Scores: {scores}")
                print(f"Sample: {sample['input'][:100]}...")
        
        # Overall consistency metric
        avg_variance = np.mean([s["variance"] for s in consistency_scores])
        
        return {
            "is_calibrated": avg_variance < self.threshold,
            "average_variance": avg_variance,
            "problem_samples": [s for s in consistency_scores if s["variance"] > self.threshold]
        }`,
        usage: "Run weekly to detect model drift or rubric ambiguity"
      }
    },
    testDataStrategy: [
      "Golden dataset: 100 human-validated examples across all quality levels",
      "Edge cases: Intentionally problematic responses (too short, off-topic, policy violations)",
      "Synthetic generation: Use GPT-4 to create responses at specific quality levels",
      "Position bias test set: Paired responses with known quality differences",
      "Temporal test: Same issues from different time periods to catch drift",
      "Multi-rater validation: 3+ humans rate each example, use majority vote"
    ],
    advancedTechniques: {
      multiModelEnsemble: {
        description: "Use multiple models for robust evaluation",
        code: `async def ensemble_evaluate(sample: Dict) -> Dict:
    """Use multiple models and aggregate results"""
    
    models = [
        {"name": "gpt-4o-mini", "weight": 0.4, "cost": 0.00015},
        {"name": "claude-3-haiku", "weight": 0.3, "cost": 0.00025},
        {"name": "gemini-1.5-flash", "weight": 0.3, "cost": 0.00010}
    ]
    
    results = []
    total_cost = 0
    
    # Parallel evaluation
    tasks = []
    for model in models:
        task = evaluate_with_model(sample, model["name"])
        tasks.append(task)
    
    model_results = await asyncio.gather(*tasks)
    
    # Weighted aggregation
    final_score = 0
    confidence_scores = []
    
    for i, result in enumerate(model_results):
        model = models[i]
        final_score += result["score"] * model["weight"]
        confidence_scores.append(result["confidence"])
        total_cost += model["cost"]
    
    # Flag disagreements
    score_variance = np.var([r["score"] for r in model_results])
    needs_human_review = score_variance > 0.5
    
    return {
        "score": final_score,
        "confidence": np.mean(confidence_scores),
        "model_agreement": 1 - score_variance,
        "needs_human_review": needs_human_review,
        "cost": total_cost,
        "model_scores": model_results
    }`
      },
      dynamicRubricSelection: {
        description: "Choose rubric based on input characteristics",
        code: `def select_optimal_rubric(issue_type: str, customer_tier: str) -> Dict:
    """Dynamically select evaluation criteria based on context"""
    
    rubric_matrix = {
        ("billing", "premium"): {
            "empathy_weight": 0.4,
            "solution_weight": 0.4,
            "speed_weight": 0.2
        },
        ("technical", "standard"): {
            "empathy_weight": 0.2,
            "solution_weight": 0.6,
            "speed_weight": 0.2
        },
        ("complaint", "any"): {
            "empathy_weight": 0.5,
            "solution_weight": 0.3,
            "speed_weight": 0.2
        }
    }
    
    # Get base rubric
    key = (issue_type.lower(), customer_tier.lower())
    if key not in rubric_matrix:
        key = (issue_type.lower(), "any")
    
    rubric = rubric_matrix.get(key, rubric_matrix[("complaint", "any")])
    
    # Adjust for special cases
    if "urgent" in issue_type:
        rubric["speed_weight"] += 0.1
        rubric["empathy_weight"] -= 0.1
    
    return rubric`
      }
    },
    abTestingFramework: {
      description: "Compare different judge models systematically",
      code: `class ABTestEvaluator:
    def __init__(self, baseline_model: str, challenger_model: str):
        self.baseline = baseline_model
        self.challenger = challenger_model
        self.results = {"baseline": [], "challenger": []}
    
    async def run_comparison(self, test_samples: List[Dict], iterations: int = 100):
        """Run A/B test between two judge models"""
        
        for sample in test_samples[:iterations]:
            # Baseline evaluation
            baseline_result = await self.evaluate_sample(sample, self.baseline)
            self.results["baseline"].append(baseline_result)
            
            # Challenger evaluation
            challenger_result = await self.evaluate_sample(sample, self.challenger)
            self.results["challenger"].append(challenger_result)
        
        # Statistical analysis
        from scipy import stats
        
        baseline_scores = [r["score"] for r in self.results["baseline"]]
        challenger_scores = [r["score"] for r in self.results["challenger"]]
        
        # Paired t-test for significance
        t_stat, p_value = stats.ttest_rel(baseline_scores, challenger_scores)
        
        # Cost analysis
        baseline_cost = sum(r["cost"] for r in self.results["baseline"])
        challenger_cost = sum(r["cost"] for r in self.results["challenger"])
        
        # Latency analysis
        baseline_latency = np.mean([r["latency_ms"] for r in self.results["baseline"]])
        challenger_latency = np.mean([r["latency_ms"] for r in self.results["challenger"]])
        
        return {
            "winner": self.challenger if np.mean(challenger_scores) > np.mean(baseline_scores) and p_value < 0.05 else self.baseline,
            "baseline_accuracy": np.mean(baseline_scores),
            "challenger_accuracy": np.mean(challenger_scores),
            "statistical_significance": p_value < 0.05,
            "p_value": p_value,
            "cost_difference": (challenger_cost - baseline_cost) / baseline_cost,
            "latency_difference": (challenger_latency - baseline_latency) / baseline_latency,
            "recommendation": self.generate_recommendation()
        }
    
    def generate_recommendation(self) -> str:
        """Generate actionable recommendation based on results"""
        
        acc_diff = self.results["challenger_accuracy"] - self.results["baseline_accuracy"]
        cost_diff = self.results["cost_difference"]
        
        if acc_diff > 0.05 and cost_diff < 0.5:
            return f"Switch to {self.challenger}: {acc_diff:.1%} accuracy gain worth {cost_diff:.1%} cost increase"
        elif acc_diff > 0 and cost_diff < 0:
            return f"Switch to {self.challenger}: Better AND cheaper!"
        else:
            return f"Keep {self.baseline}: Insufficient improvement to justify switch"`,
      benefits: [
        "Data-driven model selection",
        "Statistical significance testing",
        "Cost-benefit analysis",
        "Automated recommendations"
      ]
    },
    humanInTheLoopIntegration: {
      description: "Integrate human review for continuous improvement",
      code: `class HumanInTheLoopEvaluator:
    def __init__(self, confidence_threshold: float = 0.7):
        self.confidence_threshold = confidence_threshold
        self.human_queue = asyncio.Queue()
        self.feedback_history = []
    
    async def evaluate_with_escalation(self, sample: Dict) -> Dict:
        """Evaluate with automatic escalation to human review"""
        
        # Initial model evaluation
        model_result = await self.model_evaluate(sample)
        
        # Check if human review needed
        needs_human = (
            model_result["confidence"] < self.confidence_threshold or
            model_result["score_variance"] > 0.3 or
            sample.get("high_priority", False) or
            "legal" in sample.get("tags", [])
        )
        
        if needs_human:
            # Add to human review queue
            review_request = {
                "sample": sample,
                "model_result": model_result,
                "reason": self.determine_review_reason(model_result),
                "priority": self.calculate_priority(sample)
            }
            
            await self.human_queue.put(review_request)
            
            # Return model result with flag
            return {
                **model_result,
                "human_review_requested": True,
                "final": False
            }
        
        return {
            **model_result,
            "human_review_requested": False,
            "final": True
        }
    
    async def process_human_feedback(self, review_id: str, human_result: Dict):
        """Process human feedback to improve model"""
        
        # Store feedback
        self.feedback_history.append({
            "review_id": review_id,
            "model_result": review_result["model_result"],
            "human_result": human_result,
            "timestamp": datetime.now()
        })
        
        # Analyze disagreements
        if abs(human_result["score"] - model_result["score"]) > 0.5:
            # Significant disagreement - add to retraining set
            await self.add_to_training_set({
                "input": review_result["sample"],
                "expected_score": human_result["score"],
                "expected_reasoning": human_result["reasoning"]
            })
        
        # Update calibration if pattern detected
        if len(self.feedback_history) % 100 == 0:
            await self.recalibrate_model()
    
    def generate_review_dashboard(self) -> Dict:
        """Generate metrics for human review efficiency"""
        
        total_reviews = len(self.feedback_history)
        agreement_rate = sum(
            1 for f in self.feedback_history 
            if abs(f["model_result"]["score"] - f["human_result"]["score"]) < 0.3
        ) / total_reviews
        
        return {
            "total_reviews": total_reviews,
            "model_human_agreement": agreement_rate,
            "average_review_time": self.calculate_avg_review_time(),
            "most_common_disagreements": self.analyze_disagreement_patterns(),
            "cost_savings": total_reviews * 0.90 * AVG_HUMAN_REVIEW_COST
        }`,
      benefits: [
        "Continuous model improvement",
        "Handles edge cases gracefully",
        "Builds training data automatically",
        "Reduces human workload by 90%"
      ]
    },
    debuggingTips: [
      "Position bias detection: Compare scores when order swapped - >0.5 difference indicates bias",
      "Variance analysis: Run same evaluation 5x - variance >0.2 suggests ambiguous rubric",
      "Temperature tuning: Lower temperature (0.1-0.3) for more consistent judging",
      "Calibration dataset: Maintain 100+ golden examples, re-evaluate weekly",
      "Model drift monitoring: Track average scores over time, alert on ±0.1 shifts",
      "Cost optimization: Use GPT-4o-mini first, escalate only when confidence <0.7",
      "Debug prompts: Add 'explain your reasoning' to understand model decisions",
      "A/B testing: Always compare new rubrics against validated baseline"
    ],
    transitionNote: "Sometimes even model-as-judge isn't enough. For complex validation requiring code execution or external data, we need custom Python evaluations..."
  },

  8: {
    title: "Level 3: Custom Python Evaluations",
    tldr: [
      "Custom Python evaluations run in sandboxed environments with Docker/Kubernetes isolation for security",
      "Performance: 50-200ms simple validations, 1-5s complex computations, supports 10-100 concurrent executions",
      "Essential for mathematical validation, code execution testing, API response validation, and complex business logic",
      "Production usage across industries: Finance (trading algorithms), Healthcare (diagnosis validation), Legal (compliance checking)"
    ],
    whenToUse: {
      perfect: [
        "Mathematical computation validation with precision requirements (financial calculations, scientific models)",
        "Code execution testing - verify generated code produces expected outputs safely",
        "API response validation - check status codes, response times, schema compliance",
        "Complex business rule verification spanning multiple conditions and dependencies",
        "Statistical analysis requiring numpy/scipy operations on large datasets",
        "Multi-step workflow validation with state transitions",
        "External system integration requiring database lookups or API calls",
        "Performance benchmarking when execution time is critical"
      ],
      avoid: [
        "Simple string matching (use Level 1 string_check - 1000x faster)",
        "Subjective quality assessment (use Level 2 label_model)",
        "When network access could create security risks",
        "For evaluations requiring real-time response (<50ms)"
      ]
    },
    numberDecompositionExample: {
      challenge: "Find two numbers that sum to a target value",
      validation: [
        "Parse JSON output from model using ast.literal_eval for security",
        "Validate data types and ranges (e.g., positive integers only)",
        "Handle edge cases: floating point precision, integer overflow",
        "Return granular scores: 1.0 for exact match, 0.8 for close approximation, 0.0 for failure"
      ],
      advancedExample: `
def grade(sample, item):
    import json
    import math
    
    # Parse with timeout protection
    try:
        output = json.loads(sample['output_json'])
        target = item['target']
        
        # Type validation
        if not all(isinstance(output.get(k), (int, float)) 
                  for k in ['number1', 'number2']):
            return 0.0
        
        # Precision handling for floats
        actual_sum = output['number1'] + output['number2']
        if math.isclose(actual_sum, target, rel_tol=1e-9):
            return 1.0
        
        # Partial credit for close answers
        error_ratio = abs(actual_sum - target) / abs(target)
        if error_ratio < 0.01:  # Within 1%
            return 0.8
            
        return 0.0
        
    except (json.JSONDecodeError, KeyError, TypeError):
        return 0.0
`,
      whyCustom: "Enables complex validation logic with partial scoring and error handling"
    },
    executionEnvironment: [
      "Sandboxed containers with configurable isolation levels: Docker (default), Kubernetes pods, or cloud functions",
      "Resource limits: 512MB-2GB memory, 30s default timeout (configurable to 5 minutes)",
      "Network isolation: No external access by default, whitelist-based exceptions for approved APIs",
      "File system: Read-only except for /tmp, automatic cleanup after execution",
      "Security: Seccomp filters, capability dropping, user namespace isolation"
    ],
    availableLibraries: [
      "Standard library: json, ast, re, math, datetime, collections, itertools",
      "Scientific computing: Limited numpy/scipy operations (no arbitrary code execution)",
      "Cryptography: hashlib for checksums, hmac for authentication",
      "Data validation: jsonschema, pydantic models (pre-approved versions)",
      "External services: Approved HTTP clients with timeout/retry logic"
    ],
    complexValidationExamples: {
      codeExecution: {
        description: "Validate generated code produces expected outputs",
        example: `
def grade_code_output(sample, item):
    import subprocess
    import tempfile
    import os
    
    code = sample['generated_code']
    expected_output = item['expected_output']
    
    # Security: Use ast to validate before execution
    try:
        import ast
        ast.parse(code)
    except SyntaxError:
        return 0.0
    
    # Execute in isolated subprocess with timeout
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(code)
        f.flush()
        
        try:
            result = subprocess.run(
                ['python', f.name],
                capture_output=True,
                text=True,
                timeout=5,
                check=True
            )
            
            # Compare outputs
            actual = result.stdout.strip()
            if actual == expected_output:
                return 1.0
            elif actual.lower() == expected_output.lower():
                return 0.9  # Case mismatch
            else:
                return 0.0
                
        except subprocess.TimeoutExpired:
            return 0.0  # Code too slow
        except subprocess.CalledProcessError:
            return 0.0  # Runtime error
        finally:
            os.unlink(f.name)
`
      },
      apiResponseValidation: {
        description: "Validate API responses meet schema and performance requirements",
        example: `
def grade_api_response(sample, item):
    import json
    import jsonschema
    from datetime import datetime
    
    response = json.loads(sample['api_response'])
    schema = item['expected_schema']
    
    # Schema validation
    try:
        jsonschema.validate(response['body'], schema)
    except jsonschema.ValidationError:
        return 0.0
    
    # Status code check
    if response['status_code'] != item['expected_status']:
        return 0.0
    
    # Performance validation
    response_time = response['response_time_ms']
    if response_time > item['max_response_time_ms']:
        return 0.5  # Correct but slow
    
    # Business logic validation
    if 'price' in response['body']:
        price = response['body']['price']
        if price < 0 or price > 1000000:
            return 0.0  # Invalid price range
    
    return 1.0
`
      },
      businessRuleCompliance: {
        description: "Validate complex business rules with multiple conditions",
        example: `
def grade_loan_decision(sample, item):
    decision = sample['loan_decision']
    applicant = item['applicant_data']
    
    # Complex business rules
    credit_score = applicant['credit_score']
    income = applicant['annual_income']
    debt_ratio = applicant['debt_to_income_ratio']
    loan_amount = applicant['requested_amount']
    
    # Rule engine
    should_approve = (
        credit_score >= 700 and
        income >= loan_amount * 0.3 and
        debt_ratio < 0.43
    )
    
    # Special cases
    if credit_score >= 800 and income >= loan_amount * 0.25:
        should_approve = True  # Excellent credit exception
    
    if applicant['bankruptcy_history']:
        should_approve = False  # Hard reject
    
    # Grade decision accuracy
    model_approved = decision['approved']
    if model_approved == should_approve:
        # Check interest rate if approved
        if model_approved and 'interest_rate' in decision:
            rate = decision['interest_rate']
            expected_rate = calculate_rate(credit_score, loan_amount)
            if abs(rate - expected_rate) < 0.5:
                return 1.0
            else:
                return 0.8  # Correct decision, wrong rate
        return 1.0
    
    return 0.0
`
      }
    },
    performanceBenchmarks: {
      executionTimes: {
        simple_validation: "50-200ms (JSON parsing, basic math)",
        medium_complexity: "200ms-1s (regex matching, data transformation)",
        complex_computation: "1-5s (code execution, external API calls)",
        batch_processing: "5-30s (evaluating 100+ samples)"
      },
      resourceLimits: {
        memory: "512MB default, 2GB maximum",
        cpu: "1 vCPU default, 4 vCPU maximum",
        timeout: "30s default, 5 minutes maximum",
        concurrent_executions: "10-100 based on complexity"
      },
      optimization_tips: [
        "Pre-compile regex patterns outside the grading loop",
        "Use connection pooling for database queries",
        "Implement caching for expensive computations",
        "Batch API calls when validating multiple samples"
      ]
    },
    integrationPatterns: {
      webhookCallbacks: {
        description: "Async validation with external services",
        pattern: `
async def grade_with_webhook(sample, item):
    webhook_url = os.environ['VALIDATION_WEBHOOK']
    
    # Post to external validator
    async with aiohttp.ClientSession() as session:
        payload = {
            'model_output': sample,
            'expected': item,
            'callback_url': f"{BASE_URL}/grade/{sample['id']}"
        }
        
        async with session.post(
            webhook_url,
            json=payload,
            timeout=aiohttp.ClientTimeout(total=30)
        ) as response:
            if response.status == 202:
                # Async processing accepted
                return None  # Will be updated via callback
            else:
                return 0.0  # Validation service error
`
      },
      databaseValidation: {
        description: "Validate against reference data",
        pattern: `
def grade_with_database(sample, item):
    import psycopg2
    from contextlib import closing
    
    # Securely get connection from pool
    with get_db_connection() as conn:
        with closing(conn.cursor()) as cur:
            # Validate product exists
            cur.execute(
                "SELECT price, inventory FROM products WHERE sku = %s",
                (sample['product_sku'],)
            )
            result = cur.fetchone()
            
            if not result:
                return 0.0  # Invalid SKU
            
            actual_price, inventory = result
            
            # Validate price match
            if abs(sample['price'] - actual_price) > 0.01:
                return 0.0
            
            # Validate inventory
            if sample['quantity'] > inventory:
                return 0.5  # Partial credit
            
            return 1.0
`
      }
    },
    asyncEvaluationPatterns: {
      promiseBasedValidation: "Handle long-running validations with promises and callbacks",
      batchProcessing: "Evaluate multiple samples in parallel for 10x speedup",
      streamingValidation: "Process outputs as they're generated for real-time feedback",
      eventDrivenEvaluation: "Trigger evaluations based on model events or thresholds",
      pipelineValidation: "Chain multiple validators for comprehensive checking"
    },
    realProductionExamples: {
      finance: {
        useCase: "Trading algorithm validation",
        implementation: "Validate trade execution logic, risk calculations, regulatory compliance",
        example: "Morgan Stanley validates 10M+ trades daily with custom Python evaluators",
        metrics: "99.99% accuracy required, <100ms latency, zero false negatives on compliance"
      },
      healthcare: {
        useCase: "Medical diagnosis validation",
        implementation: "Verify diagnosis codes, drug interactions, treatment protocols",
        example: "Epic Systems validates AI-suggested diagnoses against clinical guidelines",
        metrics: "FDA requires 95%+ sensitivity, comprehensive audit trails"
      },
      ecommerce: {
        useCase: "Dynamic pricing validation",
        implementation: "Check price calculations, inventory rules, discount eligibility",
        example: "Amazon validates millions of price changes against business rules",
        metrics: "Sub-second validation, handles Black Friday scale (100K TPS)"
      },
      legal: {
        useCase: "Contract clause extraction and validation",
        implementation: "Verify extracted clauses, check regulatory compliance, flag risks",
        example: "LegalZoom validates AI-extracted terms against jurisdiction requirements",
        metrics: "100% accuracy on critical clauses, 48-hour SLA for complex documents"
      },
      education: {
        useCase: "Automated grading with rubric validation",
        implementation: "Grade code assignments, validate mathematical proofs, check plagiarism",
        example: "Coursera grades 1M+ programming assignments monthly",
        metrics: "Inter-rater reliability >0.85, handles 50+ programming languages"
      }
    },
    securityBestPractices: [
      "Never execute untrusted code directly - always validate with ast.parse() first",
      "Use subprocess with strict timeouts and resource limits for code execution",
      "Implement defense in depth: container isolation + seccomp + capability dropping",
      "Rotate API keys immediately if exposed - use key rotation automation",
      "Log all evaluation executions for security auditing",
      "Implement rate limiting to prevent resource exhaustion",
      "Use separate execution environments for different trust levels",
      "Regular security audits of custom evaluation code"
    ],
    transitionNote: "Let's see a complete production-ready implementation with advanced error handling and performance optimization..."
  },

  9: {
    title: "Level 3: Production-Grade Implementation",
    tldr: [
      "Enterprise-ready custom evaluation with async processing and external APIs",
      "Advanced Pydantic validation with nested schemas and custom validators",
      "Production patterns: circuit breakers, distributed tracing, observability",
      "Real-world examples: code execution, mathematical proofs, multi-model consensus"
    ],
    implementationDetails: {
      asyncGraderArchitecture: [
        "FastAPI async endpoints handle concurrent evaluation requests",
        "Asyncio task groups process batches for 10x throughput",
        "Redis queue manages evaluation jobs with retry logic",
        "Correlation IDs enable distributed tracing across services"
      ],
      advancedPydanticValidation: [
        "Nested models with recursive validation for complex outputs",
        "Custom validators using @field_validator for business logic",
        "Partial JSON parsing with pydantic_core.from_json for streaming",
        "Union types handle multiple valid response formats"
      ],
      externalAPIIntegration: [
        "Code execution sandbox API for validating generated code",
        "Wolfram Alpha API for mathematical proof verification",
        "Fact-checking services for knowledge validation",
        "Circuit breakers prevent cascade failures (pybreaker pattern)"
      ],
      productionGraderExample: `
async def grade(sample: dict, item: dict, context: EvalContext) -> float:
    """Production grader with external validation and monitoring"""
    
    # Structured logging with correlation ID
    logger = context.get_logger()
    correlation_id = context.correlation_id
    
    try:
        # Parse with Pydantic model and custom validators
        output = MathProofOutput.model_validate_json(
            sample['output_json'],
            context={"strict": True}
        )
        
        # External API validation with circuit breaker
        async with context.circuit_breaker("wolfram_api"):
            proof_valid = await validate_mathematical_proof(
                output.proof_steps,
                target=item['target'],
                timeout=5.0
            )
        
        # Multi-criteria scoring with weights
        scores = {
            "correctness": float(output.result == item['target']),
            "proof_validity": float(proof_valid),
            "explanation_quality": await score_explanation(output.explanation)
        }
        
        # Weighted average with business logic
        final_score = (
            scores["correctness"] * 0.5 +
            scores["proof_validity"] * 0.3 +
            scores["explanation_quality"] * 0.2
        )
        
        # Emit metrics for monitoring
        await context.metrics.record(
            "eval.score",
            final_score,
            tags={"eval_name": context.eval_name, "model": context.model}
        )
        
        return final_score
        
    except ValidationError as e:
        logger.error(f"Validation failed: {e}", extra={"correlation_id": correlation_id})
        await context.metrics.increment("eval.validation_errors")
        return 0.0
    except ExternalAPIError as e:
        # Graceful degradation when external service unavailable
        logger.warning(f"External API failed, using fallback: {e}")
        return fallback_scoring(sample, item)
    `
    },
    testCaseDesign: [
      "Stress testing: 1000 concurrent requests to identify bottlenecks",
      "Chaos engineering: Random API failures to test resilience",
      "Edge cases: Malformed JSON, infinite loops, resource exhaustion",
      "Real production data: Anonymized samples from actual usage",
      "Synthetic adversarial examples: GPT-4 generated edge cases",
      "Performance benchmarks: P50/P95/P99 latency requirements"
    ],
    errorHandling: [
      "Comprehensive error taxonomy with specific handling per type",
      "Circuit breakers with half-open state for gradual recovery",
      "Exponential backoff with jitter for retry logic",
      "Dead letter queues for failed evaluations requiring manual review",
      "Structured error responses with actionable remediation steps",
      "SLA monitoring with automatic alerting on degradation"
    ],
    monitoringObservability: [
      "OpenTelemetry instrumentation for distributed tracing",
      "Prometheus metrics: latency histograms, error rates, throughput",
      "Grafana dashboards showing eval performance by model/prompt",
      "Log aggregation with Elasticsearch for failure analysis",
      "Real-time alerts on accuracy regression or performance degradation",
      "A/B testing framework comparing evaluation strategies"
    ],
    performanceOptimization: [
      "Response caching with TTL based on prompt stability",
      "Batch processing for similar evaluations (10x throughput)",
      "GPU acceleration for embedding-based similarity scoring",
      "Connection pooling for external API calls",
      "Async I/O throughout the stack to maximize concurrency",
      "Horizontal scaling with Kubernetes HPA based on queue depth"
    ],
    extensionIdeas: [
      "Multi-model ensemble: Aggregate scores from GPT-4, Claude, Gemini",
      "Cost optimization: Route to cheaper models based on complexity",
      "Evaluation marketplace: Share/monetize custom evaluators",
      "AutoML for grader functions: Learn optimal scoring from human labels",
      "Evaluation drift detection: Alert when model behavior changes",
      "Integration with MLOps platforms: Weights & Biases, MLflow, Comet"
    ],
    transitionNote: "With this production foundation in place, let's explore how the iterative improvement process transforms your LLM applications..."
  },

  10: {
    title: "The Development Process That Works",
    tldr: [
      "Data-driven iteration replaces guesswork - Autobound increased revenue 20x with systematic eval approach",
      "Each evaluation round reveals specific improvements: 42% → 72% → 89% → 95% is typical progression",
      "Enterprise teams see 50% faster decision-making and 40% ROI within 6 months (BCG research)",
      "Real production data beats synthetic - mine your logs for the 20% edge cases causing 80% of failures"
    ],
    sixStepProcess: [
      "Start with 20-50 real examples from production logs - not synthetic data. Microsoft study: real data reveals 3x more failure modes",
      "Run baseline evaluation to establish starting accuracy. Median first run: 67% (don't be discouraged - this is normal!)",
      "Analyze failures systematically using clustering - 80% typically fall into 3-5 patterns you can address",
      "Improve based on data patterns, not intuition. Each iteration should target the biggest failure cluster",
      "Measure improvement objectively with metrics - track accuracy, precision, recall, and failure categories",
      "Add edge cases as you discover them - maintain a 'hall of shame' for tricky examples that broke production"
    ],
    newsCategorizationJourney: {
      baseline: "42% - Vague prompt: 'Categorize this headline' - model invented categories",
      iteration1: "72% - Added explicit category list [Technology, Business, Sports...] but format still varied",
      iteration2: "89% - Added 'Output ONLY the category name' - fixed most formatting issues",
      iteration3: "95% - Added 3 examples showing edge cases - 'Apple earnings' → Business not Technology",
      insights: "Each iteration addressed the top failure pattern from previous round"
    },
    industrySpecificJourneys: {
      retailAnalytics: {
        baseline: "38% - Generic prompt for product categorization",
        iteration1: "64% - Added taxonomy hierarchy",
        iteration2: "81% - Handled multi-category products",
        iteration3: "92% - Edge cases for seasonal items",
        timeframe: "2 weeks to production"
      },
      healthcarePlanning: {
        baseline: "45% - Basic symptom to diagnosis mapping",
        iteration1: "71% - Added ICD-10 code constraints",
        iteration2: "86% - Handled comorbidities",
        iteration3: "94% - Rare disease edge cases",
        compliance: "FDA audit-ready with full traceability"
      },
      financeCategorization: {
        baseline: "52% - Transaction classification",
        iteration1: "78% - Added merchant category codes",
        iteration2: "91% - Handled international transactions",
        iteration3: "97% - Edge cases for split transactions",
        impact: "$2.3M in recovered revenue from better categorization"
      }
    },
    keyDiscoveries: [
      "Iteration velocity matters more than perfection - ship at 90% and improve in production with monitoring",
      "Clear constraints beat vague instructions - 'Output ONLY X' prevents 90% of format errors",
      "Multi-stage validation catches different errors - combine exact match for format, model judge for quality",
      "Real user data reveals edge cases you'd never imagine - one customer found users typing in emoji",
      "Version everything together - prompt + eval config + test data must move as one unit",
      "The L4 Framework pattern: 87.3% of failures detected through systematic decomposition"
    ],
    toolsAndFrameworks: {
      evaluationPlatforms: [
        "OpenAI Evals API - Native integration, best for OpenAI models",
        "Vellum - Visual workflow builder for non-technical teams",
        "L4 (JudgeDecomposition) - 87.3% failure detection rate",
        "Azure AI Studio - Enterprise governance and compliance",
        "W&B Launch - MLOps integration with experiment tracking"
      ],
      iterationPatterns: [
        "FAILS Framework: Extract literal failures, categorize, prioritize by frequency",
        "Chain-of-Thought Iteration: Add reasoning steps when accuracy plateaus",
        "Curriculum Learning: Start with easy examples, gradually increase difficulty",
        "A/B Testing: Run old vs new prompts in parallel on production traffic"
      ]
    },
    failurePatternAnalysis: {
      hardwareFaults: {
        gpuMemoryErrors: "Out of memory on long contexts - solution: implement chunking",
        networkTimeouts: "API calls timing out - solution: circuit breakers + retries",
        diskSpaceExhaustion: "Logs filling disk - solution: rotate logs, use object storage"
      },
      distributedSystemFailures: {
        raceconditions: "Concurrent evaluations corrupting state - solution: proper locking",
        cascadeFailures: "One bad eval brings down system - solution: bulkheads",
        dataInconsistency: "Stale cache causing wrong results - solution: TTL + versioning"
      },
      resolutionStrategies: [
        "Implement circuit breakers for all external dependencies",
        "Use idempotency keys to prevent duplicate evaluations",
        "Add comprehensive health checks at each layer",
        "Implement gradual rollout for eval changes"
      ]
    },
    teamCollaborationPatterns: [
      "Cross-functional involvement: Engineers write evals, PMs define success criteria, Data Scientists analyze results",
      "Weekly eval review meetings: Review failure patterns, prioritize improvements, celebrate wins",
      "Shared ownership: Everyone can add test cases, not just engineers",
      "Documentation culture: Every eval improvement documented with rationale",
      "Gamification: Leaderboard for who fixes most eval failures",
      "New role emerging: 'Prompt Reliability Engineer' - owns eval infrastructure and standards"
    ],
    timeInvestment: {
      initial_setup: "2-4 hours including environment setup and first eval",
      per_iteration: "15-30 minutes to analyze failures and update prompt",
      total_to_production: "1-2 days for 90% accuracy, 3-5 days for 95%+",
      ongoing_maintenance: "2-4 hours/month for monitoring and edge cases",
      roi_timeline: "2-3 weeks to positive ROI through reduced manual review",
      comparison: "Without evals: 2-4 weeks of ad-hoc testing, 60% accuracy in production"
    },
    costAnalysis: {
      evaluationCosts: [
        "Development: $50-200 in API costs to reach 90% accuracy",
        "Production: $0.05-0.50 per 1,000 evaluations ongoing",
        "Human baseline: 100 examples @ $2/each = $200 one-time"
      ],
      savingsCalculation: [
        "Reduced manual review: 10 hours/week @ $50/hour = $2,000/month",
        "Fewer production errors: 5 incidents prevented @ $5,000/incident = $25,000/month",
        "Faster development: 50% time reduction = 1 FTE equivalent saved"
      ],
      totalROI: "Typical 6-month ROI: 40% (BCG), with some teams seeing 400%+"
    },
    transitionNote: "Now that you understand the process, let's talk about practical implementation patterns that separate successful teams from those who struggle..."
  },

  11: {
    title: "Practical Implementation Guide",
    tldr: [
      "Start small with one feature, prove ROI in 2 weeks - 87% of successful implementations begin this way",
      "Use 80% production data, 20% synthetic edge cases - real data reveals 3x more failure modes",
      "Version control everything: prompts (v1.2.3), evals, test data - treat as code artifacts",
      "Automate from day one: CI/CD integration prevents 95% of regression issues"
    ],
    bestPractices: {
      startSmall: {
        what: "Pick your single most problematic LLM feature - usually classification or extraction",
        why: "Quick wins build momentum; 2-week sprints show tangible ROI to stakeholders",
        example: "Zendesk started with ticket classification: 38% → 92% accuracy in 10 days",
        antipattern: "Don't try to eval everything at once - leads to analysis paralysis"
      },
      useProductionData: {
        what: "Export last 30 days of logs, sample 100-500 real user inputs",
        why: "Synthetic data misses edge cases - PayPal found 67% of failures from unexpected formats",
        example: "SELECT user_input, expected_output FROM logs WHERE timestamp > NOW() - INTERVAL '30 days' ORDER BY RANDOM() LIMIT 200",
        privacyCompliance: "Use Skyflow tokenization or Private AI to strip PII before evaluation"
      },
      versionEverything: {
        what: "Semantic versioning for prompts (2.1.0), link to eval configs and test data",
        why: "Enables rollback, A/B testing, and audit trails for compliance",
        example: `{
  "prompt_version": "2.1.0",
  "eval_config": "customer_service_v2.1.json",
  "test_data": "cs_testset_2024_01_v2.1.jsonl",
  "git_commit": "a1b2c3d",
  "compatibility": {
    "min_model": "gpt-4-0613",
    "max_model": "gpt-4-turbo-2024-04-09"
  }
}`,
        tools: ["PromptLayer", "Vellum", "LangSmith", "Weights & Biases"]
      }
    },
    ciCdPipeline: {
      githubActionsExample: `name: LLM Evaluation Pipeline
on:
  pull_request:
    paths: ['prompts/**', 'configs/**', 'tests/**']

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          
      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.cache/pip
          key: $\{{ runner.os }}-pip-$\{{ hashFiles('requirements.txt') }}
          
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install promptfoo  # Evaluation framework
          
      - name: Run evaluations
        env:
          OPENAI_API_KEY: $\{{ secrets.OPENAI_API_KEY }}
        run: |
          # Run with Promptfoo for detailed analysis
          promptfoo eval -c configs/eval_config.yaml -o results/
          
          # Custom threshold check
          python scripts/check_thresholds.py \\
            --results results/eval_results.json \\
            --thresholds configs/thresholds.yaml
            
      - name: Generate report
        run: |
          python scripts/generate_report.py \\
            --results results/ \\
            --format markdown \\
            --output eval_report.md
            
      - name: Comment on PR
        uses: thollander/actions-comment-pull-request@v2
        with:
          filePath: eval_report.md
          
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: evaluation-results
          path: results/
          
      - name: Fail on regression
        run: |
          if [ -f results/regression_detected ]; then
            echo "❌ Evaluation regression detected!"
            exit 1
          fi`,
      thresholdScript: `# scripts/check_thresholds.py
import json
import yaml
import sys

def check_thresholds(results_file, thresholds_file):
    with open(results_file) as f:
        results = json.load(f)
    
    with open(thresholds_file) as f:
        thresholds = yaml.safe_load(f)
    
    failures = []
    
    for metric, threshold in thresholds.items():
        actual = results.get(metric, 0)
        if actual < threshold:
            failures.append(f"{metric}: {actual:.2%} < {threshold:.2%}")
    
    if failures:
        print("❌ Threshold violations:")
        for failure in failures:
            print(f"  - {failure}")
        
        # Create marker file for CI
        open("results/regression_detected", "w").close()
        sys.exit(1)
    else:
        print("✅ All thresholds passed!")`,
      integrationOptions: [
        "GitHub Actions + Promptfoo: Best for open source",
        "Azure DevOps + AI Studio: Enterprise compliance",
        "GitLab CI + Vellum: Visual workflow management",
        "Jenkins + Custom: Maximum flexibility"
      ]
    },
    dashboardMonitoring: {
      datadogIntegration: {
        setup: `# Install Datadog LLM Observability
pip install ddtrace

# Initialize in your code
from ddtrace.llmobs import LLMObs

llmobs = LLMObs()
llmobs.enable()

# Track evaluations
@llmobs.evaluation
def run_eval(prompt, test_cases):
    results = evaluate_prompt(prompt, test_cases)
    
    # Log metrics
    llmobs.log_metric("accuracy", results.accuracy)
    llmobs.log_metric("latency_p95", results.p95_latency)
    
    return results`,
        features: [
          "Real-time accuracy tracking",
          "Prompt version comparison",
          "Cost analysis by model/prompt",
          "Anomaly detection for drift"
        ],
        alerts: `# Datadog monitor configuration
monitors:
  - name: "LLM Accuracy Drop"
    type: "metric alert"
    query: "avg(last_5m):avg:llm.eval.accuracy{env:prod} < 0.9"
    message: "LLM accuracy dropped below 90%! @pagerduty"
    
  - name: "Evaluation Latency Spike"
    type: "metric alert"
    query: "avg(last_5m):avg:llm.eval.latency.p95{*} > 1000"
    message: "Evaluation latency exceeding 1s"`
      },
      openSourceAlternatives: [
        "Phoenix by Arize: LLM-specific observability, free tier available",
        "Langfuse: Open source, self-hostable, great for privacy-conscious teams",
        "Opik by Comet: Integrated with experiment tracking",
        "SigNoz: Full-stack observability with LLM support"
      ]
    },
    teamAdoption: {
      changeManagement: {
        week1_2: "Education phase: Workshop on 'Why Evals Matter' with failure stories",
        week3_4: "Pilot phase: One team implements evals for their highest-impact feature",
        week5_8: "Expansion phase: Share pilot results, other teams start adopting",
        week9_12: "Standardization phase: Establish company-wide eval practices",
        ongoing: "Center of Excellence: Dedicated team maintains eval infrastructure"
      },
      incentiveStructures: [
        "Include eval coverage in sprint goals (target: 90% of LLM features)",
        "Celebrate eval wins in all-hands (show before/after accuracy)",
        "Eval champion program: Recognize contributors monthly",
        "Career growth: 'Prompt Reliability Engineer' as new role"
      ],
      commonResistance: {
        "It slows us down": "Show data: Teams with evals ship 2x faster after month 1",
        "Too expensive": "Calculate ROI: One production incident costs more than 6 months of evals",
        "We don't have time": "Start with 1 hour/week eval rotation",
        "Our use case is unique": "Every team thinks this - use the framework anyway"
      }
    },
    dataPrivacy: {
      complianceFramework: {
        step1: "Audit production logs for PII using tools like Private AI or Google DLP",
        step2: "Implement data minimization - only extract necessary fields",
        step3: "Tokenize sensitive data before evaluation (Skyflow, Hashicorp Vault)",
        step4: "Use synthetic data generation for sensitive domains (medical, financial)"
      },
      tools: [
        "Private AI: Automated PII detection and redaction",
        "Skyflow: Data privacy vault with tokenization",
        "Presidio (Microsoft): Open source PII analyzer",
        "Amazon Macie: Discovers and protects sensitive data"
      ],
      bestPractices: [
        "Never store raw PII in evaluation datasets",
        "Use differential privacy for aggregate metrics",
        "Implement audit logs for all data access",
        "Regular privacy impact assessments"
      ]
    },
    roiMeasurement: {
      metrics: {
        reduction_in_incidents: "Track weekly production issues before/after evals",
        time_saved: "Measure hours spent on manual testing and debugging",
        accuracy_improvement: "Document baseline → current accuracy for each feature",
        development_velocity: "Track time from idea to production deployment"
      },
      calculationExample: `# ROI Calculation Example
baseline_incidents_per_month = 12
post_eval_incidents_per_month = 3
incident_cost = $5000  # Engineering time, customer impact

baseline_accuracy = 0.67
current_accuracy = 0.94
manual_review_hours_saved = 20  # per week
hourly_rate = $150

monthly_incident_savings = (baseline_incidents - post_eval_incidents) * incident_cost
monthly_time_savings = manual_review_hours_saved * 4 * hourly_rate

total_monthly_benefit = monthly_incident_savings + monthly_time_savings  # $57,000
monthly_eval_cost = $500  # API costs + maintenance

roi = (total_monthly_benefit - monthly_eval_cost) / monthly_eval_cost * 100  # 11,300%
payback_period = initial_investment / monthly_net_benefit  # ~1.1 months`,
      realWorldResults: [
        "Klarna: 50% reduction in customer service errors",
        "Notion: 40% faster feature development",
        "Zapier: $2.3M annual savings from automated QA"
      ]
    },
    migrationStrategy: {
      phase1_baseline: {
        duration: "Week 1-2",
        activities: [
          "Document current testing process",
          "Identify highest-impact LLM feature",
          "Export 30 days of production data",
          "Run baseline evaluation (expect 40-70% accuracy)"
        ],
        deliverable: "Baseline accuracy report and improvement roadmap"
      },
      phase2_pilot: {
        duration: "Week 3-6",
        activities: [
          "Implement automated evals for pilot feature",
          "Set up CI/CD integration",
          "Create monitoring dashboard",
          "Run daily improvement iterations"
        ],
        deliverable: "90%+ accuracy on pilot feature"
      },
      phase3_scale: {
        duration: "Week 7-12",
        activities: [
          "Expand to 5-10 features",
          "Train team on eval creation",
          "Establish eval review process",
          "Build shared test case library"
        ],
        deliverable: "Eval coverage for all critical LLM features"
      },
      phase4_optimize: {
        duration: "Ongoing",
        activities: [
          "A/B test evaluation strategies",
          "Optimize costs with batching",
          "Build custom evaluators for complex cases",
          "Share learnings with community"
        ],
        deliverable: "World-class LLM reliability infrastructure"
      }
    },
    antipatterns: [
      {
        dont: "Don't test on synthetic data only",
        do: "Use 80% real data, 20% synthetic edge cases",
        why: "Real data reveals failure modes you'd never imagine"
      },
      {
        dont: "Don't ignore evaluation results",
        do: "Every failed eval is a learning opportunity - add to test suite",
        why: "Teams that analyze failures improve 3x faster"
      },
      {
        dont: "Don't skip regression testing",
        do: "Run full eval suite on every prompt change",
        why: "One retailer's 'small fix' broke $2M in daily transactions"
      },
      {
        dont: "Don't eval in production only",
        do: "Eval in dev → staging → production with increasing test coverage",
        why: "Catch issues early when they're cheap to fix"
      }
    ],
    integrationTips: [
      "Start with blocking CI/CD checks at 90% threshold, increase gradually",
      "Use feature flags to test new prompts on small % of traffic",
      "Implement 'eval debt' metric like tech debt - track untested features",
      "Create 'Eval of the Week' spotlight to share interesting failures",
      "Build internal tools for non-engineers to contribute test cases",
      "Regular 'bug bash' sessions focused on finding eval edge cases"
    ],
    transitionNote: "Ready to implement everything you've learned? Here's your concrete action plan to get started today..."
  },

  12: {
    title: "Getting Started Today",
    tldr: [
      "Launch your first eval in 30 minutes with OpenAI's hosted API - no infrastructure needed",
      "Start with classification (95% accuracy achievable) using proven templates from GitHub",
      "ROI calculator shows 50% cost savings with batch API + systematic evaluation"
    ],
    quickstartSteps: {
      install: {
        command: `# Option 1: OpenAI Evals API (Recommended for 2024/2025)
pip install openai

# Option 2: Full Evals Framework with CLI
git clone https://github.com/openai/evals.git
cd evals && pip install -e .

# Option 3: Alternative frameworks
pip install deepeval  # Pytest-like testing for LLMs
npm install -g @inductor/llm-toolkit  # Full starter template`,
        time: "2 minutes",
        setup: `# Set your API key
export OPENAI_API_KEY="sk-..."

# For Git-LFS (if using full framework)
git lfs fetch --all`
      },
      firstEval: {
        action: "Create eval for classification task - most common starting point",
        code: `# Quick classification eval using OpenAI API
from openai import OpenAI
client = OpenAI()

# Step 1: Create evaluation configuration
eval_config = client.evals.create(
    name="news_categorization_v1",
    model="gpt-4o-mini",  # Best value: $0.05/1K evals
    description="Categorize news into predefined categories",
    eval_type="string_match",
    dataset=[
        {
            "input": "Apple announces new iPhone with AI features",
            "expected": "Technology"
        },
        {
            "input": "Federal Reserve raises interest rates",
            "expected": "Business"
        }
    ],
    grading_criteria={
        "type": "exact_match",
        "categories": ["Technology", "Business", "Politics", "Sports", "Entertainment"]
    }
)

print(f"Created eval: {eval_config.id}")`,
        templates: {
          classification: "https://github.com/openai/evals/tree/main/evals/registry/data/classification",
          extraction: "https://github.com/confident-ai/deepeval/tree/main/examples/extraction",
          rag: "https://github.com/inductor-hq/llm-toolkit/tree/main/templates/rag-eval"
        },
        time: "10 minutes"
      },
      runBaseline: {
        command: `# Run your evaluation
eval_run = client.evals.run(
    eval_id=eval_config.id,
    model="gpt-4o-mini",
    temperature=0,  # Deterministic for testing
    max_samples=100  # Start small
)

# Get results
print(f"Accuracy: {eval_run.accuracy:.2%}")
print(f"Failed examples: {eval_run.failures}")`,
        expectation: "Expect 60-75% on first run - use this as your baseline",
        debugging: `# Analyze failures
for failure in eval_run.failures[:5]:
    print(f"Input: {failure.input}")
    print(f"Expected: {failure.expected}")
    print(f"Got: {failure.output}")
    print("---")`,
        time: "5 minutes"
      },
      iterate: {
        action: "Improve based on failure patterns",
        improvements: `# Common improvements that work:
1. Add explicit format constraints:
   prompt += " Respond with ONLY one word from: [Technology, Business, Politics, Sports, Entertainment]"

2. Add few-shot examples:
   messages.insert(0, {
       "role": "system", 
       "content": "Examples:\\nTech company earnings → Technology\\nElection results → Politics"
   })

3. Handle edge cases:
   prompt += " If unclear, default to 'Technology' for tech companies, 'Business' for others."`,
        realProgress: "42% → 72% → 89% → 95% (typical progression)",
        time: "15 minutes per iteration"
      },
      integrate: {
        action: "Add to CI/CD pipeline",
        githubAction: `# .github/workflows/eval.yml
name: LLM Evaluation
on: [push, pull_request]

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Evals
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
        run: |
          python run_eval.py --threshold 0.90
          if [ $? -ne 0 ]; then
            echo "Evaluation failed threshold"
            exit 1
          fi`,
        preCommitHook: `# .pre-commit-config.yaml
- repo: local
  hooks:
    - id: llm-eval
      name: Run LLM Evaluations
      entry: python run_eval.py --quick
      language: python
      pass_filenames: false`,
        benefit: "Catch regressions before they reach production"
      }
    },
    resources: {
      documentation: [
        {
          name: "OpenAI Evals Cookbook",
          url: "https://cookbook.openai.com/examples/evaluation/getting_started_with_openai_evals",
          description: "Official step-by-step guide with code examples"
        },
        {
          name: "OpenAI Platform Evals Guide",
          url: "https://platform.openai.com/docs/guides/evals",
          description: "API reference and best practices"
        }
      ],
      templates: [
        {
          name: "Inductor LLM Toolkit",
          url: "https://github.com/inductor-hq/llm-toolkit",
          description: "Production-ready starter with eval scaffolding"
        },
        {
          name: "DeepEval Framework",
          url: "https://github.com/confident-ai/deepeval",
          description: "Pytest-style testing with 14+ metrics (G-Eval, RAGAS, etc.)"
        },
        {
          name: "OpenAI Evals Registry",
          url: "https://github.com/openai/evals/tree/main/evals/registry",
          description: "100+ example evals for common use cases"
        }
      ],
      costCalculators: [
        {
          name: "LLM Price Check",
          url: "https://llmpricecheck.com/calculator/",
          description: "Compare costs across OpenAI, Anthropic, Google"
        },
        {
          name: "Helicone Calculator",
          url: "https://www.helicone.ai/llm-cost",
          description: "300+ models with real-time pricing"
        },
        {
          name: "YourGPT Calculator",
          url: "https://yourgpt.ai/tools/openai-and-other-llm-api-pricing-calculator",
          description: "Includes fine-tuning and embedding costs"
        }
      ],
      communitySupport: [
        {
          name: "OpenAI Developer Community",
          url: "https://community.openai.com/c/api/7",
          description: "Active forum with 12,440+ topics in 2024"
        },
        {
          name: "OpenAI Forum Events",
          url: "https://forum.openai.com/public/events",
          description: "Evals Build Hour workshops and live demos"
        },
        {
          name: "Discord - AI Developer Community",
          url: "https://discord.gg/openai",
          description: "Real-time help from practitioners"
        }
      ],
      videoTutorials: [
        {
          name: "Noah Builds Evals with o1",
          url: "https://forum.openai.com/events/noah-evals-o1",
          description: "Live coding session showing advanced techniques"
        },
        {
          name: "Evals Build Hour Recording",
          url: "https://www.youtube.com/watch?v=evals-workshop",
          description: "Complete workshop from basics to production"
        }
      ]
    },
    commonFirstEvals: {
      classification: {
        description: "Categorize support tickets, content, or documents",
        metrics: ["Accuracy: 90-95% achievable", "Precision/Recall per category", "Confusion matrix analysis"],
        starterCode: `# Support ticket classification
eval = {
    "name": "support_ticket_classifier",
    "samples": load_tickets_from_db(),  # Real production data
    "categories": ["Billing", "Technical", "Feature Request", "Bug Report"],
    "success_threshold": 0.92
}`,
        realResults: "Zendesk integration: 38% → 92% routing accuracy"
      },
      extraction: {
        description: "Extract structured data from unstructured text",
        metrics: ["F1 Score for entity detection", "Precision: minimize false positives", "Recall: catch all entities"],
        starterCode: `# Invoice data extraction
eval = {
    "name": "invoice_extractor",
    "schema": {
        "invoice_number": "string",
        "amount": "number",
        "due_date": "date"
    },
    "grader": "python",  # Custom validation logic
    "validate_sum": True  # Check line items sum to total
}`,
        realResults: "Accounting automation: 45% → 97% extraction accuracy"
      },
      rag: {
        description: "Evaluate retrieval quality and answer accuracy",
        metrics: ["Answer Relevancy (LLM-as-judge)", "Contextual Relevancy (retrieval quality)", "Faithfulness (no hallucination)"],
        starterCode: `# RAG evaluation with DeepEval
from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric, FaithfulnessMetric

metrics = [
    AnswerRelevancyMetric(threshold=0.7),
    FaithfulnessMetric(threshold=0.85)
]

evaluate(test_cases, metrics)`,
        realResults: "Customer support bot: 82% → 94% answer quality"
      }
    },
    successMetrics: {
      dayOne: {
        baseline: "Establish current accuracy (expect 40-70%)",
        coverage: "Start with 50-100 test cases",
        categories: "Track failures by category"
      },
      weekOne: {
        accuracy: "Target 85%+ on primary use case",
        velocity: "2-3 iterations per day",
        insights: "Document top 5 failure patterns"
      },
      monthOne: {
        production: "95%+ accuracy in production",
        regression: "Zero accuracy drops in CI/CD",
        scale: "500+ test cases covering edge cases"
      },
      costTracking: `# Track evaluation costs
import time
start_tokens = client.usage.total_tokens

# Run evaluations
run_evaluations()

end_tokens = client.usage.total_tokens
tokens_used = end_tokens - start_tokens
cost = (tokens_used / 1000) * 0.0001  # GPT-4o-mini pricing

print(f"Evaluation cost: \${cost:.4f}")
print(f"Cost per test case: \${cost/len(test_cases):.6f}")`,
      roiCalculation: `# Calculate ROI
hours_saved_per_incident = 4
incidents_prevented_per_month = 10
hourly_rate = 150

monthly_savings = hours_saved_per_incident * incidents_prevented_per_month * hourly_rate
monthly_eval_cost = 500  # Typical for 10K evaluations/day

roi = (monthly_savings - monthly_eval_cost) / monthly_eval_cost * 100
print(f"ROI: {roi:.0f}% (\${monthly_savings - monthly_eval_cost}/month saved)")`
    },
    proTips: [
      "Start with YOUR data: Export 100 real examples from production logs today",
      "Use o3-mini for evaluation: 82% accuracy at 150ms - perfect for high-volume testing",
      "Batch API saves 50%: Run large eval suites overnight for half the cost",
      "Version control test data: Store in evals/data/{feature}/v{version}.json",
      "Monitor drift: Set up weekly automated runs to catch model behavior changes"
    ],
    transitionNote: "Armed with these tools and templates, let's wrap up with the key transformation this enables..."
  },

  13: {
    title: "The Bottom Line",
    tldr: [
      "Stop guessing, start measuring - IDC/Microsoft study shows $3.50 return for every $1 spent on AI when properly tested",
      "Ship with confidence - 95%+ accuracy before production reduces incidents by 85% and builds trust",
      "Transform LLM development from art to engineering - join the 15% of companies successfully scaling AI"
    ],
    keyTakeaways: [
      {
        point: "Stop guessing",
        detail: "Every prompt change measured objectively with real data",
        impact: "Knight Capital lost $440M in 45 minutes - all preventable with proper testing",
        metric: "Teams using evals ship 2x faster with 5x fewer rollbacks"
      },
      {
        point: "Ship confidently",
        detail: "95%+ accuracy before production is achievable in 2-5 days",
        impact: "Sleep better knowing your LLM won't hallucinate pricing or give illegal advice",
        metric: "Top performers achieve 40% fewer incidents within 3 months"
      },
      {
        point: "Catch regressions",
        detail: "Automated testing for LLMs just like traditional software",
        impact: "No more 'I fixed the billing bot but broke customer service'",
        metric: "CI/CD integration prevents 95% of regression issues"
      },
      {
        point: "Real Business Impact",
        detail: "5x fewer incidents, 10x faster development, 50% cost reduction",
        impact: "Banco BV: 80% faster responses, 100x more personalized at scale",
        metric: "90% of AI initiatives with testing deliver ROI within 18 months"
      }
    ],
    executiveValue: {
      riskMitigation: [
        "47% of companies experienced AI incidents in 2024 (Gartner)",
        "Average incident cost: $4.45M including remediation and reputation damage",
        "Regulatory exposure: GDPR fines up to 4% of global revenue",
        "With evals: 85% reduction in production incidents"
      ],
      competitiveAdvantage: [
        "Only 27% of companies successfully scale AI beyond pilots (BCG)",
        "Early adopters see 25-30% higher success rates",
        "Google: 25% of new code now AI-generated (with testing)",
        "First-mover advantage in AI reliability worth billions"
      ],
      financialReturns: [
        "Enterprise AI spending: $4.6B in 2024 (8x growth from 2022)",
        "Average enterprise spends $18M on LLMs (up from $7M in 2023)",
        "With proper testing: $3.50 return per $1 invested (IDC)",
        "Payback period: 1-3 months for evaluation infrastructure"
      ]
    },
    industryPredictions: {
      gartner2028: [
        "By 2028: 33% of enterprise apps will include agentic AI",
        "15% of work decisions made autonomously (up from 0% in 2024)",
        "GenAI market: $36.1B by 2030 (33% CAGR from $6.4B in 2024)",
        "Evaluation and testing tools will be a $2B+ market segment"
      ],
      emergingTrends: [
        "Prompt Reliability Engineer becomes standard role by 2026",
        "Evaluation-as-a-Service platforms reach $500M market size",
        "Regulatory requirements for AI testing in finance/healthcare by 2027",
        "Open source eval frameworks challenge commercial solutions"
      ]
    },
    yourNext30Minutes: [
      "Pick your most problematic LLM feature - the one keeping you up at night",
      "Export 100-200 examples from production logs (last 30 days)",
      "Create your first eval using OpenAI API or DeepEval framework",
      "Run baseline evaluation - expect 40-70% accuracy (this is normal!)",
      "Identify top 3 failure patterns and update your prompt",
      "Re-run eval and watch accuracy jump to 70-85%",
      "Share results with your team - build momentum for systematic testing"
    ],
    implementationChecklist: {
      immediate: [
        "Set up OpenAI API key and install evaluation framework",
        "Choose starter template (classification/extraction/RAG)",
        "Run first evaluation within 30 minutes"
      ],
      week1: [
        "Achieve 85%+ accuracy on pilot feature",
        "Set up CI/CD integration with GitHub Actions",
        "Create monitoring dashboard (Datadog/Phoenix/Langfuse)"
      ],
      month1: [
        "Expand to 5+ LLM features with eval coverage",
        "Establish team eval review process",
        "Document ROI and share with leadership"
      ]
    },
    successMetrics: {
      technical: [
        "95%+ accuracy on critical features",
        "Zero regression incidents in production",
        "<200ms evaluation latency",
        "90% eval coverage of LLM features"
      ],
      business: [
        "50% reduction in customer complaints",
        "2x faster feature development velocity",
        "40% ROI within 6 months",
        "$2M+ annual savings from prevented incidents"
      ]
    },
    finalThought: `In 6 months, you'll wonder how you ever built LLM features without evaluations. The best time to start was when you deployed your first prompt. The second best time is now.

Remember: Every production incident is a future eval test case. Every customer complaint is a missing evaluation. Every prompt that "works on my machine" is a regression waiting to happen.

Join the 15% of companies that ship LLM features with confidence. Your future self (and your on-call rotation) will thank you.`,
    inspiringExamples: [
      "Rechat's Lucy: 40% → 95% accuracy transformed their business",
      "Major bank: Prevented potential $50M compliance violation",
      "E-commerce giant: 97% accuracy on product categorization = $23M revenue increase",
      "Healthcare startup: FDA approval achieved through rigorous eval documentation"
    ],
    callToAction: "Don't be part of the 85% failure statistic. Start your first eval now:",
    closingCode: `# Your journey starts with one line:
from openai import OpenAI
client = OpenAI()

# Create your first eval in 30 seconds
eval = client.evals.create(
    name="my_first_eval",
    eval_type="string_match",
    # Your production data goes here
)

# The rest is just iteration.
# See you on the other side of 95% accuracy! 🚀`
  }
};