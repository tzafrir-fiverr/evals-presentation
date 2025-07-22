#!/usr/bin/env python3
"""
Level 1: Exact Match Evaluation - News Categorization
This script demonstrates the simplest form of evaluation using string matching.
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


def create_news_categorization_eval():
    """Create an evaluation for news headline categorization"""
    print("Creating News Headline Categorization Evaluation...\n")

    try:
        eval_config = client.evals.create(
            name="01_exact_match_news_categorization",
            data_source_config={
                "type": "custom",
                "item_schema": {
                    "type": "object",
                    "properties": {
                        "headline": {"type": "string"},
                        "category": {"type": "string"}
                    },
                    "required": ["headline", "category"]
                },
                "include_sample_schema": True
            },
            testing_criteria=[{
                "name": "Category Match",
                "type": "string_check",
                "input": "{{sample.output_text}}",
                "reference": "{{item.category}}",
                "operation": "eq"
            }],
            metadata={
                "description": "Tests model's ability to categorize news headlines accurately",
                "evaluation_type": "exact_match"
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

    # Test data with news headlines
    test_data: List[Dict[str, Any]] = [
        {"headline": "Apple Unveils New iPhone with AI Features", "category": "Technology"},
        {"headline": "Fed Raises Interest Rates by 0.25%", "category": "Markets"},
        {"headline": "UN Climate Summit Begins in Dubai", "category": "World"},
        {"headline": "Amazon Acquires Robotics Startup for $1B", "category": "Business"},
        {"headline": "Lakers Win NBA Championship", "category": "Sports"},
        {"headline": "Google Launches New AI Model", "category": "Technology"},
        {"headline": "Stock Market Hits Record High", "category": "Markets"},
        {"headline": "Tesla Opens New Factory in Germany", "category": "Business"},
        {"headline": "World Cup Final Draws Record Viewers", "category": "Sports"},
        {"headline": "Global Leaders Sign Climate Agreement", "category": "World"}
    ]

    # The prompt template that will be evaluated
    prompt_template = """Categorize the following news headline into one of these exact categories: Technology, Markets, World, Business, Sports

Respond with only the exact category name from the list above.
Headline: {{item.headline}}"""
    try:
        run = client.evals.runs.create(
            eval_id,
            name="News categorization - gpt-4o-mini",
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
                "prompt_version": "v2_with_examples"
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
            if len(item.results) > 0:
                result = item.results[0]
                if isinstance(result, dict) and 'score' in result:
                    score = result['score']

            if score == 1:
                passed += 1
            else:
                failed += 1

        print(f"Passed: {passed}/{len(output_items)} ({passed/len(output_items)*100:.1f}%)")
        print(f"Failed: {failed}/{len(output_items)} ({failed/len(output_items)*100:.1f}%)")

        # Show detailed results
        print("\nDetailed Results:")
        print("-" * 80)
        for item in output_items:
            datasource_item = item.datasource_item if hasattr(item, 'datasource_item') else {}

            # Get model output
            model_output = item.sample.output[0].content

            # Get score from results
            score = 0
            if len(item.results) > 0:
                result = item.results[0]
                if isinstance(result, dict) and 'score' in result:
                    score = result['score']

            headline = str(datasource_item.get('headline', ''))
            expected = datasource_item.get('category', '')
            status = "✓ PASS" if score == 1 else "✗ FAIL"

            print(f"{status} | Headline: '{headline[:40]}...' | Expected: {expected} | Got: {model_output}")
    else:
        print(f"\n✗ Evaluation failed with status: {run_status.status}")


def main():
    print("=" * 60)
    print("Level 1: Exact Match Evaluation - News Categorization")
    print("=" * 60)

    # Create evaluation
    eval_config = create_news_categorization_eval()
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
    print("\nTo retrieve this evaluation later:")
    print(f"  eval_id = '{eval_config.id}'")
    print(f"  run_id = '{run.id}'")

if __name__ == "__main__":
    main()