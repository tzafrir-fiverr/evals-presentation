Evals
Create, manage, and run evals in the OpenAI platform. Related guide: Evals

Create eval
post
 
https://api.openai.com/v1/evals
Create the structure of an evaluation that can be used to test a model's performance. An evaluation is a set of testing criteria and the config for a data source, which dictates the schema of the data used in the evaluation. After creating an evaluation, you can run it on different models and model parameters. We support several types of graders and datasources. For more information, see the Evals guide.

Request body
data_source_config
object

Required
The configuration for the data source used for the evaluation runs. Dictates the schema of the data used in the evaluation.


Show possible types
testing_criteria
array

Required
A list of graders for all eval runs in this group. Graders can reference variables in the data source using double curly braces notation, like {{item.variable_name}}. To reference the model's output, use the sample namespace (ie, {{sample.output_text}}).


Show possible types
metadata
map

Optional
Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.

Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.

name
string

Optional
The name of the evaluation.

Returns
The created Eval object.

Example request
from openai import OpenAI
client = OpenAI()

eval_obj = client.evals.create(
  name="Sentiment",
  data_source_config={
    "type": "stored_completions",
    "metadata": {"usecase": "chatbot"}
  },
  testing_criteria=[
    {
      "type": "label_model",
      "model": "o3-mini",
      "input": [
        {"role": "developer", "content": "Classify the sentiment of the following statement as one of 'positive', 'neutral', or 'negative'"},
        {"role": "user", "content": "Statement: {{item.input}}"}
      ],
      "passing_labels": ["positive"],
      "labels": ["positive", "neutral", "negative"],
      "name": "Example label grader"
    }
  ]
)
print(eval_obj)
Response
{
  "object": "eval",
  "id": "eval_67b7fa9a81a88190ab4aa417e397ea21",
  "data_source_config": {
    "type": "stored_completions",
    "metadata": {
      "usecase": "chatbot"
    },
    "schema": {
      "type": "object",
      "properties": {
        "item": {
          "type": "object"
        },
        "sample": {
          "type": "object"
        }
      },
      "required": [
        "item",
        "sample"
      ]
  },
  "testing_criteria": [
    {
      "name": "Example label grader",
      "type": "label_model",
      "model": "o3-mini",
      "input": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Classify the sentiment of the following statement as one of positive, neutral, or negative"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "Statement: {{item.input}}"
          }
        }
      ],
      "passing_labels": [
        "positive"
      ],
      "labels": [
        "positive",
        "neutral",
        "negative"
      ]
    }
  ],
  "name": "Sentiment",
  "created_at": 1740110490,
  "metadata": {
    "description": "An eval for sentiment analysis"
  }
}
Get an eval
get
 
https://api.openai.com/v1/evals/{eval_id}
Get an evaluation by ID.

Path parameters
eval_id
string

Required
The ID of the evaluation to retrieve.

Returns
The Eval object matching the specified ID.

Example request
from openai import OpenAI
client = OpenAI()

eval_obj = client.evals.retrieve("eval_67abd54d9b0081909a86353f6fb9317a")
print(eval_obj)
Response
{
  "object": "eval",
  "id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "data_source_config": {
    "type": "custom",
    "schema": {
      "type": "object",
      "properties": {
        "item": {
          "type": "object",
          "properties": {
            "input": {
              "type": "string"
            },
            "ground_truth": {
              "type": "string"
            }
          },
          "required": [
            "input",
            "ground_truth"
          ]
        }
      },
      "required": [
        "item"
      ]
    }
  },
  "testing_criteria": [
    {
      "name": "String check",
      "id": "String check-2eaf2d8d-d649-4335-8148-9535a7ca73c2",
      "type": "string_check",
      "input": "{{item.input}}",
      "reference": "{{item.ground_truth}}",
      "operation": "eq"
    }
  ],
  "name": "External Data Eval",
  "created_at": 1739314509,
  "metadata": {},
}
Update an eval
post
 
https://api.openai.com/v1/evals/{eval_id}
Update certain properties of an evaluation.

Path parameters
eval_id
string

Required
The ID of the evaluation to update.

Request body
metadata
map

Optional
Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.

Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.

name
string

Optional
Rename the evaluation.

Returns
The Eval object matching the updated version.

Example request
from openai import OpenAI
client = OpenAI()

updated_eval = client.evals.update(
  "eval_67abd54d9b0081909a86353f6fb9317a",
  name="Updated Eval",
  metadata={"description": "Updated description"}
)
print(updated_eval)
Response
{
  "object": "eval",
  "id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "data_source_config": {
    "type": "custom",
    "schema": {
      "type": "object",
      "properties": {
        "item": {
          "type": "object",
          "properties": {
            "input": {
              "type": "string"
            },
            "ground_truth": {
              "type": "string"
            }
          },
          "required": [
            "input",
            "ground_truth"
          ]
        }
      },
      "required": [
        "item"
      ]
    }
  },
  "testing_criteria": [
    {
      "name": "String check",
      "id": "String check-2eaf2d8d-d649-4335-8148-9535a7ca73c2",
      "type": "string_check",
      "input": "{{item.input}}",
      "reference": "{{item.ground_truth}}",
      "operation": "eq"
    }
  ],
  "name": "Updated Eval",
  "created_at": 1739314509,
  "metadata": {"description": "Updated description"},
}
Delete an eval
delete
 
https://api.openai.com/v1/evals/{eval_id}
Delete an evaluation.

Path parameters
eval_id
string

Required
The ID of the evaluation to delete.

Returns
A deletion confirmation object.

Example request
from openai import OpenAI
client = OpenAI()

deleted = client.evals.delete("eval_abc123")
print(deleted)
Response
{
  "object": "eval.deleted",
  "deleted": true,
  "eval_id": "eval_abc123"
}
List evals
get
 
https://api.openai.com/v1/evals
List evaluations for a project.

Query parameters
after
string

Optional
Identifier for the last eval from the previous pagination request.

limit
integer

Optional
Defaults to 20
Number of evals to retrieve.

order
string

Optional
Defaults to asc
Sort order for evals by timestamp. Use asc for ascending order or desc for descending order.

order_by
string

Optional
Defaults to created_at
Evals can be ordered by creation time or last updated time. Use created_at for creation time or updated_at for last updated time.

Returns
A list of evals matching the specified filters.

Example request
from openai import OpenAI
client = OpenAI()

evals = client.evals.list(limit=1)
print(evals)
Response
{
  "object": "list",
  "data": [
    {
      "id": "eval_67abd54d9b0081909a86353f6fb9317a",
      "object": "eval",
      "data_source_config": {
        "type": "stored_completions",
        "metadata": {
          "usecase": "push_notifications_summarizer"
        },
        "schema": {
          "type": "object",
          "properties": {
            "item": {
              "type": "object"
            },
            "sample": {
              "type": "object"
            }
          },
          "required": [
            "item",
            "sample"
          ]
        }
      },
      "testing_criteria": [
        {
          "name": "Push Notification Summary Grader",
          "id": "Push Notification Summary Grader-9b876f24-4762-4be9-aff4-db7a9b31c673",
          "type": "label_model",
          "model": "o3-mini",
          "input": [
            {
              "type": "message",
              "role": "developer",
              "content": {
                "type": "input_text",
                "text": "\nLabel the following push notification summary as either correct or incorrect.\nThe push notification and the summary will be provided below.\nA good push notificiation summary is concise and snappy.\nIf it is good, then label it as correct, if not, then incorrect.\n"
              }
            },
            {
              "type": "message",
              "role": "user",
              "content": {
                "type": "input_text",
                "text": "\nPush notifications: {{item.input}}\nSummary: {{sample.output_text}}\n"
              }
            }
          ],
          "passing_labels": [
            "correct"
          ],
          "labels": [
            "correct",
            "incorrect"
          ],
          "sampling_params": null
        }
      ],
      "name": "Push Notification Summary Grader",
      "created_at": 1739314509,
      "metadata": {
        "description": "A stored completions eval for push notification summaries"
      }
    }
  ],
  "first_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "last_id": "eval_67aa884cf6688190b58f657d4441c8b7",
  "has_more": true
}
Get eval runs
get
 
https://api.openai.com/v1/evals/{eval_id}/runs
Get a list of runs for an evaluation.

Path parameters
eval_id
string

Required
The ID of the evaluation to retrieve runs for.

Query parameters
after
string

Optional
Identifier for the last run from the previous pagination request.

limit
integer

Optional
Defaults to 20
Number of runs to retrieve.

order
string

Optional
Defaults to asc
Sort order for runs by timestamp. Use asc for ascending order or desc for descending order. Defaults to asc.

status
string

Optional
Filter runs by status. One of queued | in_progress | failed | completed | canceled.

Returns
A list of EvalRun objects matching the specified ID.

Example request
from openai import OpenAI
client = OpenAI()

runs = client.evals.runs.list("egroup_67abd54d9b0081909a86353f6fb9317a")
print(runs)
Response
{
  "object": "list",
  "data": [
    {
      "object": "eval.run",
      "id": "evalrun_67e0c7d31560819090d60c0780591042",
      "eval_id": "eval_67e0c726d560819083f19a957c4c640b",
      "report_url": "https://platform.openai.com/evaluations/eval_67e0c726d560819083f19a957c4c640b",
      "status": "completed",
      "model": "o3-mini",
      "name": "bulk_with_negative_examples_o3-mini",
      "created_at": 1742784467,
      "result_counts": {
        "total": 1,
        "errored": 0,
        "failed": 0,
        "passed": 1
      },
      "per_model_usage": [
        {
          "model_name": "o3-mini",
          "invocation_count": 1,
          "prompt_tokens": 563,
          "completion_tokens": 874,
          "total_tokens": 1437,
          "cached_tokens": 0
        }
      ],
      "per_testing_criteria_results": [
        {
          "testing_criteria": "Push Notification Summary Grader-1808cd0b-eeec-4e0b-a519-337e79f4f5d1",
          "passed": 1,
          "failed": 0
        }
      ],
      "data_source": {
        "type": "completions",
        "source": {
          "type": "file_content",
          "content": [
            {
              "item": {
                "notifications": "\n- New message from Sarah: \"Can you call me later?\"\n- Your package has been delivered!\n- Flash sale: 20% off electronics for the next 2 hours!\n"
              }
            }
          ]
        },
        "input_messages": {
          "type": "template",
          "template": [
            {
              "type": "message",
              "role": "developer",
              "content": {
                "type": "input_text",
                "text": "\n\n\n\nYou are a helpful assistant that takes in an array of push notifications and returns a collapsed summary of them.\nThe push notification will be provided as follows:\n<push_notifications>\n...notificationlist...\n</push_notifications>\n\nYou should return just the summary and nothing else.\n\n\nYou should return a summary that is concise and snappy.\n\n\nHere is an example of a good summary:\n<push_notifications>\n- Traffic alert: Accident reported on Main Street.- Package out for delivery: Expected by 5 PM.- New friend suggestion: Connect with Emma.\n</push_notifications>\n<summary>\nTraffic alert, package expected by 5pm, suggestion for new friend (Emily).\n</summary>\n\n\nHere is an example of a bad summary:\n<push_notifications>\n- Traffic alert: Accident reported on Main Street.- Package out for delivery: Expected by 5 PM.- New friend suggestion: Connect with Emma.\n</push_notifications>\n<summary>\nTraffic alert reported on main street. You have a package that will arrive by 5pm, Emily is a new friend suggested for you.\n</summary>\n"
              }
            },
            {
              "type": "message",
              "role": "user",
              "content": {
                "type": "input_text",
                "text": "<push_notifications>{{item.notifications}}</push_notifications>"
              }
            }
          ]
        },
        "model": "o3-mini",
        "sampling_params": null
      },
      "error": null,
      "metadata": {}
    }
  ],
  "first_id": "evalrun_67e0c7d31560819090d60c0780591042",
  "last_id": "evalrun_67e0c7d31560819090d60c0780591042",
  "has_more": true
}
Get an eval run
get
 
https://api.openai.com/v1/evals/{eval_id}/runs/{run_id}
Get an evaluation run by ID.

Path parameters
eval_id
string

Required
The ID of the evaluation to retrieve runs for.

run_id
string

Required
The ID of the run to retrieve.

Returns
The EvalRun object matching the specified ID.

Example request
from openai import OpenAI
client = OpenAI()

run = client.evals.runs.retrieve(
  "eval_67abd54d9b0081909a86353f6fb9317a",
  "evalrun_67abd54d60ec8190832b46859da808f7"
)
print(run)
Response
{
  "object": "eval.run",
  "id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "report_url": "https://platform.openai.com/evaluations/eval_67abd54d9b0081909a86353f6fb9317a?run_id=evalrun_67abd54d60ec8190832b46859da808f7",
  "status": "queued",
  "model": "gpt-4o-mini",
  "name": "gpt-4o-mini",
  "created_at": 1743092069,
  "result_counts": {
    "total": 0,
    "errored": 0,
    "failed": 0,
    "passed": 0
  },
  "per_model_usage": null,
  "per_testing_criteria_results": null,
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Central Bank Increases Interest Rates Amid Inflation Concerns",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Summit Addresses Climate Change Strategies",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Major Retailer Reports Record-Breaking Holiday Sales",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "National Team Qualifies for World Championship Finals",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Stock Markets Rally After Positive Economic Data Released",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "Global Manufacturer Announces Merger with Competitor",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Breakthrough in Renewable Energy Technology Unveiled",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "World Leaders Sign Historic Climate Agreement",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Professional Athlete Sets New Record in Championship Event",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Financial Institutions Adapt to New Regulatory Requirements",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Tech Conference Showcases Advances in Artificial Intelligence",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Global Markets Respond to Oil Price Fluctuations",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Cooperation Strengthened Through New Treaty",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Sports League Announces Revised Schedule for Upcoming Season",
            "ground_truth": "Sports"
          }
        }
      ]
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.input}}"
          }
        }
      ]
    },
    "model": "gpt-4o-mini",
    "sampling_params": {
      "seed": 42,
      "temperature": 1.0,
      "top_p": 1.0,
      "max_completions_tokens": 2048
    }
  },
  "error": null,
  "metadata": {}
}
Create eval run
post
 
https://api.openai.com/v1/evals/{eval_id}/runs
Kicks off a new run for a given evaluation, specifying the data source, and what model configuration to use to test. The datasource will be validated against the schema specified in the config of the evaluation.

Path parameters
eval_id
string

Required
The ID of the evaluation to create a run for.

Request body
data_source
object

Required
Details about the run's data source.


Show possible types
metadata
map

Optional
Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.

Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.

name
string

Optional
The name of the run.

Returns
The EvalRun object matching the specified ID.

Example request
from openai import OpenAI
client = OpenAI()

run = client.evals.runs.create(
  "eval_67e579652b548190aaa83ada4b125f47",
  name="gpt-4o-mini",
  data_source={
    "type": "completions",
    "input_messages": {
      "type": "template",
      "template": [
        {
          "role": "developer",
          "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
        },
        {
          "role": "user",
          "content": "{{item.input}}"
        }
      ]
    },
    "sampling_params": {
      "temperature": 1,
      "max_completions_tokens": 2048,
      "top_p": 1,
      "seed": 42
    },
    "model": "gpt-4o-mini",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        }
      ]
    }
  }
)
print(run)
Response
{
  "object": "eval.run",
  "id": "evalrun_67e57965b480819094274e3a32235e4c",
  "eval_id": "eval_67e579652b548190aaa83ada4b125f47",
  "report_url": "https://platform.openai.com/evaluations/eval_67e579652b548190aaa83ada4b125f47&run_id=evalrun_67e57965b480819094274e3a32235e4c",
  "status": "queued",
  "model": "gpt-4o-mini",
  "name": "gpt-4o-mini",
  "created_at": 1743092069,
  "result_counts": {
    "total": 0,
    "errored": 0,
    "failed": 0,
    "passed": 0
  },
  "per_model_usage": null,
  "per_testing_criteria_results": null,
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        }
      ]
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.input}}"
          }
        }
      ]
    },
    "model": "gpt-4o-mini",
    "sampling_params": {
      "seed": 42,
      "temperature": 1.0,
      "top_p": 1.0,
      "max_completions_tokens": 2048
    }
  },
  "error": null,
  "metadata": {}
}
Cancel eval run
post
 
https://api.openai.com/v1/evals/{eval_id}/runs/{run_id}
Cancel an ongoing evaluation run.

Path parameters
eval_id
string

Required
The ID of the evaluation whose run you want to cancel.

run_id
string

Required
The ID of the run to cancel.

Returns
The updated EvalRun object reflecting that the run is canceled.

Example request
from openai import OpenAI
client = OpenAI()

canceled_run = client.evals.runs.cancel(
  "eval_67abd54d9b0081909a86353f6fb9317a",
  "evalrun_67abd54d60ec8190832b46859da808f7"
)
print(canceled_run)
Response
{
  "object": "eval.run",
  "id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "report_url": "https://platform.openai.com/evaluations/eval_67abd54d9b0081909a86353f6fb9317a?run_id=evalrun_67abd54d60ec8190832b46859da808f7",
  "status": "canceled",
  "model": "gpt-4o-mini",
  "name": "gpt-4o-mini",
  "created_at": 1743092069,
  "result_counts": {
    "total": 0,
    "errored": 0,
    "failed": 0,
    "passed": 0
  },
  "per_model_usage": null,
  "per_testing_criteria_results": null,
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Central Bank Increases Interest Rates Amid Inflation Concerns",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Summit Addresses Climate Change Strategies",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Major Retailer Reports Record-Breaking Holiday Sales",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "National Team Qualifies for World Championship Finals",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Stock Markets Rally After Positive Economic Data Released",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "Global Manufacturer Announces Merger with Competitor",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Breakthrough in Renewable Energy Technology Unveiled",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "World Leaders Sign Historic Climate Agreement",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Professional Athlete Sets New Record in Championship Event",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Financial Institutions Adapt to New Regulatory Requirements",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Tech Conference Showcases Advances in Artificial Intelligence",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Global Markets Respond to Oil Price Fluctuations",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Cooperation Strengthened Through New Treaty",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Sports League Announces Revised Schedule for Upcoming Season",
            "ground_truth": "Sports"
          }
        }
      ]
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.input}}"
          }
        }
      ]
    },
    "model": "gpt-4o-mini",
    "sampling_params": {
      "seed": 42,
      "temperature": 1.0,
      "top_p": 1.0,
      "max_completions_tokens": 2048
    }
  },
  "error": null,
  "metadata": {}
}
Delete eval run
delete
 
https://api.openai.com/v1/evals/{eval_id}/runs/{run_id}
Delete an eval run.

Path parameters
eval_id
string

Required
The ID of the evaluation to delete the run from.

run_id
string

Required
The ID of the run to delete.

Returns
An object containing the status of the delete operation.

Example request
from openai import OpenAI
client = OpenAI()

deleted = client.evals.runs.delete(
  "eval_123abc",
  "evalrun_abc456"
)
print(deleted)
Response
{
  "object": "eval.run.deleted",
  "deleted": true,
  "run_id": "evalrun_abc456"
}
Get an output item of an eval run
get
 
https://api.openai.com/v1/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}
Get an evaluation run output item by ID.

Path parameters
eval_id
string

Required
The ID of the evaluation to retrieve runs for.

output_item_id
string

Required
The ID of the output item to retrieve.

run_id
string

Required
The ID of the run to retrieve.

Returns
The EvalRunOutputItem object matching the specified ID.

Example request
from openai import OpenAI
client = OpenAI()

output_item = client.evals.runs.output_items.retrieve(
  "eval_67abd54d9b0081909a86353f6fb9317a",
  "evalrun_67abd54d60ec8190832b46859da808f7",
  "outputitem_67abd55eb6548190bb580745d5644a33"
)
print(output_item)
Response
{
  "object": "eval.run.output_item",
  "id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "created_at": 1743092076,
  "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "status": "pass",
  "datasource_item_id": 5,
  "datasource_item": {
    "input": "Stock Markets Rally After Positive Economic Data Released",
    "ground_truth": "Markets"
  },
  "results": [
    {
      "name": "String check-a2486074-d803-4445-b431-ad2262e85d47",
      "sample": null,
      "passed": true,
      "score": 1.0
    }
  ],
  "sample": {
    "input": [
      {
        "role": "developer",
        "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      },
      {
        "role": "user",
        "content": "Stock Markets Rally After Positive Economic Data Released",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "output": [
      {
        "role": "assistant",
        "content": "Markets",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "finish_reason": "stop",
    "model": "gpt-4o-mini-2024-07-18",
    "usage": {
      "total_tokens": 325,
      "completion_tokens": 2,
      "prompt_tokens": 323,
      "cached_tokens": 0
    },
    "error": null,
    "temperature": 1.0,
    "max_completion_tokens": 2048,
    "top_p": 1.0,
    "seed": 42
  }
}
Get eval run output items
get
 
https://api.openai.com/v1/evals/{eval_id}/runs/{run_id}/output_items
Get a list of output items for an evaluation run.

Path parameters
eval_id
string

Required
The ID of the evaluation to retrieve runs for.

run_id
string

Required
The ID of the run to retrieve output items for.

Query parameters
after
string

Optional
Identifier for the last output item from the previous pagination request.

limit
integer

Optional
Defaults to 20
Number of output items to retrieve.

order
string

Optional
Defaults to asc
Sort order for output items by timestamp. Use asc for ascending order or desc for descending order. Defaults to asc.

status
string

Optional
Filter output items by status. Use failed to filter by failed output items or pass to filter by passed output items.

Returns
A list of EvalRunOutputItem objects matching the specified ID.

Example request
from openai import OpenAI
client = OpenAI()

output_items = client.evals.runs.output_items.list(
  "egroup_67abd54d9b0081909a86353f6fb9317a",
  "erun_67abd54d60ec8190832b46859da808f7"
)
print(output_items)
Response
{
  "object": "list",
  "data": [
    {
      "object": "eval.run.output_item",
      "id": "outputitem_67e5796c28e081909917bf79f6e6214d",
      "created_at": 1743092076,
      "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
      "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
      "status": "pass",
      "datasource_item_id": 5,
      "datasource_item": {
        "input": "Stock Markets Rally After Positive Economic Data Released",
        "ground_truth": "Markets"
      },
      "results": [
        {
          "name": "String check-a2486074-d803-4445-b431-ad2262e85d47",
          "sample": null,
          "passed": true,
          "score": 1.0
        }
      ],
      "sample": {
        "input": [
          {
            "role": "developer",
            "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          },
          {
            "role": "user",
            "content": "Stock Markets Rally After Positive Economic Data Released",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          }
        ],
        "output": [
          {
            "role": "assistant",
            "content": "Markets",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          }
        ],
        "finish_reason": "stop",
        "model": "gpt-4o-mini-2024-07-18",
        "usage": {
          "total_tokens": 325,
          "completion_tokens": 2,
          "prompt_tokens": 323,
          "cached_tokens": 0
        },
        "error": null,
        "temperature": 1.0,
        "max_completion_tokens": 2048,
        "top_p": 1.0,
        "seed": 42
      }
    }
  ],
  "first_id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "last_id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "has_more": true
}
The eval object
An Eval object with a data source config and testing criteria. An Eval represents a task to be done for your LLM integration. Like:

Improve the quality of my chatbot
See how well my chatbot handles customer support
Check if o4-mini is better at my usecase than gpt-4o
created_at
integer

The Unix timestamp (in seconds) for when the eval was created.

data_source_config
object

Configuration of data sources used in runs of the evaluation.


Show possible types
id
string

Unique identifier for the evaluation.

metadata
map

Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.

Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.

name
string

The name of the evaluation.

object
string

The object type.

testing_criteria
array

A list of testing criteria.


Show possible types
OBJECT The eval object
{
  "object": "eval",
  "id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "data_source_config": {
    "type": "custom",
    "item_schema": {
      "type": "object",
      "properties": {
        "label": {"type": "string"},
      },
      "required": ["label"]
    },
    "include_sample_schema": true
  },
  "testing_criteria": [
    {
      "name": "My string check grader",
      "type": "string_check",
      "input": "{{sample.output_text}}",
      "reference": "{{item.label}}",
      "operation": "eq",
    }
  ],
  "name": "External Data Eval",
  "created_at": 1739314509,
  "metadata": {
    "test": "synthetics",
  }
}
The eval run object
A schema representing an evaluation run.

created_at
integer

Unix timestamp (in seconds) when the evaluation run was created.

data_source
object

Information about the run's data source.


Show possible types
error
object

An object representing an error response from the Eval API.


Show properties
eval_id
string

The identifier of the associated evaluation.

id
string

Unique identifier for the evaluation run.

metadata
map

Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.

Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.

model
string

The model that is evaluated, if applicable.

name
string

The name of the evaluation run.

object
string

The type of the object. Always "eval.run".

per_model_usage
array

Usage statistics for each model during the evaluation run.


Show properties
per_testing_criteria_results
array

Results per testing criteria applied during the evaluation run.


Show properties
report_url
string

The URL to the rendered evaluation run report on the UI dashboard.

result_counts
object

Counters summarizing the outcomes of the evaluation run.


Show properties
status
string

The status of the evaluation run.

OBJECT The eval run object
{
  "object": "eval.run",
  "id": "evalrun_67e57965b480819094274e3a32235e4c",
  "eval_id": "eval_67e579652b548190aaa83ada4b125f47",
  "report_url": "https://platform.openai.com/evaluations/eval_67e579652b548190aaa83ada4b125f47?run_id=evalrun_67e57965b480819094274e3a32235e4c",
  "status": "queued",
  "model": "gpt-4o-mini",
  "name": "gpt-4o-mini",
  "created_at": 1743092069,
  "result_counts": {
    "total": 0,
    "errored": 0,
    "failed": 0,
    "passed": 0
  },
  "per_model_usage": null,
  "per_testing_criteria_results": null,
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Central Bank Increases Interest Rates Amid Inflation Concerns",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Summit Addresses Climate Change Strategies",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Major Retailer Reports Record-Breaking Holiday Sales",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "National Team Qualifies for World Championship Finals",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Stock Markets Rally After Positive Economic Data Released",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "Global Manufacturer Announces Merger with Competitor",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Breakthrough in Renewable Energy Technology Unveiled",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "World Leaders Sign Historic Climate Agreement",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Professional Athlete Sets New Record in Championship Event",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Financial Institutions Adapt to New Regulatory Requirements",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Tech Conference Showcases Advances in Artificial Intelligence",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Global Markets Respond to Oil Price Fluctuations",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Cooperation Strengthened Through New Treaty",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Sports League Announces Revised Schedule for Upcoming Season",
            "ground_truth": "Sports"
          }
        }
      ]
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.input}}"
          }
        }
      ]
    },
    "model": "gpt-4o-mini",
    "sampling_params": {
      "seed": 42,
      "temperature": 1.0,
      "top_p": 1.0,
      "max_completions_tokens": 2048
    }
  },
  "error": null,
  "metadata": {}
}
The eval run output item object
A schema representing an evaluation run output item.

created_at
integer

Unix timestamp (in seconds) when the evaluation run was created.

datasource_item
object

Details of the input data source item.

datasource_item_id
integer

The identifier for the data source item.

eval_id
string

The identifier of the evaluation group.

id
string

Unique identifier for the evaluation run output item.

object
string

The type of the object. Always "eval.run.output_item".

results
array

A list of results from the evaluation run.


Show properties
run_id
string

The identifier of the evaluation run associated with this output item.

sample
object

A sample containing the input and output of the evaluation run.


Show properties
status
string

The status of the evaluation run.

OBJECT The eval run output item object
{
  "object": "eval.run.output_item",
  "id": "outputitem_67abd55eb6548190bb580745d5644a33",
  "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "created_at": 1739314509,
  "status": "pass",
  "datasource_item_id": 137,
  "datasource_item": {
      "teacher": "To grade essays, I only check for style, content, and grammar.",
      "student": "I am a student who is trying to write the best essay."
  },
  "results": [
    {
      "name": "String Check Grader",
      "type": "string-check-grader",
      "score": 1.0,
      "passed": true,
    }
  ],
  "sample": {
    "input": [
      {
        "role": "system",
        "content": "You are an evaluator bot..."
      },
      {
        "role": "user",
        "content": "You are assessing..."
      }
    ],
    "output": [
      {
        "role": "assistant",
        "content": "The rubric is not clear nor concise."
      }
    ],
    "finish_reason": "stop",
    "model": "gpt-4o-2024-08-06",
    "usage": {
      "total_tokens": 521,
      "completion_tokens": 2,
      "prompt_tokens": 519,
      "cached_tokens": 0
    },
    "error": null,
    "temperature": 1.0,
    "max_completion_tokens": 2048,
    "top_p": 1.0,
    "seed": 42
  }
}

===
Evaluating model performance
============================

Test and improve model outputs through evaluations.

Evaluations (often called **evals**) test model outputs to ensure they meet style and content criteria that you specify. Writing evals to understand how your LLM applications are performing against your expectations, especially when upgrading or trying new models, is an essential component to building reliable applications.

In this guide, we will focus on **configuring evals programmatically using the [Evals API](/docs/api-reference/evals)**. If you prefer, you can also configure evals [in the OpenAI dashboard](/evaluations).

Broadly, there are three steps to build and run evals for your LLM application.

1.  Describe the task to be done as an eval
2.  Run your eval with test inputs (a prompt and input data)
3.  Analyze the results, then iterate and improve on your prompt

This process is somewhat similar to behavior-driven development (BDD), where you begin by specifying how the system should behave before implementing and testing the system. Let's see how we would complete each of the steps above using the [Evals API](/docs/api-reference/evals).

Create an eval for a task
-------------------------

Creating an eval begins by describing a task to be done by a model. Let's say that we would like to use a model to classify the contents of IT support tickets into one of three categories: `Hardware`, `Software`, or `Other`.

To implement this use case with the [Chat Completions API](/docs/api-reference/chat), you might write code like this that combines a [developer message](/docs/guides/text) with a user message containing the text of a support ticket.

Categorize IT support tickets

```bash
curl https://api.openai.com/v1/chat/completions \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-4.1",
        "messages": [
            {
                "role": "developer",
                "content": "Categorize the following support ticket into one of Hardware, Software, or Other."
            },
            {
                "role": "user",
                "content": "My monitor wont turn on - help!"
            }
        ]
    }'
```

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const instructions = `
You are an expert in categorizing IT support tickets. Given the support 
ticket below, categorize the request into one of "Hardware", "Software", 
or "Other". Respond with only one of those words.
`;

const ticket = "My monitor won't turn on - help!";

const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
        { role: "developer", content: instructions },
        { role: "user", content: ticket },
    ],
});

console.log(completion.choices[0].message.content);
```

```python
from openai import OpenAI
client = OpenAI()

instructions = """
You are an expert in categorizing IT support tickets. Given the support 
ticket below, categorize the request into one of "Hardware", "Software", 
or "Other". Respond with only one of those words.
"""

ticket = "My monitor won't turn on - help!"

completion = client.chat.completions.create(
    model="gpt-4.1",
    messages=[
        {"role": "developer", "content": instructions},
        {"role": "user", "content": ticket}
    ]
)

print(completion.choices[0].message.content)
```

Let's set up an eval to test this behavior [via API](/docs/api-reference/evals). An eval needs two key ingredients:

*   `data_source_config`: A schema for the test data you will use along with the eval.
*   `testing_criteria`: The [graders](/docs/guides/graders) that determine if the model output is correct.

Create an eval

```bash
curl https://api.openai.com/v1/evals \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "IT Ticket Categorization",
        "data_source_config": {
            "type": "custom",
            "item_schema": {
                "type": "object",
                "properties": {
                    "ticket_text": { "type": "string" },
                    "correct_label": { "type": "string" }
                },
                "required": ["ticket_text", "correct_label"]
            },
            "include_sample_schema": true
        },
        "testing_criteria": [
            {
                "type": "string_check",
                "name": "Match output to human label",
                "input": "{{ sample.output_text }}",
                "operation": "eq",
                "reference": "{{ item.correct_label }}"
            }
        ]
    }'
```

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const evalObj = await openai.evals.create({
    name: "IT Ticket Categorization",
    data_source_config: {
        type: "custom",
        item_schema: {
            type: "object",
            properties: {
                ticket_text: { type: "string" },
                correct_label: { type: "string" }
            },
            required: ["ticket_text", "correct_label"],
        },
        include_sample_schema: true,
    },
    testing_criteria: [
        {
            type: "string_check",
            name: "Match output to human label",
            input: "{{ sample.output_text }}",
            operation: "eq",
            reference: "{{ item.correct_label }}",
        },
    ],
});

console.log(evalObj);
```

```python
from openai import OpenAI
client = OpenAI()

eval_obj = client.evals.create(
    name="IT Ticket Categorization",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "ticket_text": {"type": "string"},
                "correct_label": {"type": "string"},
            },
            "required": ["ticket_text", "correct_label"],
        },
        "include_sample_schema": True,
    },
    testing_criteria=[
        {
            "type": "string_check",
            "name": "Match output to human label",
            "input": "{{ sample.output_text }}",
            "operation": "eq",
            "reference": "{{ item.correct_label }}",
        }
    ],
)

print(eval_obj)
```

Explanation: data\_source\_config parameter

Running this eval will require a test data set that represents the type of data you expect your prompt to work with (more on creating the test data set later in this guide). In our `data_source_config` parameter, we specify that each **item** in the data set will conform to a [JSON schema](https://json-schema.org/) with two properties:

*   `ticket_text`: a string of text with the contents of a support ticket
*   `correct_label`: a "ground truth" output that the model should match, provided by a human

Since we will be referencing a **sample** in our test criteria (the output generated by a model given our prompt), we also set `include_sample_schema` to `true`.

```json
{
    "type": "custom",
    "item_schema": {
        "type": "object",
        "properties": {
            "ticket": { "type": "string" },
            "category": { "type": "string" }
        },
        "required": ["ticket", "category"]
    },
    "include_sample_schema": true
}
```

Explanation: testing\_criteria parameter

In our `testing_criteria`, we define how we will conclude if the model output satisfies our requirements for each item in the data set. In this case, we just want the model to output one of three category strings based on the input ticket. The string it outputs should exactly match the human-labeled `correct_label` field in our test data. So in this case, we will want to use a `string_check` grader to evaluate the output.

In the test configuration, we will introduce template syntax, represented by the `{{` and `}}` brackets below. This is how we will insert dynamic content into the test for this eval.

*   `{{ item.correct_label }}` refers to the ground truth value in our test data.
*   `{{ sample.output_text }}` refers to the content we will generate from a model to evaluate our prompt - we'll show how to do that when we actually kick off the eval run.

```json
{
    "type": "string_check",
    "name": "Category string match",
    "input": "{{ sample.output_text }}",
    "operation": "eq",
    "reference": "{{ item.category }}"
}
```

After creating the eval, it will be assigned a UUID that you will need to address it later when kicking off a run.

```json
{
  "object": "eval",
  "id": "eval_67e321d23b54819096e6bfe140161184",
  "data_source_config": {
    "type": "custom",
    "schema": { ... omitted for brevity... }
  },
  "testing_criteria": [
    {
      "name": "Match output to human label",
      "id": "Match output to human label-c4fdf789-2fa5-407f-8a41-a6f4f9afd482",
      "type": "string_check",
      "input": "{{ sample.output_text }}",
      "reference": "{{ item.correct_label }}",
      "operation": "eq"
    }
  ],
  "name": "IT Ticket Categorization",
  "created_at": 1742938578,
  "metadata": {}
}
```

Now that we've created an eval that describes the desired behavior of our application, let's test a prompt with a set of test data.

Test a prompt with your eval
----------------------------

Now that we have defined how we want our app to behave in an eval, let's construct a prompt that reliably generates the correct output for a representative sample of test data.

### Uploading test data

There are several ways to provide test data for eval runs, but it may be convenient to upload a [JSONL](https://jsonlines.org/) file that contains data in the schema we specified when we created our eval. A sample JSONL file that conforms to the schema we set up is below:

```json
{ "item": { "ticket_text": "My monitor won't turn on!", "correct_label": "Hardware" } }
{ "item": { "ticket_text": "I'm in vim and I can't quit!", "correct_label": "Software" } }
{ "item": { "ticket_text": "Best restaurants in Cleveland?", "correct_label": "Other" } }
```

This data set contains both test inputs and ground truth labels to compare model outputs against.

Next, let's upload our test data file to the OpenAI platform so we can reference it later. You can upload files [in the dashboard here](/storage/files), but it's possible to [upload files via API](/docs/api-reference/files/create) as well. The samples below assume you are running the command in a directory where you saved the sample JSON data above to a file called `tickets.jsonl`:

Upload a test data file

```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="evals" \
  -F file="@tickets.jsonl"
```

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const file = await openai.files.create({
    file: fs.createReadStream("tickets.jsonl"),
    purpose: "evals",
});

console.log(file);
```

```python
from openai import OpenAI
client = OpenAI()

file = client.files.create(
    file=open("tickets.jsonl", "rb"),
    purpose="evals"
)

print(file)
```

When you upload the file, make note of the unique `id` property in the response payload (also available in the UI if you uploaded via the browser) - we will need to reference that value later:

```json
{
    "object": "file",
    "id": "file-CwHg45Fo7YXwkWRPUkLNHW",
    "purpose": "evals",
    "filename": "tickets.jsonl",
    "bytes": 208,
    "created_at": 1742834798,
    "expires_at": null,
    "status": "processed",
    "status_details": null
}
```

### Creating an eval run

With our test data in place, let's evaluate a prompt and see how it performs against our test criteria. Via API, we can do this by [creating an eval run](/docs/api-reference/evals/createRun).

Make sure to replace `YOUR_EVAL_ID` and `YOUR_FILE_ID` with the unique IDs of the eval configuration and test data files you created in the steps above.

Create an eval run

```bash
curl https://api.openai.com/v1/evals/YOUR_EVAL_ID/runs \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Categorization text run",
        "data_source": {
            "type": "completions",
            "model": "gpt-4.1",
            "input_messages": {
                "type": "template",
                "template": [
                    {"role": "developer", "content": "You are an expert in categorizing IT support tickets. Given the support ticket below, categorize the request into one of Hardware, Software, or Other. Respond with only one of those words."},
                    {"role": "user", "content": "{{ item.ticket_text }}"}
                ]
            },
            "source": { "type": "file_id", "id": "YOUR_FILE_ID" }
        }
    }'
```

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const run = await openai.evals.runs.create("YOUR_EVAL_ID", {
    name: "Categorization text run",
    data_source: {
        type: "completions",
        model: "gpt-4.1",
        input_messages: {
            type: "template",
            template: [
                { role: "developer", content: "You are an expert in categorizing IT support tickets. Given the support ticket below, categorize the request into one of 'Hardware', 'Software', or 'Other'. Respond with only one of those words." },
                { role: "user", content: "{{ item.ticket_text }}" },
            ],
        },
        source: { type: "file_id", id: "YOUR_FILE_ID" },
    },
});

console.log(run);
```

```python
from openai import OpenAI
client = OpenAI()

run = client.evals.runs.create(
    "YOUR_EVAL_ID",
    name="Categorization text run",
    data_source={
        "type": "completions",
        "model": "gpt-4.1",
        "input_messages": {
            "type": "template",
            "template": [
                {"role": "developer", "content": "You are an expert in categorizing IT support tickets. Given the support ticket below, categorize the request into one of 'Hardware', 'Software', or 'Other'. Respond with only one of those words."},
                {"role": "user", "content": "{{ item.ticket_text }}"},
            ],
        },
        "source": {"type": "file_id", "id": "YOUR_FILE_ID"},
    },
)

print(run)
```

When we create the run, we set up a [Chat Completions](/docs/guides/text?api-mode=chat) messages array with the prompt we would like to test. This prompt is used to generate a model response for every line of test data in your data set. We can use the double curly brace syntax to template in the dynamic variable `item.ticket_text`, which is drawn from the current test data item.

If the eval run is successfully created, you'll receive an API response that looks like this:

```json
{
    "object": "eval.run",
    "id": "evalrun_67e44c73eb6481909f79a457749222c7",
    "eval_id": "eval_67e44c5becec81909704be0318146157",
    "report_url": "https://platform.openai.com/evaluations/abc123",
    "status": "queued",
    "model": "gpt-4.1",
    "name": "Categorization text run",
    "created_at": 1743015028,
    "result_counts": { ... },
    "per_model_usage": null,
    "per_testing_criteria_results": null,
    "data_source": {
        "type": "completions",
        "source": {
            "type": "file_id",
            "id": "file-J7MoX9ToHXp2TutMEeYnwj"
        },
        "input_messages": {
            "type": "template",
            "template": [
                {
                    "type": "message",
                    "role": "developer",
                    "content": {
                        "type": "input_text",
                        "text": "You are an expert in...."
                    }
                },
                {
                    "type": "message",
                    "role": "user",
                    "content": {
                        "type": "input_text",
                        "text": "{{item.ticket_text}}"
                    }
                }
            ]
        },
        "model": "gpt-4.1",
        "sampling_params": null
    },
    "error": null,
    "metadata": {}
}
```

Your eval run has now been queued, and it will execute asynchronously as it processes every row in your data set. With our configuration, it will generate completions for testing with the prompt and model we specified.

Analyze the results
-------------------

Depending on the size of your dataset, the eval run may take some time to complete. You can view current status in the dashboard, but you can also [fetch the current status of an eval run via API](/docs/api-reference/evals/getRun):

Retrieve eval run status

```bash
curl https://api.openai.com/v1/evals/YOUR_EVAL_ID/runs/YOUR_RUN_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json"
```

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const run = await openai.evals.runs.retrieve("YOUR_RUN_ID", {
    eval_id: "YOUR_EVAL_ID",
});
console.log(run);
```

```python
from openai import OpenAI
client = OpenAI()

run = client.evals.runs.retrieve("YOUR_EVAL_ID", "YOUR_RUN_ID")
print(run)
```

You'll need the UUID of both your eval and eval run to fetch its status. When you do, you'll see eval run data that looks like this:

```json
{
  "object": "eval.run",
  "id": "evalrun_67e44c73eb6481909f79a457749222c7",
  "eval_id": "eval_67e44c5becec81909704be0318146157",
  "report_url": "https://platform.openai.com/evaluations/xxx",
  "status": "completed",
  "model": "gpt-4.1",
  "name": "Categorization text run",
  "created_at": 1743015028,
  "result_counts": {
    "total": 3,
    "errored": 0,
    "failed": 0,
    "passed": 3
  },
  "per_model_usage": [
    {
      "model_name": "gpt-4o-2024-08-06",
      "invocation_count": 3,
      "prompt_tokens": 166,
      "completion_tokens": 6,
      "total_tokens": 172,
      "cached_tokens": 0
    }
  ],
  "per_testing_criteria_results": [
    {
      "testing_criteria": "Match output to human label-40d67441-5000-4754-ab8c-181c125803ce",
      "passed": 3,
      "failed": 0
    }
  ],
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_id",
      "id": "file-J7MoX9ToHXp2TutMEeYnwj"
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "You are an expert in categorizing IT support tickets. Given the support ticket below, categorize the request into one of Hardware, Software, or Other. Respond with only one of those words."
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.ticket_text}}"
          }
        }
      ]
    },
    "model": "gpt-4.1",
    "sampling_params": null
  },
  "error": null,
  "metadata": {}
}
```

The API response contains granular information about test criteria results, API usage for generating model responses, and a `report_url` property that takes you to a page in the dashboard where you can explore the results visually.

In our simple test, the model reliably generated the content we wanted for a small test case sample. In reality, you will often have to run your eval with more criteria, different prompts, and different data sets. But the process above gives you all the tools you need to build robust evals for your LLM apps!

Video: evals in the dashboard
-----------------------------

The Evaluations tooling [in the OpenAI dashboard](/evaluations) evolves quickly and may not match exactly the UI shown below, but this video will give you a quick overview of how to set up and run evals using the browser-based UI.

Next steps
----------

Now you know how to create and run evals via API, and using the dashboard! Here are a few other resources that may be useful to you as you continue to improve your model results.

[

Cookbook: Detecting prompt regressions

Keep tabs on the performance of your prompts as you iterate on them.

](https://cookbook.openai.com/examples/evaluation/use-cases/regression)[

Cookbook: Bulk model and prompt experimentation

Compare the results of many different prompts and models at once.

](https://cookbook.openai.com/examples/evaluation/use-cases/bulk-experimentation)[

Cookbook: Monitoring stored completions

Examine stored completions to test for prompt regressions.

](https://cookbook.openai.com/examples/evaluation/use-cases/completion-monitoring)[

Fine-tuning

Improve a model's ability to generate responses tailored to your use case.

](/docs/guides/fine-tuning)[

Model distillation

Learn how to distill large model results to smaller, cheaper, and faster models.

](/docs/guides/distillation)

===

#!/usr/bin/env python
# coding: utf-8

# 
# # Structured Output Evaluation Cookbook
#  
# This notebook walks you through a set of focused, runnable examples how to use the OpenAI **Evals** framework to **test, grade, and iterate on tasks that require large‑language models to produce structured outputs**.
# 
# > **Why does this matter?**  
# > Production systems often depend on JSON, SQL, or domain‑specific formats.  Relying on spot checks or ad‑hoc prompt tweaks quickly breaks down.  Instead, you can *codify* expectations as automated evals and let your team ship with safety bricks instead of sand.
# 

# 
# ## Quick Tour
# 
# * **Section 1 – Prerequisites**: environment variables and package setup  
# * **Section 2 – Walk‑through: Code‑symbol extraction**: end‑to‑end demo that grades the model’s ability to extract function and class names from source code.  We keep the original logic intact and simply layer documentation around it.  
# * **Section 3 – Additional Recipes**: sketches of common production patterns such as sentiment extraction as additional code sample for evaluation.
# * **Section 4 – Result Exploration**: lightweight helpers for pulling run output and digging into failures.  
# 

# 
# ## Prerequisites
# 
# 1. **Install dependencies** (minimum versions shown):
# 
# ```bash
# pip install --upgrade openai
# ```
# 
# 2. **Authenticate** by exporting your key:
# 
# ```bash
# export OPENAI_API_KEY="sk‑..."
# ```
# 
# 3. **Optional**: if you plan to run evals in bulk, set up an [organization‑level key](https://platform.openai.com/account/org-settings) with appropriate limits.
# 

# ### Use Case 1: Code symbol extraction

# 
# The goal is to **extract all function, class, and constant symbols from python files inside the OpenAI SDK**.  
# For each file we ask the model to emit structured JSON like:
# 
# ```json
# {
#   "symbols": [
#     {"name": "OpenAI", "kind": "class"},
#     {"name": "Evals", "kind": "module"},
#     ...
#   ]
# }
# ```
# 
# A rubric model then grades **completeness** (did we capture every symbol?) and **quality** (are the kinds correct?) on a 1‑7 scale.
# 

# ### Evaluating Code Quality Extraction with a Custom Dataset

# Let us walk though an example to evaluate a model's ability to extract symbols from code using the OpenAI **Evals** framework with a custom in-memory dataset.

# ### Initialize SDK client
# Creates an `openai.OpenAI` client using the `OPENAI_API_KEY` we exported above.  Nothing will run without this.

# In[11]:


get_ipython().run_line_magic('pip', 'install --upgrade openai pandas rich --quiet')



import os
import time
import openai
from rich import print
import pandas as pd

client = openai.OpenAI(
    api_key=os.getenv("OPENAI_API_KEY") or os.getenv("_OPENAI_API_KEY"),
)


# ### Dataset factory & grading rubric
# * `get_dataset` builds a small in-memory dataset by reading several SDK files.
# * `structured_output_grader` defines a detailed evaluation rubric.
# * `client.evals.create(...)` registers the eval with the platform.

# In[4]:


def get_dataset(limit=None):
    openai_sdk_file_path = os.path.dirname(openai.__file__)

    file_paths = [
        os.path.join(openai_sdk_file_path, "resources", "evals", "evals.py"),
        os.path.join(openai_sdk_file_path, "resources", "responses", "responses.py"),
        os.path.join(openai_sdk_file_path, "resources", "images.py"),
        os.path.join(openai_sdk_file_path, "resources", "embeddings.py"),
        os.path.join(openai_sdk_file_path, "resources", "files.py"),
    ]

    items = []
    for file_path in file_paths:
        items.append({"input": open(file_path, "r").read()})
    if limit:
        return items[:limit]
    return items


structured_output_grader = """
You are a helpful assistant that grades the quality of extracted information from a code file.
You will be given a code file and a list of extracted information.
You should grade the quality of the extracted information.

You should grade the quality on a scale of 1 to 7.
You should apply the following criteria, and calculate your score as follows:
You should first check for completeness on a scale of 1 to 7.
Then you should apply a quality modifier.

The quality modifier is a multiplier from 0 to 1 that you multiply by the completeness score.
If there is 100% coverage for completion and it is all high quality, then you would return 7*1.
If there is 100% coverage for completion but it is all low quality, then you would return 7*0.5.
etc.
"""

structured_output_grader_user_prompt = """
<Code File>
{{item.input}}
</Code File>

<Extracted Information>
{{sample.output_json.symbols}}
</Extracted Information>
"""

logs_eval = client.evals.create(
    name="Code QA Eval",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {"input": {"type": "string"}},
        },
        "include_sample_schema": True,
    },
    testing_criteria=[
        {
            "type": "score_model",
            "name": "General Evaluator",
            "model": "o3",
            "input": [
                {"role": "system", "content": structured_output_grader},
                {"role": "user", "content": structured_output_grader_user_prompt},
            ],
            "range": [1, 7],
            "pass_threshold": 5.5,
        }
    ],
)


# ### Kick off model runs
# Here we launch two runs against the same eval: one that calls the **Completions** endpoint, and one that calls the **Responses** endpoint.

# In[5]:


### Kick off model runs
gpt_4one_completions_run = client.evals.runs.create(
    name="gpt-4.1",
    eval_id=logs_eval.id,
    data_source={
        "type": "completions",
        "source": {
            "type": "file_content",
            "content": [{"item": item} for item in get_dataset(limit=1)],
        },
        "input_messages": {
            "type": "template",
            "template": [
                {
                    "type": "message",
                    "role": "system",
                    "content": {"type": "input_text", "text": "You are a helpful assistant."},
                },
                {
                    "type": "message",
                    "role": "user",
                    "content": {
                        "type": "input_text",
                        "text": "Extract the symbols from the code file {{item.input}}",
                    },
                },
            ],
        },
        "model": "gpt-4.1",
        "sampling_params": {
            "seed": 42,
            "temperature": 0.7,
            "max_completions_tokens": 10000,
            "top_p": 0.9,
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "python_symbols",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "symbols": {
                                "type": "array",
                                "description": "A list of symbols extracted from Python code.",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "name": {"type": "string", "description": "The name of the symbol."},
                                        "symbol_type": {
                                            "type": "string", "description": "The type of the symbol, e.g., variable, function, class.",
                                        },
                                    },
                                    "required": ["name", "symbol_type"],
                                    "additionalProperties": False,
                                },
                            }
                        },
                        "required": ["symbols"],
                        "additionalProperties": False,
                    },
                    "strict": True,
                },
            },
        },
    },
)

gpt_4one_responses_run = client.evals.runs.create(
    name="gpt-4.1-mini",
    eval_id=logs_eval.id,
    data_source={
        "type": "responses",
        "source": {
            "type": "file_content",
            "content": [{"item": item} for item in get_dataset(limit=1)],
        },
        "input_messages": {
            "type": "template",
            "template": [
                {
                    "type": "message",
                    "role": "system",
                    "content": {"type": "input_text", "text": "You are a helpful assistant."},
                },
                {
                    "type": "message",
                    "role": "user",
                    "content": {
                        "type": "input_text",
                        "text": "Extract the symbols from the code file {{item.input}}",
                    },
                },
            ],
        },
        "model": "gpt-4.1-mini",
        "sampling_params": {
            "seed": 42,
            "temperature": 0.7,
            "max_completions_tokens": 10000,
            "top_p": 0.9,
            "text": {
                "format": {
                    "type": "json_schema",
                    "name": "python_symbols",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "symbols": {
                                "type": "array",
                                "description": "A list of symbols extracted from Python code.",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "name": {"type": "string", "description": "The name of the symbol."},
                                        "symbol_type": {
                                            "type": "string",
                                            "description": "The type of the symbol, e.g., variable, function, class.",
                                        },
                                    },
                                    "required": ["name", "symbol_type"],
                                    "additionalProperties": False,
                                },
                            }
                        },
                        "required": ["symbols"],
                        "additionalProperties": False,
                    },
                    "strict": True,
                },
            },
        },
    },
)


# ### Utility poller
# Next, we will use a simple loop that waits for all runs to finish, then saves each run’s JSON to disk so you can inspect it later or attach it to CI artifacts.

# In[7]:


### Utility poller
def poll_runs(eval_id, run_ids):
    while True:
        runs = [client.evals.runs.retrieve(rid, eval_id=eval_id) for rid in run_ids]
        for run in runs:
            print(run.id, run.status, run.result_counts)
        if all(run.status in {"completed", "failed"} for run in runs):
            # dump results to file
            for run in runs:
                with open(f"{run.id}.json", "w") as f:
                    f.write(
                        client.evals.runs.output_items.list(
                            run_id=run.id, eval_id=eval_id
                        ).model_dump_json(indent=4)
                    )
            break
        time.sleep(5)

poll_runs(logs_eval.id, [gpt_4one_completions_run.id, gpt_4one_responses_run.id])


# ### Load outputs for quick inspection
# We will fetch the output items for both runs so we can print or post‑process them.

# In[8]:


completions_output = client.evals.runs.output_items.list(
    run_id=gpt_4one_completions_run.id, eval_id=logs_eval.id
)

responses_output = client.evals.runs.output_items.list(
    run_id=gpt_4one_responses_run.id, eval_id=logs_eval.id
)


# ### Human-readable dump
# Let us print a side-by-side view of completions vs responses.

# In[20]:


from IPython.display import display, HTML

# Collect outputs for both runs
completions_outputs = [item.sample.output[0].content for item in completions_output]
responses_outputs = [item.sample.output[0].content for item in responses_output]

# Create DataFrame for side-by-side display (truncated to 250 chars for readability)
df = pd.DataFrame({
    "Completions Output": [c[:250].replace('\n', ' ') + ('...' if len(c) > 250 else '') for c in completions_outputs],
    "Responses Output": [r[:250].replace('\n', ' ') + ('...' if len(r) > 250 else '') for r in responses_outputs]
})

# Custom color scheme
custom_styles = [
    {'selector': 'th', 'props': [('font-size', '1.1em'), ('background-color', '#323C50'), ('color', '#FFFFFF'), ('border-bottom', '2px solid #1CA7EC')]},
    {'selector': 'td', 'props': [('font-size', '1em'), ('max-width', '650px'), ('background-color', '#F6F8FA'), ('color', '#222'), ('border-bottom', '1px solid #DDD')]},
    {'selector': 'tr:hover td', 'props': [('background-color', '#D1ECF1'), ('color', '#18647E')]},
    {'selector': 'tbody tr:nth-child(even) td', 'props': [('background-color', '#E8F1FB')]},
    {'selector': 'tbody tr:nth-child(odd) td', 'props': [('background-color', '#F6F8FA')]},
    {'selector': 'table', 'props': [('border-collapse', 'collapse'), ('border-radius', '6px'), ('overflow', 'hidden')]},
]

styled = (
    df.style
    .set_properties(**{'white-space': 'pre-wrap', 'word-break': 'break-word', 'padding': '8px'})
    .set_table_styles(custom_styles)
    .hide(axis="index")
)

display(HTML("""
<h4 style="color: #1CA7EC; font-weight: 600; letter-spacing: 1px; text-shadow: 0 1px 2px rgba(0,0,0,0.08), 0 0px 0px #fff;">
Completions vs Responses Output
</h4>
"""))
display(styled)


# ### Visualize the Results
# 
# Below are visualizations that represent the evaluation data and code outputs for structured QA evaluation. These images provide insights into the data distribution and the evaluation workflow.
# 
# ---
# 
# **Evaluation Data Overview**
# 
# ![Evaluation Data Part 1](../../../images/eval_qa_data_1.png)
# 
# ![Evaluation Data Part 2](../../../images/eval_qa_data_2.png)
# 
# ---
# 
# **Evaluation Code Workflow**
# 
# ![Evaluation Code Structure](../../../images/eval_qa_code.png)
# 
# ---
# 
# By reviewing these visualizations, you can better understand the structure of the evaluation dataset and the steps involved in evaluating structured outputs for QA tasks.
# 

# ### Use Case 2: Multi-lingual Sentiment Extraction
# In a similar way, let us evaluate a multi-lingual sentiment extraction model with structured outputs.

# In[29]:


# Sample in-memory dataset for sentiment extraction
sentiment_dataset = [
    {
        "text": "I love this product!",
        "channel": "twitter",
        "language": "en"
    },
    {
        "text": "This is the worst experience I've ever had.",
        "channel": "support_ticket",
        "language": "en"
    },
    {
        "text": "It's okay – not great but not bad either.",
        "channel": "app_review",
        "language": "en"
    },
    {
        "text": "No estoy seguro de lo que pienso sobre este producto.",
        "channel": "facebook",
        "language": "es"
    },
    {
        "text": "总体来说，我对这款产品很满意。",
        "channel": "wechat",
        "language": "zh"
    },
]


# In[31]:


# Define output schema
sentiment_output_schema = {
    "type": "object",
    "properties": {
        "sentiment": {
            "type": "string",
            "description": "overall label: positive / negative / neutral"
        },
        "confidence": {
            "type": "number",
            "description": "confidence score 0-1"
        },
        "emotions": {
            "type": "array",
            "description": "list of dominant emotions (e.g. joy, anger)",
            "items": {"type": "string"}
        }
    },
    "required": ["sentiment", "confidence", "emotions"],
    "additionalProperties": False
}

# Grader prompts
sentiment_grader_system = """You are a strict grader for sentiment extraction.
Given the text and the model's JSON output, score correctness on a 1-5 scale."""

sentiment_grader_user = """Text: {{item.text}}
Model output:
{{sample.output_json}}
"""


# In[32]:


# Register an eval for the richer sentiment task
sentiment_eval = client.evals.create(
    name="sentiment_extraction_eval",
    data_source_config={
        "type": "custom",
        "item_schema": {          # matches the new dataset fields
            "type": "object",
            "properties": {
                "text": {"type": "string"},
                "channel": {"type": "string"},
                "language": {"type": "string"},
            },
            "required": ["text"],
        },
        "include_sample_schema": True,
    },
    testing_criteria=[
        {
            "type": "score_model",
            "name": "Sentiment Grader",
            "model": "o3",
            "input": [
                {"role": "system", "content": sentiment_grader_system},
                {"role": "user",   "content": sentiment_grader_user},
            ],
            "range": [1, 5],
            "pass_threshold": 3.5,
        }
    ],
)


# In[ ]:


# Run the sentiment eval
sentiment_run = client.evals.runs.create(
    name="gpt-4.1-sentiment",
    eval_id=sentiment_eval.id,
    data_source={
        "type": "responses",
        "source": {
            "type": "file_content",
            "content": [{"item": item} for item in sentiment_dataset],
        },
        "input_messages": {
            "type": "template",
            "template": [
                {
                    "type": "message",
                    "role": "system",
                    "content": {"type": "input_text", "text": "You are a helpful assistant."},
                },
                {
                    "type": "message",
                    "role": "user",
                    "content": {
                        "type": "input_text",
                        "text": "{{item.text}}",
                    },
                },
            ],
        },
        "model": "gpt-4.1",
        "sampling_params": {
            "seed": 42,
            "temperature": 0.7,
            "max_completions_tokens": 100,
            "top_p": 0.9,
            "text": {
                "format": {
                    "type": "json_schema",
                    "name": "sentiment_output",
                    "schema": sentiment_output_schema,
                    "strict": True,
                },
            },
        },
    },
)


# ### Visualize evals data 
# ![image](../../../images/evals_sentiment.png)

# ### Summary and Next Steps
# 
# In this notebook, we have demonstrated how to use the OpenAI Evaluation API to evaluate a model's performance on a structured output task. 
# 
# **Next steps:**
# - We encourage you to try out the API with your own models and datasets.
# - You can also explore the API documentation for more details on how to use the API.    
# 
# For more information, see the [OpenAI Evals documentation](https://platform.openai.com/docs/guides/evals).
# 