#!/usr/bin/env python3
"""
Content Moderation Evaluation - Using exact validator configuration
Tests the validator system exactly as configured in 250701-validator/
"""
import os
import json
import csv
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
from typing import Any

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def load_validator_config():
    """Load all validator configuration files"""
    # Load config
    with open('250701-validator/config.json', 'r') as f:
        config = json.load(f)

    # Load system prompt
    with open('250701-validator/system_prompt.txt', 'r') as f:
        system_prompt = f.read().strip()

    # Load input schema
    with open('250701-validator/input_schema.json', 'r') as f:
        input_schema = json.load(f)

    # Load test data
    test_cases = []
    with open('250701-validator/data.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            test_cases.append({
                'input': row['user_input'],
                'expected_valid': row['expected_valid'].lower() == 'true',
                'expected_category': row['expected_category'],
                'severity': row['severity'],
                'expected_response': {
                    'valid': row['expected_valid'].lower() == 'true',
                    'reason': row['expected_category']
                }
            })

    return config, system_prompt, input_schema, test_cases

def create_validator_eval():
    """Create evaluation matching the validator configuration"""
    print("Creating Validator Evaluation...\n")

    config, _system_prompt, _input_schema, _test_cases = load_validator_config()

    try:
        eval_config = client.evals.create(
            name="250701 Validator - Content Moderation",
            data_source_config={
                "type": "custom",
                "item_schema": {
                    "type": "object",
                    "properties": {
                        "input": {"type": "string"},
                        "expected_response": {
                            "type": "object",
                            "properties": {
                                "valid": {"type": "boolean"},
                                "reason": {"type": "string"}
                            }
                        },
                        "expected_category": {"type": "string"},
                        "severity": {"type": "string"}
                    },
                    "required": ["input", "expected_response"]
                },
                "include_sample_schema": True
            },
            testing_criteria=[
                {
                    "name": "Validation Response Grader",
                    "type": "label_model",
                    "model": "o3-mini",
                    "input": [
                        {
                            "role": "developer",
                            "content": """You are evaluating a content moderation system's JSON response.

The system should respond with a JSON object containing:
- "valid": boolean (true if input is acceptable, false if it violates policies)
- "reason": string (empty "" if valid, or one of: "TOS_AND_SAFETY_VIOLATIONS", "SPAM_OR_IRRELEVANT", "SCOPE_MISMATCH" if invalid)

Given the model's response and the expected response, determine if the model's response is correct.

A response is CORRECT if:
1. The "valid" field matches the expected value
2. If expected to be invalid (valid=false), the "reason" field contains one of the allowed non-empty values
3. If expected to be valid (valid=true), the "reason" field is empty ""

Respond with either "correct" or "incorrect"."""
                        },
                        {
                            "role": "user",
                            "content": "Model response: {{sample.output_text}}\n\nExpected valid: {{item.expected_response.valid}}\nExpected reason (if invalid): {{item.expected_response.reason}}"
                        }
                    ],
                    "passing_labels": ["correct"],
                    "labels": ["correct", "incorrect"]
                }
            ],
            metadata={
                "description": "Tests 250701-validator content moderation system",
                "model": config['model'],
                "reason_values": "TOS_AND_SAFETY_VIOLATIONS, SPAM_OR_IRRELEVANT, SCOPE_MISMATCH",
                "created": datetime.now().isoformat()
            }
        )

        print(f"✓ Evaluation created successfully!")
        print(f"  ID: {eval_config.id}")
        print(f"  Name: {eval_config.name}")

        return eval_config

    except Exception as e:
        print(f"✗ Failed to create evaluation: {e}")
        return None

def run_validator_eval(eval_id):
    """Run the validator evaluation with exact configuration"""
    config, system_prompt, input_schema, test_cases = load_validator_config()

    model = config['model']
    print(f"\nRunning evaluation on {model}...\n")

    print(f"Loaded {len(test_cases)} test cases")
    print(f"Using model: {model}")
    print(f"Response schema: {input_schema['name']}")

    # Use the exact system prompt from the file

    try:
        data_source: Any = {
            "type": "completions",
            "source": {
                "type": "file_content",
                "content": [{"item": tc} for tc in test_cases]
            },
            "input_messages": {
                "type": "template",
                "template": [
                    {
                        "role": "system", 
                        "content": system_prompt
                    },
                    {
                        "role": "user",
                        "content": "{{item.input}}"
                    }
                ]
            },
            "model": model,
            "sampling_params": {
                "response_format": {
                    "type": "json_schema",
                    "json_schema": input_schema
                }
            }
        }

        run = client.evals.runs.create(  # pyright: ignore[reportArgumentType]
            eval_id,
            name=f"Validator test on {model}",
            data_source=data_source,
            metadata={
                "model": model,
                "test_count": str(len(test_cases)),
                "validator_version": "250701"
            }
        )

        print(f"✓ Run started successfully!")
        print(f"  Run ID: {run.id}")
        print(f"  Status: {run.status}")
        print(f"  Report URL: {run.report_url}")

        return run

    except Exception as e:
        print(f"✗ Failed to run evaluation: {e}")
        print(f"Error details: {type(e).__name__}: {str(e)}")
        return None

def main():
    print("250701 Validator Evaluation")
    print("=" * 60)

    # Show configuration
    config, _, input_schema, test_cases = load_validator_config()
    print(f"Configuration:")
    print(f"  Model: {config['model']}")
    print(f"  Response Schema: {input_schema['name']}")
    print(f"  Test Cases: {len(test_cases)}")

    print("\n" + "-" * 60)

    # Create evaluation
    eval_config = create_validator_eval()
    if not eval_config:
        return

    print("\n" + "-" * 60)

    # Run evaluation
    run = run_validator_eval(eval_config.id)
    if not run:
        return

    print("\n" + "-" * 60)
    print("Evaluation is now running. You can:")
    print(f"1. View results at: {run.report_url}")
    print(f"2. Check status: python view_eval_results.py {eval_config.id} {run.id}")
    print(f"3. Analyze results: python analyze_moderation_results.py {eval_config.id} {run.id}")

    print(f"\nEvaluation ID: {eval_config.id}")
    print(f"Run ID: {run.id}")

if __name__ == "__main__":
    main()