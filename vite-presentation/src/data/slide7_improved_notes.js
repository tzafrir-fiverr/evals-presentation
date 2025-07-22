export const slide7ImprovedNotes = {
  title: "Level 2: Implementation - Model-as-Judge Production Patterns",
  
  tldr: [
    "Production-ready model-as-judge implementation with multi-criteria weighted scoring (G-Eval framework)",
    "Advanced calibration techniques: position bias mitigation, sample consistency, ensemble judging",
    "Complete error handling, A/B testing framework, and human-in-the-loop integration patterns"
  ],
  
  rubricEngineering: {
    multiCriteriaWeightedScoring: {
      description: "G-Eval inspired framework with weighted criteria and continuous scoring",
      implementation: `// Production-ready multi-criteria evaluation with weighted scoring
const createMultiCriteriaEval = async (client) => {
  const evalConfig = {
    evalName: "customer_service_quality_multicriteria",
    dataSourceConfig: {
      type: "json",
      jsonSchema: {
        type: "object",
        properties: {
          complaint: { type: "string" },
          response: { type: "string" },
          priority: { type: "string", enum: ["high", "medium", "low"] }
        },
        required: ["complaint", "response", "priority"]
      }
    },
    testingCriteria: [
      {
        graderType: "label_model",
        model: "gpt-4o", // Most accurate for nuanced evaluation
        inputMessages: [
          {
            role: "developer",
            content: \`You are evaluating customer service responses using a weighted multi-criteria framework.

## Evaluation Criteria and Weights:
1. **Empathy & Understanding (30%)**: Does the response acknowledge and validate customer emotions?
   - 5: Exceptional empathy with specific emotional acknowledgment
   - 4: Clear empathy with general acknowledgment  
   - 3: Some empathy shown
   - 2: Minimal empathy
   - 1: No empathy or dismissive

2. **Solution Quality (35%)**: Is the proposed solution practical and complete?
   - 5: Complete solution with preventive measures
   - 4: Complete solution addressing all issues
   - 3: Adequate solution for main issue
   - 2: Partial or unclear solution
   - 1: No solution or unhelpful response

3. **Communication Clarity (20%)**: Is the response clear and well-structured?
   - 5: Crystal clear with perfect structure
   - 4: Very clear with good structure
   - 3: Generally clear
   - 2: Some unclear parts
   - 1: Confusing or poorly structured

4. **Professional Tone (15%)**: Is the tone appropriate and professional?
   - 5: Perfectly professional and personalized
   - 4: Professional with good tone
   - 3: Adequate professionalism
   - 2: Some unprofessional elements
   - 1: Unprofessional or inappropriate

## Scoring:
- Calculate weighted average: (C1×0.30 + C2×0.35 + C3×0.20 + C4×0.15)
- Threshold: ≥3.5 = GOOD, <3.5 = BAD
- Provide detailed scoring breakdown in your response

## Output Format:
{
  "overall_rating": "GOOD" or "BAD",
  "weighted_score": 0.0-5.0,
  "criteria_scores": {
    "empathy": 1-5,
    "solution": 1-5,
    "clarity": 1-5,
    "tone": 1-5
  },
  "reasoning": "Brief explanation of scoring"
}\`
          },
          {
            role: "user", 
            content: "Complaint: {{item.complaint}}\\n\\nResponse: {{item.response}}\\n\\nPriority: {{item.priority}}"
          }
        ],
        passing_labels: ["GOOD"],
        temperature: 0.1 // Low temperature for consistency
      }
    ]
  };
  
  const eval = await client.evals.create(evalConfig);
  return eval.id;
};`,
      benefits: [
        "Granular feedback on specific improvement areas",
        "Weighted importance reflects business priorities", 
        "Continuous scores enable threshold tuning",
        "JSON output enables automated analysis"
      ]
    },
    
    binaryWithChainOfThought: {
      description: "Simple binary evaluation with reasoning for debugging",
      implementation: `// Binary evaluation with Chain-of-Thought reasoning
const binaryCoTGrader = {
  graderType: "label_model",
  model: "o3-mini", // Fast and accurate for binary decisions
  inputMessages: [
    {
      role: "developer",
      content: \`You are evaluating customer service responses.

Think through your evaluation step-by-step:
1. Identify if the customer's issue is acknowledged
2. Check if empathy or apology is present
3. Verify a clear solution is provided
4. Assess professionalism and tone
5. Make final judgment

A GOOD response must satisfy ALL criteria.
Output format: First your reasoning, then "VERDICT: GOOD" or "VERDICT: BAD"\`
    },
    {
      role: "user",
      content: "{{item.complaint}}\\n\\nResponse: {{item.response}}"
    }
  ],
  passing_labels: ["GOOD"]
};`
    },
    
    additiveScalePattern: {
      description: "Additive scoring for transparent evaluation",
      implementation: `// Additive scale for atomic criteria
const additiveScaleGrader = {
  graderType: "label_model", 
  model: "gpt-4o-mini", // Cost-effective for simple scoring
  inputMessages: [
    {
      role: "developer",
      content: \`Score the response using this additive scale:

Award points for each criterion met:
- +1 point: Acknowledges the specific issue
- +1 point: Shows empathy or apologizes  
- +1 point: Provides clear solution
- +1 point: Includes timeline or next steps
- +1 point: Professional and respectful tone

Total score interpretation:
- 5 points: EXCELLENT
- 4 points: GOOD
- 3 points: ACCEPTABLE
- 2 points: POOR
- 0-1 points: UNACCEPTABLE

Output: "SCORE: X/5 - RATING"\`
    }
  ],
  passing_labels: ["EXCELLENT", "GOOD", "ACCEPTABLE"]
};`
    }
  },
  
  testDataStrategy: {
    syntheticGeneration: {
      description: "Generate comprehensive test cases covering edge cases",
      implementation: `// Synthetic test data generation with edge cases
const generateTestData = async (client) => {
  const scenarios = [
    // Standard cases
    { type: "billing", severity: "normal", emotional_state: "frustrated" },
    { type: "technical", severity: "urgent", emotional_state: "angry" },
    { type: "shipping", severity: "low", emotional_state: "confused" },
    
    // Edge cases
    { type: "multiple_issues", severity: "high", emotional_state: "desperate" },
    { type: "vague_complaint", severity: "unknown", emotional_state: "neutral" },
    { type: "abusive_language", severity: "high", emotional_state: "hostile" },
    { type: "legal_threat", severity: "critical", emotional_state: "threatening" }
  ];
  
  const testCases = [];
  for (const scenario of scenarios) {
    // Generate complaint
    const complaint = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: \`Generate a realistic customer complaint:
Type: \${scenario.type}
Severity: \${scenario.severity}
Emotional state: \${scenario.emotional_state}
Make it 2-3 sentences.\`
      }],
      temperature: 0.8
    });
    
    // Generate good and bad responses for calibration
    const goodResponse = await generateResponse(complaint, "exemplary");
    const badResponse = await generateResponse(complaint, "poor");
    
    testCases.push(
      { complaint: complaint.content, response: goodResponse, expected: "GOOD" },
      { complaint: complaint.content, response: badResponse, expected: "BAD" }
    );
  }
  
  return testCases;
};`
    },
    
    positionBiasTestSet: {
      description: "Test data specifically for detecting position bias",
      implementation: `// Position bias detection dataset
const createPositionBiasTests = (originalTests) => {
  const biasTests = [];
  
  originalTests.forEach(test => {
    // Original position
    biasTests.push({
      id: \`\${test.id}_original\`,
      optionA: test.response_good,
      optionB: test.response_bad,
      expected_winner: "A"
    });
    
    // Swapped position
    biasTests.push({
      id: \`\${test.id}_swapped\`,
      optionA: test.response_bad,
      optionB: test.response_good,
      expected_winner: "B"
    });
  });
  
  return biasTests;
};`
    },
    
    humanValidatedReference: {
      description: "Expert-annotated golden dataset",
      implementation: `// Human expert validation workflow
const createGoldenDataset = async (rawData, experts) => {
  const goldenData = [];
  
  for (const item of rawData) {
    const annotations = [];
    
    // Collect expert annotations
    for (const expert of experts) {
      const annotation = await expert.annotate({
        complaint: item.complaint,
        response: item.response,
        criteria: ["empathy", "solution", "clarity", "tone"]
      });
      annotations.push(annotation);
    }
    
    // Calculate inter-rater agreement
    const agreement = calculateKrippendorffAlpha(annotations);
    
    // Only include high-agreement examples
    if (agreement > 0.8) {
      goldenData.push({
        ...item,
        expert_consensus: aggregateAnnotations(annotations),
        agreement_score: agreement
      });
    }
  }
  
  return goldenData;
};`
    }
  },
  
  advancedTechniques: {
    positionBiasCalibration: {
      description: "Mitigate position bias through balanced calibration",
      implementation: `// Position bias mitigation with swap augmentation
const runCalibratedEvaluation = async (client, evalId, testData) => {
  const runs = [];
  const numSwaps = 3; // Number of position permutations
  
  for (let i = 0; i < numSwaps; i++) {
    // Shuffle response positions
    const shuffledData = testData.map(item => ({
      ...item,
      response: i % 2 === 0 ? item.response : shuffleWords(item.response),
      position_variant: i
    }));
    
    // Run evaluation
    const run = await client.evals.runs.create({
      evalId,
      model: "gpt-4o",
      datasetConfig: { data: shuffledData },
      temperature: 0.1
    });
    
    runs.push(run);
  }
  
  // Aggregate results with position calibration
  const calibratedResults = aggregateWithCalibration(runs);
  return {
    finalScore: calibratedResults.score,
    positionBiasDetected: calibratedResults.biasLevel > 0.1,
    confidenceInterval: calibratedResults.ci95
  };
};

// Balanced position calibration
const balancedCalibration = async (responses) => {
  const scores = [];
  
  // Generate multiple evaluations with different positions
  for (let i = 0; i < 5; i++) {
    const positions = shuffleArray(responses);
    const score = await evaluateWithPositions(positions);
    scores.push(score);
  }
  
  return {
    mean: average(scores),
    std: standardDeviation(scores),
    calibrated: median(scores) // More robust to outliers
  };
};`
    },
    
    multiModelEnsemble: {
      description: "Use multiple judge models to reduce bias",
      implementation: `// Multi-model ensemble judging
const ensembleEvaluation = async (client, testCase) => {
  const models = [
    { name: "gpt-4o", weight: 0.4 },      // Most accurate
    { name: "claude-3-5-sonnet", weight: 0.3 }, // Different perspective
    { name: "gemini-1.5-pro", weight: 0.3 }     // Speed/cost balance
  ];
  
  const evaluations = await Promise.all(
    models.map(async (model) => {
      try {
        const result = await evaluateWithModel(client, testCase, model.name);
        return {
          model: model.name,
          score: result.score,
          weight: model.weight,
          reasoning: result.reasoning
        };
      } catch (error) {
        console.error(\`Model \${model.name} failed:\`, error);
        return null;
      }
    })
  );
  
  // Filter out failed evaluations
  const validEvals = evaluations.filter(e => e !== null);
  
  // Weighted aggregation
  const weightedScore = validEvals.reduce((sum, eval) => 
    sum + (eval.score * eval.weight), 0
  ) / validEvals.reduce((sum, eval) => sum + eval.weight, 0);
  
  // Check for consensus
  const scores = validEvals.map(e => e.score);
  const consensus = standardDeviation(scores) < 0.15;
  
  return {
    finalScore: weightedScore,
    consensus,
    modelResults: validEvals,
    confidence: consensus ? "high" : "low"
  };
};`
    },
    
    sampleConsistencyCalibration: {
      description: "Use multiple samples to improve calibration",
      implementation: `// Sample consistency-based calibration
const consistencyCalibration = async (client, evalConfig, testCase) => {
  const numSamples = 5;
  const temperature = 0.3; // Some variability for consistency check
  
  const samples = await Promise.all(
    Array(numSamples).fill(0).map(async () => {
      const result = await client.evals.runs.create({
        evalId: evalConfig.id,
        model: "gpt-4o",
        datasetConfig: { data: [testCase] },
        temperature
      });
      return result;
    })
  );
  
  // Calculate consistency metrics
  const scores = samples.map(s => s.score);
  const consistency = {
    mean: average(scores),
    std: standardDeviation(scores),
    entropy: calculateEntropy(scores),
    unanimity: scores.every(s => s === scores[0])
  };
  
  // Calibrate based on consistency
  if (consistency.std < 0.1 && consistency.entropy < 0.5) {
    // High consistency - use mean
    return {
      calibratedScore: consistency.mean,
      confidence: "high",
      method: "consistent_mean"
    };
  } else if (consistency.unanimity) {
    // Perfect agreement despite temperature
    return {
      calibratedScore: scores[0],
      confidence: "very_high", 
      method: "unanimous"
    };
  } else {
    // Low consistency - use robust estimator
    return {
      calibratedScore: median(scores),
      confidence: "medium",
      method: "robust_median",
      warning: "High variance detected"
    };
  }
};`
    },
    
    humanInTheLoop: {
      description: "Integration with human review for critical decisions",
      implementation: `// Human-in-the-loop workflow integration
class HumanReviewWorkflow {
  constructor(client, config) {
    this.client = client;
    this.confidenceThreshold = config.confidenceThreshold || 0.8;
    this.disagreementThreshold = config.disagreementThreshold || 0.2;
    this.criticalCategories = config.criticalCategories || ["legal", "safety"];
  }
  
  async evaluate(testCase) {
    // Run automated evaluation
    const autoEval = await this.runAutomatedEval(testCase);
    
    // Determine if human review needed
    const needsReview = this.checkReviewCriteria(autoEval, testCase);
    
    if (needsReview.required) {
      // Queue for human review
      const reviewRequest = {
        id: generateId(),
        testCase,
        autoEval,
        reason: needsReview.reason,
        priority: this.calculatePriority(testCase, needsReview),
        deadline: this.calculateDeadline(needsReview.priority)
      };
      
      await this.queueForReview(reviewRequest);
      
      return {
        status: "pending_human_review",
        autoScore: autoEval.score,
        reviewRequest
      };
    }
    
    // Auto-approved
    return {
      status: "auto_approved",
      finalScore: autoEval.score,
      confidence: autoEval.confidence
    };
  }
  
  checkReviewCriteria(autoEval, testCase) {
    // Low confidence
    if (autoEval.confidence < this.confidenceThreshold) {
      return { required: true, reason: "low_confidence", priority: "medium" };
    }
    
    // Model disagreement
    if (autoEval.modelDisagreement > this.disagreementThreshold) {
      return { required: true, reason: "model_disagreement", priority: "high" };
    }
    
    // Critical category
    if (this.criticalCategories.includes(testCase.category)) {
      return { required: true, reason: "critical_category", priority: "urgent" };
    }
    
    // Edge case detection
    if (autoEval.edgeCaseScore > 0.7) {
      return { required: true, reason: "edge_case", priority: "medium" };
    }
    
    return { required: false };
  }
  
  async processHumanFeedback(reviewId, humanDecision) {
    const review = await this.getReview(reviewId);
    
    // Update evaluation
    const finalResult = {
      ...review.autoEval,
      humanReviewed: true,
      humanDecision,
      finalScore: humanDecision.score,
      learnings: this.extractLearnings(review, humanDecision)
    };
    
    // Add to training data if significant disagreement
    if (Math.abs(review.autoEval.score - humanDecision.score) > 0.3) {
      await this.addToTrainingData({
        input: review.testCase,
        autoScore: review.autoEval.score,
        humanScore: humanDecision.score,
        explanation: humanDecision.reasoning
      });
    }
    
    return finalResult;
  }
}`,
      benefits: [
        "Maintains human oversight for critical decisions",
        "Continuously improves through feedback loop",
        "Reduces human workload by 90%+ through smart routing",
        "Builds training data for model improvement"
      ]
    },
    
    abTestingFramework: {
      description: "A/B test different judge models and configurations",
      implementation: `// A/B testing framework for judge optimization
class JudgeABTest {
  constructor(client, config) {
    this.client = client;
    this.variants = config.variants;
    this.sampleSize = config.sampleSize || 1000;
    this.confidenceLevel = config.confidenceLevel || 0.95;
  }
  
  async runTest(testData) {
    const results = {};
    
    // Run each variant
    for (const variant of this.variants) {
      console.log(\`Testing variant: \${variant.name}\`);
      
      const variantResults = await this.evaluateVariant(
        variant,
        testData.slice(0, this.sampleSize)
      );
      
      results[variant.name] = {
        ...variantResults,
        config: variant
      };
    }
    
    // Statistical analysis
    const analysis = this.analyzeResults(results);
    
    return {
      results,
      analysis,
      recommendation: this.getRecommendation(analysis)
    };
  }
  
  async evaluateVariant(variant, testData) {
    const startTime = Date.now();
    const scores = [];
    const costs = [];
    
    for (const test of testData) {
      const result = await this.runSingleEval(variant, test);
      scores.push(result.score);
      costs.push(result.cost);
    }
    
    const duration = Date.now() - startTime;
    
    return {
      scores,
      accuracy: this.calculateAccuracy(scores, testData),
      avgScore: average(scores),
      stdDev: standardDeviation(scores),
      totalCost: sum(costs),
      avgLatency: duration / testData.length,
      throughput: testData.length / (duration / 1000)
    };
  }
  
  analyzeResults(results) {
    const variants = Object.keys(results);
    const analysis = {
      winner: null,
      significance: {},
      tradeoffs: []
    };
    
    // Pairwise statistical tests
    for (let i = 0; i < variants.length; i++) {
      for (let j = i + 1; j < variants.length; j++) {
        const varA = variants[i];
        const varB = variants[j];
        
        const tTest = this.performTTest(
          results[varA].scores,
          results[varB].scores
        );
        
        analysis.significance[\`\${varA}_vs_\${varB}\`] = {
          pValue: tTest.pValue,
          significant: tTest.pValue < (1 - this.confidenceLevel),
          effectSize: tTest.effectSize
        };
      }
    }
    
    // Multi-criteria decision
    const scores = this.calculateCompositeScores(results);
    analysis.winner = this.selectWinner(scores);
    
    // Identify tradeoffs
    analysis.tradeoffs = this.identifyTradeoffs(results);
    
    return analysis;
  }
  
  calculateCompositeScores(results) {
    // Weighted scoring: accuracy (40%), cost (30%), latency (30%)
    const weights = {
      accuracy: 0.4,
      cost: -0.3, // Negative because lower is better
      latency: -0.3
    };
    
    const normalized = this.normalizeMetrics(results);
    const scores = {};
    
    for (const [variant, data] of Object.entries(normalized)) {
      scores[variant] = 
        data.accuracy * weights.accuracy +
        data.cost * weights.cost +
        data.latency * weights.latency;
    }
    
    return scores;
  }
}

// Example A/B test configuration
const abTestConfig = {
  variants: [
    {
      name: "gpt4o_detailed",
      model: "gpt-4o",
      rubric: "detailed_5_criteria",
      temperature: 0.1
    },
    {
      name: "o3mini_simple", 
      model: "o3-mini",
      rubric: "simple_binary",
      temperature: 0
    },
    {
      name: "ensemble_3model",
      models: ["gpt-4o-mini", "claude-3-haiku", "gemini-1.5-flash"],
      aggregation: "weighted_vote"
    }
  ],
  sampleSize: 500,
  confidenceLevel: 0.95
};`
    }
  },
  
  debuggingTips: [
    {
      issue: "Inconsistent judge scores",
      diagnosis: `// Check for position bias
const checkPositionBias = async (evalId, testSample) => {
  const results = [];
  
  // Test original order
  const original = await runEval(evalId, testSample);
  results.push({ order: "original", score: original.score });
  
  // Test swapped order
  const swapped = await runEval(evalId, swapResponses(testSample));
  results.push({ order: "swapped", score: swapped.score });
  
  const bias = Math.abs(original.score - swapped.score);
  console.log(\`Position bias detected: \${bias > 0.1 ? 'YES' : 'NO'} (diff: \${bias})\`);
  
  return { original, swapped, biasLevel: bias };
};`,
      solution: "Implement position calibration or use simpler rubric"
    },
    {
      issue: "High variance in scores",
      diagnosis: `// Analyze score distribution
const analyzeVariance = (scores) => {
  const stats = {
    mean: average(scores),
    std: standardDeviation(scores),
    cv: standardDeviation(scores) / average(scores), // Coefficient of variation
    outliers: detectOutliers(scores)
  };
  
  console.log('Score distribution:', stats);
  
  if (stats.cv > 0.3) {
    console.warn('High variance detected! Consider:');
    console.log('1. Simplifying rubric');
    console.log('2. Adding more examples');
    console.log('3. Lowering temperature');
  }
  
  return stats;
};`,
      solution: "Lower temperature, add few-shot examples, or simplify criteria"
    },
    {
      issue: "Cost optimization",
      diagnosis: `// Track and optimize evaluation costs
class CostOptimizer {
  constructor(budgetLimit) {
    this.budgetLimit = budgetLimit;
    this.costs = {
      'gpt-4o': 0.01,      // per 1K tokens
      'gpt-4o-mini': 0.0015,
      'o3-mini': 0.002
    };
  }
  
  async optimizeEvaluation(testCases, requiredAccuracy) {
    // Start with cheapest model
    let currentModel = 'o3-mini';
    let accuracy = await this.testAccuracy(currentModel, testCases.slice(0, 100));
    
    // Upgrade if needed
    while (accuracy < requiredAccuracy && currentModel !== 'gpt-4o') {
      currentModel = this.getNextModel(currentModel);
      accuracy = await this.testAccuracy(currentModel, testCases.slice(0, 100));
    }
    
    // Calculate optimal batch size
    const batchSize = this.calculateOptimalBatch(currentModel, testCases.length);
    
    return {
      model: currentModel,
      batchSize,
      estimatedCost: this.estimateTotalCost(currentModel, testCases.length),
      expectedAccuracy: accuracy
    };
  }
}`,
      solution: "Use tiered approach: fast/cheap for initial filter, expensive for edge cases"
    },
    {
      issue: "Debugging failed evaluations",
      diagnosis: `// Comprehensive debugging logger
class EvalDebugger {
  constructor() {
    this.logs = [];
  }
  
  async debugFailure(evalRun, testCase) {
    const debug = {
      testCase,
      evalConfig: evalRun.config,
      rawResponse: evalRun.rawResponse,
      parsedScore: evalRun.score,
      timestamp: new Date().toISOString()
    };
    
    // Extract model reasoning
    if (evalRun.rawResponse?.includes('reasoning')) {
      debug.reasoning = this.extractReasoning(evalRun.rawResponse);
    }
    
    // Check for common issues
    debug.issues = [];
    
    if (!evalRun.score && evalRun.score !== 0) {
      debug.issues.push('Score parsing failed');
    }
    
    if (evalRun.latency > 5000) {
      debug.issues.push('High latency detected');
    }
    
    if (evalRun.error) {
      debug.issues.push(\`Error: \${evalRun.error.message}\`);
    }
    
    // Save for analysis
    this.logs.push(debug);
    
    // Generate report
    return this.generateReport(debug);
  }
  
  generateReport(debug) {
    return \`
EVALUATION FAILURE REPORT
========================
Test Case: \${JSON.stringify(debug.testCase, null, 2)}
Issues Found: \${debug.issues.join(', ') || 'None'}
Model Response: \${debug.rawResponse?.substring(0, 200)}...
Reasoning: \${debug.reasoning || 'Not available'}
Recommendations:
\${this.getRecommendations(debug.issues).join('\\n')}
    \`;
  }
}`,
      solution: "Enable verbose logging, capture raw responses, implement retry logic"
    },
    {
      issue: "Temperature tuning",
      diagnosis: `// Find optimal temperature for consistency
const findOptimalTemperature = async (evalId, testSample) => {
  const temperatures = [0, 0.1, 0.2, 0.3, 0.5, 0.7];
  const results = [];
  
  for (const temp of temperatures) {
    const scores = [];
    
    // Run multiple times to check consistency
    for (let i = 0; i < 5; i++) {
      const result = await runEval(evalId, testSample, { temperature: temp });
      scores.push(result.score);
    }
    
    results.push({
      temperature: temp,
      meanScore: average(scores),
      variance: variance(scores),
      consistency: 1 - (standardDeviation(scores) / average(scores))
    });
  }
  
  // Find best balance of accuracy and consistency
  const optimal = results.reduce((best, current) => {
    const score = current.meanScore * 0.6 + current.consistency * 0.4;
    const bestScore = best.meanScore * 0.6 + best.consistency * 0.4;
    return score > bestScore ? current : best;
  });
  
  console.log('Optimal temperature:', optimal.temperature);
  return optimal;
};`,
      solution: "Use temperature 0-0.2 for consistency, test empirically for your use case"
    }
  ],
  
  transitionNote: "With these production patterns in place, let's explore when custom Python evaluations provide even more power..."
};