#!/usr/bin/env python3
"""
View OpenAI Evaluation Results
Retrieves and displays detailed results from a completed evaluation run
"""
import os
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
import json

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def get_eval_info(eval_id):
    """Retrieve evaluation configuration"""
    print(f"Retrieving evaluation: {eval_id}\n")
    
    try:
        eval_obj = client.evals.retrieve(eval_id)
        
        print("Evaluation Details:")
        print(f"  Name: {eval_obj.name}")
        print(f"  ID: {eval_obj.id}")
        print(f"  Created: {datetime.fromtimestamp(eval_obj.created_at).strftime('%Y-%m-%d %H:%M:%S')}")
        
        if hasattr(eval_obj, 'metadata') and eval_obj.metadata:
            print(f"  Metadata: {eval_obj.metadata}")
        
        print("\nTesting Criteria:")
        for i, criteria in enumerate(eval_obj.testing_criteria, 1):
            if hasattr(criteria, 'name'):
                name = criteria.name
                type_ = getattr(criteria, 'type', 'Unknown')
                operation = getattr(criteria, 'operation', 'N/A')
            elif isinstance(criteria, dict):
                name = criteria.get('name', 'Unnamed')
                type_ = criteria.get('type', 'Unknown')
                operation = criteria.get('operation', 'N/A')
            else:
                name = 'Unknown'
                type_ = 'Unknown'
                operation = 'N/A'
            
            print(f"  {i}. {name}")
            print(f"     Type: {type_}")
            if operation != 'N/A':
                print(f"     Operation: {operation}")
        
        return eval_obj
        
    except Exception as e:
        print(f"Error retrieving evaluation: {e}")
        return None

def get_run_results(eval_id, run_id):
    """Retrieve detailed run results"""
    print(f"\n{'='*60}")
    print(f"Retrieving run: {run_id}\n")
    
    try:
        run = client.evals.runs.retrieve(eval_id=eval_id, run_id=run_id)
        
        print("Run Details:")
        print(f"  ID: {run.id}")
        print(f"  Status: {run.status}")
        print(f"  Model: {run.model}")
        print(f"  Created: {datetime.fromtimestamp(run.created_at).strftime('%Y-%m-%d %H:%M:%S')}")
        
        if hasattr(run, 'name') and run.name:
            print(f"  Name: {run.name}")
        
        # Display result counts
        if hasattr(run, 'result_counts') and run.result_counts:
            print("\nResult Summary:")
            counts = run.result_counts
            total = getattr(counts, 'total', 0)
            passed = getattr(counts, 'passed', 0)
            failed = getattr(counts, 'failed', 0)
            errored = getattr(counts, 'errored', 0)
            
            print(f"  Total items: {total}")
            print(f"  Passed: {passed} ({passed/total*100:.1f}%)" if total > 0 else "  Passed: 0")
            print(f"  Failed: {failed} ({failed/total*100:.1f}%)" if total > 0 else "  Failed: 0")
            print(f"  Errored: {errored} ({errored/total*100:.1f}%)" if total > 0 else "  Errored: 0")
        
        # Display model usage
        if hasattr(run, 'per_model_usage') and run.per_model_usage:
            print("\nToken Usage:")
            for usage in run.per_model_usage:
                model_name = getattr(usage, 'model_name', 'Unknown')
                total_tokens = getattr(usage, 'total_tokens', 0)
                prompt_tokens = getattr(usage, 'prompt_tokens', 0)
                completion_tokens = getattr(usage, 'completion_tokens', 0)
                
                print(f"  Model: {model_name}")
                print(f"    Total tokens: {total_tokens:,}")
                print(f"    Prompt tokens: {prompt_tokens:,}")
                print(f"    Completion tokens: {completion_tokens:,}")
        
        # Display per criteria results if available
        if hasattr(run, 'per_testing_criteria_results') and run.per_testing_criteria_results:
            print("\nPer Criteria Results:")
            for result in run.per_testing_criteria_results:
                criteria_name = getattr(result, 'testing_criteria', 'Unknown')
                passed = getattr(result, 'passed', 0)
                failed = getattr(result, 'failed', 0)
                total = passed + failed
                
                print(f"  {criteria_name}:")
                print(f"    Passed: {passed}/{total} ({passed/total*100:.1f}%)" if total > 0 else "    Passed: 0/0")
        
        return run
        
    except Exception as e:
        print(f"Error retrieving run: {e}")
        return None

def get_output_items(eval_id, run_id, limit=5, show_all=False):
    """Retrieve and display individual output items"""
    print(f"\n{'='*60}")
    print(f"Retrieving output items (showing {'all' if show_all else f'first {limit}'})...\n")
    
    try:
        # Get output items
        output_items = client.evals.runs.output_items.list(
            eval_id=eval_id,
            run_id=run_id,
            limit=100 if show_all else limit
        )
        
        if not output_items.data:
            print("No output items found.")
            return
        
        for i, item in enumerate(output_items.data, 1):
            print(f"Item #{i}:")
            print(f"  Status: {item.status}")
            
            # Show input
            if hasattr(item, 'datasource_item') and item.datasource_item:
                print(f"  Input: {item.datasource_item.get('input', 'N/A')}")
                print(f"  Expected: {item.datasource_item.get('ground_truth', 'N/A')}")
            
            # Show output
            if hasattr(item, 'sample') and item.sample:
                sample = item.sample
                if hasattr(sample, 'output') and sample.output:
                    for output in sample.output:
                        if hasattr(output, 'content'):
                            print(f"  Model Output: {output.content}")
                        elif isinstance(output, dict) and 'content' in output:
                            print(f"  Model Output: {output['content']}")
            
            # Show results
            if hasattr(item, 'results') and item.results:
                for result in item.results:
                    passed = getattr(result, 'passed', result.get('passed', False) if isinstance(result, dict) else False)
                    score = getattr(result, 'score', result.get('score', 0) if isinstance(result, dict) else 0)
                    print(f"  Result: {'✓ PASS' if passed else '✗ FAIL'} (score: {score})")
            
            print()
        
        if not show_all and len(output_items.data) == limit and hasattr(output_items, 'has_more') and output_items.has_more:
            print(f"... showing first {limit} items. Use --all flag to see all items.")
            
    except Exception as e:
        print(f"Error retrieving output items: {e}")

def main():
    """Main function to view evaluation results"""
    import sys
    
    # Check if IDs are provided as arguments
    show_all = '--all' in sys.argv
    args = [arg for arg in sys.argv[1:] if arg != '--all']
    
    if len(args) == 2:
        eval_id = args[0]
        run_id = args[1]
    else:
        # Default IDs provided by the user
        eval_id = 'eval_6863a955a1a4819199cf78f57ec193e5'
        run_id = 'evalrun_6863a95629108191a7ad9b60be29ad6d'
    
    print("OpenAI Evaluation Results Viewer")
    print("=" * 60)
    print(f"\nNote: Make sure your API key has access to the project where this eval was created.")
    
    # Get evaluation info
    eval_obj = get_eval_info(eval_id)
    if not eval_obj:
        return
    
    # Get run results
    run = get_run_results(eval_id, run_id)
    if not run:
        return
    
    # Get output items
    get_output_items(eval_id, run_id, limit=5, show_all=show_all)
    
    print("\n" + "=" * 60)
    print("Report URL:")
    if hasattr(run, 'report_url'):
        print(f"  {run.report_url}")

if __name__ == "__main__":
    main()