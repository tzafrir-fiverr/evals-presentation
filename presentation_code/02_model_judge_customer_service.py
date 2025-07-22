#!/usr/bin/env python3
"""
Level 2: Model-as-Judge Evaluation - Customer Service Writing Quality
This script demonstrates using GPT-4 to evaluate the quality of customer service responses.
"""
import os
import time
from typing import Dict, List, Any
from dotenv import load_dotenv
from openai import OpenAI


# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


def create_writing_quality_eval():
    """Create an evaluation for customer service response quality"""
    print("Creating Customer Service Writing Quality Evaluation...\n")

    try:
        eval_config = client.evals.create(
            name="02_model_judge_customer_service",
            data_source_config={
                "type": "custom",
                "item_schema": {
                    "type": "object",
                    "properties": {
                        "complaint": {"type": "string"},
                        "response_guidelines": {"type": "string"}
                    },
                    "required": ["complaint", "response_guidelines"]
                },
                "include_sample_schema": True
            },
            testing_criteria=[
                {
                "name": "Response Quality Grader",
                "type": "label_model",
                "model": "gpt-4o",
                "input": [
                    {
                        "role": "developer",
                        "content": """You are evaluating customer service email responses. Rate whether the response is GOOD or BAD based on these criteria:

A GOOD response must:
1. Acknowledge the customer's issue
2. Show empathy or apologize when appropriate
3. Provide a clear solution or next steps
4. Be professional and polite
5. Be concise but complete

A BAD response has any of:
- Dismissive or rude tone
- No solution offered
- Overly robotic/generic
- Missing acknowledgment of the issue
- Unprofessional language"""
                    },
                    {
                        "role": "user",
                        "content": """Customer Complaint: {{item.complaint}}

Agent Response: {{sample.output_text}}

Guidelines given to agent: {{item.response_guidelines}}

Is this a GOOD or BAD customer service response?"""
                    }
                ],
                "labels": ["GOOD", "BAD"],
                "passing_labels": ["GOOD"]
            }],
            metadata={
                "description": "Evaluates quality of customer service responses",
                "evaluation_type": "model_as_judge",
                "grader_model": "gpt-4o"
            }
        )

        print("✓ Evaluation created successfully!")
        print(f"  ID: {eval_config.id}")
        print(f"  Name: {eval_config.name}")

        return eval_config

    except Exception as e:
        print(f"✗ Failed to create evaluation: {e}")
        return None

def run_evaluation(eval_id):
    """Run the evaluation with test data"""
    print("\nRunning evaluation...\n")

    # Test data with various customer complaints
    test_data: List[Dict[str, Any]] = [
        {
            "complaint": "I ordered a blue shirt but received a red one. This is the second time this has happened!",
            "response_guidelines": "Apologize, offer solution, acknowledge frustration"
        },
        {
            "complaint": "Your website has been down for 3 hours and I can't access my account. I have urgent work to do!",
            "response_guidelines": "Acknowledge urgency, provide timeline, offer alternative"
        },
        {
            "complaint": "I was charged twice for my subscription this month. Please fix this immediately.",
            "response_guidelines": "Apologize for billing error, confirm refund, provide timeline"
        },
        {
            "complaint": "The product I received is completely different from what was shown in the pictures.",
            "response_guidelines": "Acknowledge discrepancy, offer return/exchange, apologize"
        },
        {
            "complaint": "I've been waiting on hold for 45 minutes just to speak to someone!",
            "response_guidelines": "Apologize for wait time, acknowledge frustration, offer to help"
        },
        {
            "complaint": "This is the worst service I've ever experienced. I want to cancel everything.",
            "response_guidelines": "Acknowledge dissatisfaction, ask for chance to fix, stay professional"
        },
        {
            "complaint": "The delivery driver just threw my package and it's damaged.",
            "response_guidelines": "Apologize for driver behavior, offer replacement, follow up on driver"
        },
        {
            "complaint": "Your app keeps crashing every time I try to make a payment.",
            "response_guidelines": "Acknowledge technical issue, provide workaround, timeline for fix"
        }
    ]

    # The prompt template for generating customer service responses
    prompt_template = """You are a customer service representative. Write a brief, professional email response to this customer complaint.

Customer Complaint: {{item.complaint}}

Guidelines: {{item.response_guidelines}}

Write your response:"""

    try:
        run = client.evals.runs.create(
            eval_id,
            name="Customer service responses - gpt-4o-mini",
            data_source={
                "type": "completions",
                "source": {
                    "type": "file_content",
                    "content": [{"item": item} for item in test_data]
                },
                "input_messages": {
                    "type": "template",
                    "template": [
                        {
                            "role": "user",
                            "content": prompt_template
                        }
                    ]
                },
                "model": "gpt-4o-mini"
            },
            metadata={
                "model": "gpt-4o-mini",
                "test_count": str(len(test_data)),
                "prompt_version": "v1_with_guidelines"
            }
        )

        print("✓ Run started successfully!")
        print(f"  Run ID: {run.id}")
        print(f"  Status: {run.status}")
        print(f"  Report URL: {run.report_url}")

        return run

    except Exception as e:
        print(f"✗ Failed to run evaluation: {e}")
        print(f"Error details: {type(e).__name__}: {str(e)}")
        return None


def wait_and_show_results(eval_config, run):
    """Wait for evaluation to complete and display results"""
    print("\nWaiting for evaluation to complete...")
    while True:
        run_status = client.evals.runs.retrieve(eval_id=eval_config.id, run_id=run.id)
        if run_status.status in ['completed', 'failed']:
            break
        time.sleep(2)

    if run_status.status == 'completed':
        print("\n✓ Evaluation completed successfully!")

        # Get the results
        output_items = list(client.evals.runs.output_items.list(
            eval_id=eval_config.id,
            run_id=run.id,
            limit=100
        ))

        print("\nResults Summary:")
        print(f"Total items: {len(output_items)}")

        # Calculate pass/fail from results
        passed = 0
        failed = 0
        for item in output_items:
            score = 0
            if hasattr(item, 'results') and item.results and len(item.results) > 0:
                result = item.results[0]
                if isinstance(result, dict) and 'score' in result:
                    score = result['score']

            if score == 1:
                passed += 1
            else:
                failed += 1

        print(f"GOOD responses: {passed}/{len(output_items)} ({passed/len(output_items)*100:.1f}%)")
        print(f"BAD responses: {failed}/{len(output_items)} ({failed/len(output_items)*100:.1f}%)")

        # Show detailed results
        print("\nDetailed Results:")
        print("-" * 80)
        for item in output_items:
            datasource_item = item.datasource_item if hasattr(item, 'datasource_item') else {}

            # Get model output
            model_output = (item.sample.output[0].content or '').strip()

            # Get score from results
            score = 0
            grader_output = ""
            if len(item.results) > 0:
                result = item.results[0]
                score = result.get('score', 0)

                # Get grader's reasoning if available
                if ('output' in result and result['output'] and
                        isinstance(result['output'], list) and len(result['output']) > 0):
                    grader_output = result['output'][0].get('content', '')

            complaint = str(datasource_item.get('complaint', ''))[:50] + "..."
            status = "✓ GOOD" if score == 1 else "✗ BAD"

            print(f"\n{status} | Complaint: {complaint}")
            print(f"Response preview: {model_output[:100]}...")
            if not score and grader_output:
                print(f"Judge reasoning: {grader_output[:100]}...")
    else:
        print(f"\n✗ Evaluation failed with status: {run_status.status}")


def main():
    print("=" * 60)
    print("Level 2: Model-as-Judge - Customer Service Writing Quality")
    print("=" * 60)

    # Create evaluation
    eval_config = create_writing_quality_eval()
    if not eval_config:
        return

    # Run evaluation
    run = run_evaluation(eval_config.id)
    if not run:
        return

    # Wait for completion and show results
    wait_and_show_results(eval_config, run)

    print("\n" + "=" * 60)
    print("Evaluation complete!")
    print("\nTo view results online, visit:")
    print(f"  {run.report_url}")
    print("\nKey insights from this evaluation:")
    print("- GPT-4 can evaluate subjective quality that exact match can't")
    print("- Model judges can check multiple criteria at once")
    print("- Useful for any task where 'good' has many valid forms")

if __name__ == "__main__":
    main()