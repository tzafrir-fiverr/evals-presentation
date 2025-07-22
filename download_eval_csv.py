#!/usr/bin/env python3
"""
Download evaluation results as CSV
"""
import os
import sys
import csv
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def download_eval_results(eval_id, run_id):
    """Download evaluation results and save as CSV"""
    try:
        # Get run details
        run = client.evals.runs.retrieve(eval_id=eval_id, run_id=run_id)
        print(f"Downloading results for run: {run_id}")
        print(f"Status: {run.status}")
        
        # Get all output items
        output_items = list(client.evals.runs.output_items.list(eval_id=eval_id, run_id=run_id, limit=100))
        print(f"Found {len(output_items)} items")
        
        # Create CSV file
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"eval_results_{run_id}_{timestamp}.csv"
        
        with open(filename, 'w', newline='') as f:
            writer = csv.writer(f)
            
            # Write header
            writer.writerow([
                'item_id', 'status', 'score', 'input', 'model_output', 
                'expected_valid', 'expected_category', 'severity', 'grader_output'
            ])
            
            # Write data
            for item in output_items:
                # Get datasource item
                datasource_item = item.datasource_item if hasattr(item, 'datasource_item') else {}
                
                # Get model output from sample
                model_output = ''
                if hasattr(item, 'sample') and item.sample and hasattr(item.sample, 'output'):
                    if item.sample.output and len(item.sample.output) > 0:
                        model_output = item.sample.output[0].content if hasattr(item.sample.output[0], 'content') else ''
                
                # Get grader result
                grader_output = ''
                if hasattr(item, 'results') and item.results and len(item.results) > 0:
                    result = item.results[0]
                    if hasattr(result, 'output') and result.output:
                        grader_output = result.output[0].content if len(result.output) > 0 and hasattr(result.output[0], 'content') else ''
                
                writer.writerow([
                    item.id,
                    item.status if hasattr(item, 'status') else 'unknown',
                    item.score if hasattr(item, 'score') else 0,
                    datasource_item.get('input', ''),
                    model_output,
                    datasource_item.get('expected_response', {}).get('valid', '') if datasource_item.get('expected_response') else '',
                    datasource_item.get('expected_category', ''),
                    datasource_item.get('severity', ''),
                    grader_output
                ])
        
        print(f"Results saved to: {filename}")
        return filename
        
    except Exception as e:
        print(f"Error downloading results: {e}")
        return None

def main():
    if len(sys.argv) != 3:
        print("Usage: python download_eval_csv.py <eval_id> <run_id>")
        sys.exit(1)
    
    eval_id = sys.argv[1]
    run_id = sys.argv[2]
    
    download_eval_results(eval_id, run_id)

if __name__ == "__main__":
    main()