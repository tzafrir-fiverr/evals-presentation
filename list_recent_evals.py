#!/usr/bin/env python3
"""
List recent evaluations and their runs
"""
import os
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def list_evaluations_with_runs(limit=10):
    """List recent evaluations with their runs"""
    print("Recent Evaluations and Runs")
    print("=" * 80)
    
    try:
        # Get recent evaluations
        evals = client.evals.list(limit=limit, order="desc")
        
        if not evals.data:
            print("No evaluations found.")
            return
        
        for eval_obj in evals.data:
            print(f"\nEvaluation: {eval_obj.name}")
            print(f"  ID: {eval_obj.id}")
            print(f"  Created: {datetime.fromtimestamp(eval_obj.created_at).strftime('%Y-%m-%d %H:%M:%S')}")
            
            if hasattr(eval_obj, 'metadata') and eval_obj.metadata:
                print(f"  Metadata: {eval_obj.metadata}")
            
            # Try to get runs for this evaluation
            try:
                runs = client.evals.runs.list(eval_id=eval_obj.id, limit=5, order="desc")
                
                if runs.data:
                    print(f"  Recent Runs:")
                    for run in runs.data:
                        status_emoji = {
                            'completed': '✓',
                            'failed': '✗',
                            'queued': '⏳',
                            'in_progress': '🔄',
                            'cancelled': '⚠️'
                        }.get(run.status, '?')
                        
                        print(f"    {status_emoji} {run.id}")
                        print(f"       Status: {run.status}")
                        print(f"       Model: {run.model}")
                        print(f"       Created: {datetime.fromtimestamp(run.created_at).strftime('%Y-%m-%d %H:%M:%S')}")
                        
                        if run.status == 'completed' and hasattr(run, 'result_counts'):
                            counts = run.result_counts
                            total = getattr(counts, 'total', 0)
                            passed = getattr(counts, 'passed', 0)
                            if total > 0:
                                print(f"       Results: {passed}/{total} passed ({passed/total*100:.1f}%)")
                else:
                    print(f"  No runs found")
                    
            except Exception as e:
                print(f"  Error getting runs: {e}")
            
            print("-" * 80)
            
    except Exception as e:
        print(f"Error listing evaluations: {e}")

if __name__ == "__main__":
    list_evaluations_with_runs()