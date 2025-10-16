/**
 * Threshold Validator Utility for Performance Testing
 */

import Table from "cli-table3";
import * as fs from "fs";
import { BenchmarkResult, ComparisonResult } from "./benchmark-runner";
import { MemoryTracker } from "./memory-tracker";

export interface ThresholdConfig {
  small: TestThreshold;
  medium: TestThreshold;
  large: TestThreshold;
}

export interface TestThreshold {
  size: number;
  minOpsPerSec: number;
  maxTimeMs: number;
  maxMemoryMB: number;
  complexity?: string;
}

export interface BaselineThreshold {
  min_improvement_factor: number;
  max_memory_ratio: number;
}

export interface ValidationResult {
  testName: string;
  metric: string;
  expected: string;
  actual: string;
  status: "PASS" | "FAIL";
  gap: string;
}

export interface ValidationSummary {
  totalTests: number;
  passed: number;
  failed: number;
  results: ValidationResult[];
  suggestions: string[];
}

export class ThresholdValidator {
  private thresholds: any = null;

  constructor() {
    // No need to load global config anymore - will load local config
  }

  /**
   * Load performance thresholds from local config file
   */
  loadLocalThresholds(configPath: string): void {
    try {
      const configContent = fs.readFileSync(configPath, "utf8");
      this.thresholds = JSON.parse(configContent);
    } catch (error) {
      throw new Error(`Failed to load local thresholds config: ${error}`);
    }
  }

  /**
   * Get threshold config (now from local file)
   */
  getThresholds(): any {
    if (!this.thresholds) {
      throw new Error(
        "No thresholds loaded. Call loadLocalThresholds() first."
      );
    }

    return this.thresholds;
  }

  /**
   * Validate benchmark results against thresholds
   */
  validateResults(
    results: BenchmarkResult[],
    comparison?: ComparisonResult
  ): ValidationSummary {
    const thresholds = this.getThresholds();
    const validationResults: ValidationResult[] = [];
    const suggestions: string[] = [];

    // Validate each test size
    const testSizes = ["small", "medium", "large"] as const;

    results.forEach((result, index) => {
      if (index < testSizes.length) {
        const sizeKey = testSizes[index]!; // Assert non-null since we check bounds
        const threshold = thresholds[sizeKey] as TestThreshold;

        if (threshold) {
          // Validate ops/sec
          validationResults.push(
            this.validateOpsPerSec(result, threshold, sizeKey)
          );

          // Validate execution time
          validationResults.push(
            this.validateExecutionTime(result, threshold, sizeKey)
          );

          // Validate memory usage
          validationResults.push(
            this.validateMemoryUsage(result, threshold, sizeKey)
          );
        }
      }
    });

    // No baseline comparison needed anymore - just threshold validation

    // Generate suggestions based on failures
    suggestions.push(...this.generateSuggestions(validationResults));

    const failed = validationResults.filter((r) => r.status === "FAIL").length;
    const passed = validationResults.length - failed;

    return {
      totalTests: validationResults.length,
      passed,
      failed,
      results: validationResults,
      suggestions,
    };
  }

  /**
   * Validate operations per second
   */
  private validateOpsPerSec(
    result: BenchmarkResult,
    threshold: TestThreshold,
    testName: string
  ): ValidationResult {
    const actual = Math.round(result.opsPerSec);
    const expected = threshold.minOpsPerSec;
    const status = actual >= expected ? "PASS" : "FAIL";
    const gap =
      status === "PASS"
        ? `+${Math.round(((actual - expected) / expected) * 100)}%`
        : `-${Math.round(((expected - actual) / expected) * 100)}%`;

    return {
      testName: `${testName} (${threshold.size})`,
      metric: "Ops/sec",
      expected: `≥${expected.toLocaleString()}`,
      actual: actual.toLocaleString(),
      status,
      gap,
    };
  }

  /**
   * Validate execution time
   */
  private validateExecutionTime(
    result: BenchmarkResult,
    threshold: TestThreshold,
    testName: string
  ): ValidationResult {
    const actual = Number(result.avgTimeMs.toFixed(2));
    const expected = threshold.maxTimeMs;
    const status = actual <= expected ? "PASS" : "FAIL";
    const gap =
      status === "PASS"
        ? `-${Math.round(((expected - actual) / expected) * 100)}%`
        : `+${Math.round(((actual - expected) / expected) * 100)}%`;

    return {
      testName: `${testName} (${threshold.size})`,
      metric: "Time (ms)",
      expected: `≤${expected}`,
      actual: actual.toString(),
      status,
      gap,
    };
  }

  /**
   * Validate memory usage using memory delta approach
   */
  private validateMemoryUsage(
    result: BenchmarkResult,
    threshold: TestThreshold,
    testName: string
  ): ValidationResult {
    // Use memory delta instead of absolute memory for more accurate algorithm-specific measurement
    const memoryDeltaMB = MemoryTracker.bytesToMB(
      Math.abs(result.memoryDelta.heapUsedDelta)
    );
    const maxMemoryMB = MemoryTracker.bytesToMB(result.memoryDelta.maxHeapUsed);

    // Choose the more appropriate metric based on test size
    // For small tests, focus on delta; for large tests, consider max memory
    const shouldUseDelta = threshold.size <= 1000;
    const actualMB = shouldUseDelta ? memoryDeltaMB : maxMemoryMB;
    const actual = Number(actualMB.toFixed(2));
    const expected = threshold.maxMemoryMB;

    const status = actual <= expected ? "PASS" : "FAIL";
    const gap =
      status === "PASS"
        ? `-${Math.round(((expected - actual) / expected) * 100)}%`
        : `+${Math.round(((actual - expected) / expected) * 100)}%`;

    const metricType = shouldUseDelta ? "Memory Δ (MB)" : "Memory Max (MB)";

    return {
      testName: `${testName} (${threshold.size})`,
      metric: metricType,
      expected: `≤${expected}`,
      actual: actual.toString(),
      status,
      gap,
    };
  }

  /**
   * Validate baseline comparison
   */
  private validateBaselineComparison(
    comparison: ComparisonResult,
    threshold: BaselineThreshold
  ): ValidationResult[] {
    const results: ValidationResult[] = [];

    // Speed improvement
    const speedImprovement = comparison.improvement.speed;
    const speedStatus =
      speedImprovement >= threshold.min_improvement_factor ? "PASS" : "FAIL";
    const speedGap =
      speedStatus === "PASS"
        ? `${speedImprovement.toFixed(1)}x faster`
        : `${speedImprovement.toFixed(1)}x (need ${
            threshold.min_improvement_factor
          }x)`;

    results.push({
      testName: "Baseline Comparison",
      metric: "Speed Improvement",
      expected: `≥${threshold.min_improvement_factor}x`,
      actual: `${speedImprovement.toFixed(1)}x`,
      status: speedStatus,
      gap: speedGap,
    });

    // Memory ratio
    const memoryRatio = comparison.improvement.memory;
    const memoryStatus =
      memoryRatio <= threshold.max_memory_ratio ? "PASS" : "FAIL";
    const memoryGap =
      memoryStatus === "PASS"
        ? `${memoryRatio.toFixed(1)}x memory`
        : `${memoryRatio.toFixed(1)}x (max ${threshold.max_memory_ratio}x)`;

    results.push({
      testName: "Baseline Comparison",
      metric: "Memory Ratio",
      expected: `≤${threshold.max_memory_ratio}x`,
      actual: `${memoryRatio.toFixed(1)}x`,
      status: memoryStatus,
      gap: memoryGap,
    });

    return results;
  }

  /**
   * Generate optimization suggestions based on failures
   */
  private generateSuggestions(results: ValidationResult[]): string[] {
    const suggestions: string[] = [];
    const failures = results.filter((r) => r.status === "FAIL");

    if (failures.length === 0) {
      return ["🎉 All performance tests passed! Great optimization work!"];
    }

    failures.forEach((failure) => {
      switch (failure.metric) {
        case "Ops/sec":
          suggestions.push(
            "• Consider algorithmic optimizations (reduce time complexity)"
          );
          suggestions.push("• Profile hot paths and optimize critical loops");
          break;
        case "Time (ms)":
          suggestions.push(
            "• Check for unnecessary computations or redundant operations"
          );
          suggestions.push("• Consider caching frequently computed values");
          break;
        case "Memory (MB)":
          suggestions.push(
            "• Look for memory leaks or unnecessary object allocations"
          );
          suggestions.push(
            "• Consider object pooling or reusing existing arrays"
          );
          break;
        case "Speed Improvement":
          suggestions.push(
            "• Review algorithm choice - current implementation may not be optimal"
          );
          suggestions.push(
            "• Compare with reference solutions for better approaches"
          );
          break;
        case "Memory Ratio":
          suggestions.push(
            "• Optimize memory usage - current solution uses too much memory vs baseline"
          );
          suggestions.push("• Consider in-place operations where possible");
          break;
      }
    });

    // Remove duplicates
    return [...new Set(suggestions)];
  }

  /**
   * Display validation results in a formatted table
   */
  displayResults(summary: ValidationSummary): void {
    console.log("\n📊 Performance vs Thresholds:");
    console.log("━".repeat(80));

    const table = new Table({
      head: ["Test Case", "Metric", "Expected", "Actual", "Status"],
      colWidths: [15, 12, 12, 12, 10],
    });

    summary.results.forEach((result) => {
      const statusIcon = result.status === "PASS" ? "✅" : "❌";
      const actualDisplay =
        result.status === "PASS"
          ? `${result.actual} ${result.gap}`
          : `${result.actual} ${result.gap}`;

      table.push([
        result.testName,
        result.metric,
        result.expected,
        actualDisplay,
        `${statusIcon} ${result.status}`,
      ]);
    });

    console.log(table.toString());

    // Summary
    if (summary.failed > 0) {
      console.log(
        `\n❌ FAILED: ${summary.failed}/${summary.totalTests} performance thresholds not met`
      );
    } else {
      console.log(
        `\n✅ SUCCESS: ${summary.passed}/${summary.totalTests} performance thresholds met`
      );
    }

    // Suggestions
    if (summary.suggestions.length > 0) {
      console.log("\n💡 Optimization Suggestions:");
      summary.suggestions.forEach((suggestion) =>
        console.log(`   ${suggestion}`)
      );
    }
  }

  /**
   * Check if validation passed (for CI/CD)
   */
  static isValidationSuccessful(summary: ValidationSummary): boolean {
    return summary.failed === 0;
  }
}
