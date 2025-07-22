export const slide11ImprovedNotes = {
  title: "Practical Implementation Guide",
  tldr: [
    "Start small with one feature, prove value quickly using tools like Promptfoo or Okareo",
    "Use 80% real production data (with privacy compliance), 20% synthetic edge cases",
    "Version everything together: prompt + eval + test data using semantic versioning (X.Y.Z)"
  ],
  bestPractices: {
    startSmall: {
      what: "Pick ONE feature, get it to 90%+ accuracy",
      why: "Proves value quickly, builds momentum, demonstrates ROI",
      example: "Start with your most problematic prompt",
      implementation: {
        week1: "Baseline current performance (manual evaluation of 50 samples)",
        week2: "Implement automated evaluation with Promptfoo",
        week3: "Iterate until 90%+ accuracy achieved",
        week4: "Present results to stakeholders with clear metrics"
      }
    },
    useProductionData: {
      what: "Mine logs for real user inputs with privacy compliance",
      why: "Catches real-world failures you'd never imagine",
      example: "Export failed requests from last month",
      privacyFramework: {
        step1: "Set up automated workflow to sample production logs",
        step2: "Use tokenization/masking tools (e.g., Skyflow, Private AI)",
        step3: "Create sensitive data dictionary for automatic redaction",
        step4: "Ensure GDPR/CCPA compliance with data residency requirements",
        tools: ["Skyflow for tokenization", "Private AI for de-identification", "Custom regex patterns for PII"]
      }
    },
    versionEverything: {
      what: "Prompt + eval config + test data = one commit",
      why: "Know exactly what changed and why",
      example: "git commit -m 'v2.1.0: Added examples, 72%→89%'",
      versioningStrategy: {
        major: "Breaking changes to prompt structure or expected output",
        minor: "New examples or capabilities added",
        patch: "Bug fixes or minor wording changes",
        tools: ["PromptLayer", "Mirascope", "LangSmith", "Agenta", "Helicone"],
        config: `{
  "prompt_version": "2.1.0",
  "eval_version": "1.3.2",
  "test_data_version": "3.0.1",
  "compatibility_matrix": {
    "prompt_2.1.0": ["eval_1.3.x", "test_data_3.x.x"]
  }
}`
      }
    }
  },
  antipatterns: [
    {
      dont: "Don't over-engineer the eval system",
      do: "Use proven tools (Promptfoo, Okareo), focus on the prompts",
      example: "Avoid building custom evaluation infrastructure when existing tools suffice"
    },
    {
      dont: "Don't test on synthetic data only",
      do: "Real examples reveal real problems - aim for 80/20 split",
      example: "Synthetic: edge cases, Real: actual user inputs from production"
    },
    {
      dont: "Don't ignore eval results",
      do: "Every failure is a learning opportunity - create failure analysis process",
      example: "Weekly review of top 10 failure patterns with action items"
    },
    {
      dont: "Don't deploy without regression testing",
      do: "Run full eval suite before any prompt change goes live",
      example: "CI/CD pipeline blocks deployment if accuracy drops >5%"
    }
  ],
  integrationTips: {
    cicdPipeline: {
      description: "Add to CI/CD pipeline with threshold checks",
      githubActionsExample: `name: LLM Evaluation Pipeline
on: [push, pull_request]
jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run LLM Evaluations
        run: |
          npx promptfoo@latest eval --ci
          npx promptfoo@latest share --output results.json
      - name: Check Thresholds
        run: |
          python scripts/check_thresholds.py results.json
      - name: Generate Report with CML
        if: always()
        run: |
          pip install cml
          cml comment create report.md
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: evaluation-results
          path: results.json`,
      thresholdScript: `# check_thresholds.py
import json
import sys

with open(sys.argv[1]) as f:
    results = json.load(f)

accuracy = results['aggregate']['accuracy']
MIN_ACCURACY = 0.85

if accuracy < MIN_ACCURACY:
    print(f"❌ Accuracy {accuracy:.2%} below threshold {MIN_ACCURACY:.2%}")
    sys.exit(1)
else:
    print(f"✅ Accuracy {accuracy:.2%} meets threshold")
    sys.exit(0)`
    },
    dashboardSolutions: {
      description: "Create eval dashboard for team visibility",
      options: {
        datadog: {
          features: [
            "LLM Observability with end-to-end tracing",
            "Out-of-the-box dashboards for LLM metrics",
            "Custom evaluation submission API",
            "Integration with existing APM"
          ],
          setup: `// Datadog LLM Observability Setup
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: 'YOUR_CLIENT_TOKEN',
  site: 'datadoghq.com',
  service: 'llm-evaluations',
  env: 'production'
})

// Log evaluation results
datadogLogs.logger.info('LLM Evaluation', {
  prompt_version: '2.1.0',
  accuracy: 0.89,
  latency_ms: 234,
  model: 'gpt-4',
  test_suite: 'production_samples'
})`
        },
        openSource: {
          tools: ["Phoenix (fixed metrics)", "Langfuse (flexible setup)", "Opik (custom metrics)", "SigNoz (full-stack)"],
          example: "Langfuse provides human + LLM hybrid evaluation workflows"
        }
      }
    },
    alertingStrategy: {
      description: "Set up alerts for accuracy drops",
      implementation: {
        realtime: "Alert if accuracy drops >10% in any 5-minute window",
        daily: "Daily report of accuracy trends and failure patterns",
        weekly: "Weekly deep-dive on worst-performing prompts",
        example: `# Datadog Monitor Configuration
{
  "name": "LLM Accuracy Drop Alert",
  "type": "metric alert",
  "query": "avg(last_5m):avg:llm.evaluation.accuracy{env:production} < 0.80",
  "message": "LLM accuracy dropped below 80%! Current: {{value}}\\n@slack-llm-oncall",
  "thresholds": {
    "critical": 0.80,
    "warning": 0.85
  }
}`
      }
    },
    failureAnalysis: {
      description: "Regular review of failure patterns",
      process: [
        "Export all failed evaluations weekly",
        "Cluster failures by error type",
        "Identify common patterns",
        "Create targeted test cases for patterns",
        "Update prompts to handle edge cases"
      ],
      tools: ["Jupyter notebooks for analysis", "Clustering algorithms for pattern detection", "Automated failure categorization"]
    }
  },
  teamAdoption: {
    pilotProgram: {
      week1_2: "Select pilot team with problematic LLM feature",
      week3_4: "Implement evaluation with close support",
      week5_6: "Measure impact and gather feedback",
      week7_8: "Refine process based on learnings",
      week9_12: "Gradual rollout to other teams"
    },
    changeManagement: {
      education: [
        "Lunch & learn sessions on LLM evaluation benefits",
        "Hands-on workshops with real examples",
        "Create internal documentation with company-specific examples"
      ],
      incentives: [
        "Recognition for teams improving accuracy metrics",
        "Hackathons focused on evaluation improvements",
        "Include eval metrics in performance reviews"
      ],
      support: [
        "Dedicated Slack channel for eval questions",
        "Office hours with LLM evaluation experts",
        "Pair programming sessions for complex evaluations"
      ]
    },
    roiMeasurement: {
      metrics: [
        "Reduction in production incidents (target: 50% reduction)",
        "Time saved on manual testing (target: 20 hours/week)",
        "Improvement in model performance (target: 15% accuracy gain)",
        "Faster iteration cycles (target: 3x faster prompt updates)"
      ],
      calculation: `// Example ROI Calculation
const incidents_before = 10; // per month
const incidents_after = 3;
const incident_cost = 5000; // USD per incident
const monthly_savings = (incidents_before - incidents_after) * incident_cost;
const eval_setup_cost = 40000; // one-time
const payback_period_months = eval_setup_cost / monthly_savings; // ~1.1 months`
    }
  },
  migrationStrategy: {
    phase1: {
      name: "Baseline (Weeks 1-2)",
      activities: [
        "Manual evaluation of current system",
        "Document existing test cases",
        "Identify key metrics to track",
        "Set up basic measurement infrastructure"
      ]
    },
    phase2: {
      name: "Pilot Automation (Weeks 3-6)",
      activities: [
        "Implement first automated evaluations",
        "Run parallel manual + automated testing",
        "Compare results and refine automation",
        "Build confidence in automated system"
      ]
    },
    phase3: {
      name: "Scale (Weeks 7-12)",
      activities: [
        "Expand to all prompts",
        "Integrate with CI/CD",
        "Set up dashboards and alerts",
        "Train team on new workflow"
      ]
    },
    phase4: {
      name: "Optimize (Ongoing)",
      activities: [
        "Continuous improvement of evaluations",
        "Add new test cases from production",
        "Refine accuracy thresholds",
        "Explore advanced evaluation techniques"
      ]
    }
  },
  transitionNote: "Ready to get started? Here's your action plan with specific tools and timelines..."
};