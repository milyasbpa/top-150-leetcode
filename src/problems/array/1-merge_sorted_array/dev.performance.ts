/**
 * Performance Tests for Merge Sorted Array
 * LeetCode #88
 */

import Table from "cli-table3";
import * as path from "path";
import { BenchmarkRunner } from "../../../utils/performance/benchmark-runner";
import { ThresholdValidator } from "../../../utils/performance/threshold-validator";
import { merge } from "./dev";

async function runPerformanceTests(): Promise<void> {
  console.log("🎯 Performance Analysis - 1. Array - Merge Sorted Array");
  console.log("━".repeat(80));

  const benchmarkRunner = new BenchmarkRunner();
  const validator = new ThresholdValidator();

  try {
    // Test cases for different input sizes aligned with thresholds
    const testCases = [
      {
        name: "Small Arrays",
        size: 10,
        getData: () => BenchmarkRunner.generateArrayData(10),
      },
      {
        name: "Medium Arrays",
        size: 1000,
        getData: () => BenchmarkRunner.generateArrayData(1000),
      },
      {
        name: "Large Arrays",
        size: 10000,
        getData: () => BenchmarkRunner.generateArrayData(10000),
      },
    ];

    // Run scalability tests for optimized implementation
    console.log("🚀 Testing Optimized Implementation...");
    const optimizedResults = await benchmarkRunner.runScalabilityTest(
      testCases.map((testCase) => ({
        name: testCase.name,
        size: testCase.size,
        fn: () => {
          const data = testCase.getData();
          merge([...data.nums1], data.m, [...data.nums2], data.n);
        },
      }))
    );

    // Load local threshold configuration
    console.log("\n🎯 Loading Performance Thresholds...");
    const thresholdPath = path.join(__dirname, "thresholds.json");
    validator.loadLocalThresholds(thresholdPath);

    // Display performance results
    displayPerformanceResults(optimizedResults);

    // Validate against thresholds
    console.log("\n🎯 Validating Performance Thresholds...");
    const validationSummary = validator.validateResults(optimizedResults);

    // Display validation results
    validator.displayResults(validationSummary);

    // Exit with appropriate code for CI/CD
    const success =
      ThresholdValidator.isValidationSuccessful(validationSummary);

    if (!success) {
      console.log(
        "\n💥 Performance tests failed! Some thresholds were not met."
      );
      process.exit(1);
    } else {
      console.log("\n🎉 All performance tests passed!");
      process.exit(0);
    }
  } catch (error) {
    console.error("❌ Performance test failed:", error);
    process.exit(1);
  }
}

function displayPerformanceResults(results: any[]): void {
  console.log("\n� Performance Results Summary:");
  console.log("━".repeat(60));

  const table = new Table({
    head: [
      "Test Case",
      "Ops/sec",
      "Avg Time (ms)",
      "Memory Delta (MB)",
      "Max Memory (MB)",
      "Samples",
    ],
    colWidths: [12, 12, 14, 16, 16, 10],
  });

  results.forEach((result) => {
    const memoryDeltaMB = (
      result.memoryDelta.heapUsedDelta /
      (1024 * 1024)
    ).toFixed(2);
    const maxMemoryMB = (
      result.memoryDelta.maxHeapUsed /
      (1024 * 1024)
    ).toFixed(2);

    table.push([
      result.name,
      Math.round(result.opsPerSec).toLocaleString(),
      result.avgTimeMs.toFixed(3),
      memoryDeltaMB,
      maxMemoryMB,
      result.samples.toString(),
    ]);
  });

  console.log(table.toString());

  // Detailed memory analysis
  console.log(`\n🧠 Memory Analysis:`);
  results.forEach((result, index) => {
    const deltaMB = (result.memoryDelta.heapUsedDelta / (1024 * 1024)).toFixed(
      2
    );
    const maxMB = (result.memoryDelta.maxHeapUsed / (1024 * 1024)).toFixed(2);
    const avgMB = (result.memoryDelta.avgHeapUsed / (1024 * 1024)).toFixed(2);

    console.log(`   ${index + 1}. ${result.name}:`);
    console.log(
      `      • Memory Delta: ${deltaMB} MB (algorithm-specific usage)`
    );
    console.log(`      • Peak Memory: ${maxMB} MB (includes Node.js overhead)`);
    console.log(`      • Avg Memory: ${avgMB} MB (sustained usage)`);
  });

  // Performance insights
  console.log(`\n📈 Performance Insights:`);
  console.log(
    `   • Algorithm: O(m+n) time complexity - optimal for merge operation`
  );
  console.log(
    `   • Memory: O(1) space complexity - in-place merge (algorithm-level)`
  );
  console.log(
    `   • Measurement: Memory delta approach isolates algorithm cost from Node.js overhead`
  );
  console.log(
    `   • Scalability: Performance maintained across different input sizes`
  );
}

// Main execution
if (require.main === module) {
  runPerformanceTests().catch(console.error);
}
