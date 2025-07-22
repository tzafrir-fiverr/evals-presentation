#!/usr/bin/env python3
"""
Level 3: Custom Python Code Evaluation - Number Decomposition
This script demonstrates custom Python code for evaluating structured outputs.
The task: Find two numbers that sum to a target value.
"""
import os
import time
from typing import List, Dict, Any
from dotenv import load_dotenv
from openai import OpenAI
from openai.types.evals import CreateEvalCompletionsRunDataSourceParam
from openai.types.shared_params import ResponseFormatJSONSchema


# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


def create_number_decomposition_eval():
    """Create an evaluation for number decomposition task"""
    print("Creating Number Decomposition Evaluation...\n")

    # The custom grader code that will evaluate the decomposition
    grader_code = '''
def grade(sample, item):
    result = sample['output_json']
    actual_sum = result['number1'] + result['number2']
    target = item['target']

    if actual_sum == target:
        return 1.0
    else:
        return 0.0
'''

    try:
        eval_config = client.evals.create(
            name="03_custom_python_number_decomposition",
            data_source_config={
                "type": "custom",
                "item_schema": {
                    "type": "object",
                    "properties": {
                        "target": {"type": "number"}
                    },
                    "required": ["target"]
                },
                "include_sample_schema": True
            },
            testing_criteria=[{
                "name": "Number Sum Validator",
                "type": "python",
                "source": grader_code
            }],
            metadata={
                "description": "Tests ability to decompose a number into two addends",
                "evaluation_type": "custom_python",
                "uses_structured_output": "true"
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
    """Run the evaluation with number decomposition test cases"""
    print("\nRunning evaluation...\n")

    # Test data - various target numbers to decompose
    test_data: List[Dict[str, Any]] = [
        {"target": 10},
        {"target": 0},
        {"target": -5},
        {"target": 100},
        {"target": 25},
        {"target": 1},
        {"target": -20},
        {"target": 42},
        {"target": 7},
        {"target": 999}
    ]

    # Define the response schema
    response_schema: ResponseFormatJSONSchema = {
        "type": "json_schema",
        "json_schema": {
            "name": "NumberDecomposition",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "number1": {
                        "type": "number",
                        "description": "The first number"
                    },
                    "number2": {
                        "type": "number",
                        "description": "The second number"
                    }
                },
                "required": ["number1", "number2"],
                "additionalProperties": False
            }
        }
    }

    # The prompt template for number decomposition
    prompt_template = "Find any two numbers that when added together equal {{item.target}}."

    try:
        data_source: CreateEvalCompletionsRunDataSourceParam = {
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
                "model": "gpt-4o-mini",
                "sampling_params": {
                    "response_format": response_schema
                }
            }

        run = client.evals.runs.create(
            eval_id,
            name="Number decomposition - gpt-4o-mini with structured output",
            data_source=data_source,
            metadata={
                "model": "gpt-4o-mini",
                "test_count": str(len(test_data)),
                "uses_structured_output": "true"
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
        print(f"Status: {run_status.status}")
        time.sleep(2)

    if run_status.status == 'completed':
        print("\n✓ Evaluation completed successfully!")

        # Get the results
        # Get the results - try simple list first
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
            if item.results[0]['score'] == 1.0:
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
            model_output = (item.sample.output[0].content or '').strip()

            # Try to parse the output to show the numbers
            try:
                import json
                output_data = json.loads(model_output)
                num1 = output_data.get('number1', '?')
                num2 = output_data.get('number2', '?')
                output_display = f"{num1} + {num2}"
            except Exception:
                output_display = model_output[:50] + "..."

            # Get test result
            test_passed = False
            if len(item.results) > 0:
                result = item.results[0]
                test_passed = result['score'] == 1.0

            target = datasource_item.get('target', '')
            status = "✓ PASS" if test_passed else "✗ FAIL"

            print(f"{status} | Target: {target} | Output: {output_display}")

    else:
        print(f"\n✗ Evaluation failed with status: {run_status.status}")
        if hasattr(run_status, 'error'):
            print(f"Error: {run_status.error}")


def main():
    print("=" * 60)
    print("Level 3: Custom Python Code - Number Decomposition")
    print("=" * 60)
    print("\nThis example demonstrates:")
    print("- Structured JSON output using response_format")
    print("- Custom Python validation logic")
    print("- Simple, clear evaluation criteria")

    # Create evaluation
    eval_config = create_number_decomposition_eval()
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

if __name__ == "__main__":
    main()