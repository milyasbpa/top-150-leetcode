/**
 * Benchmark Runner Utility for Performance Testing
 */

import Benchmark from "benchmark";
import { MemoryDelta, MemoryTracker } from "./memory-tracker";

export interface BenchmarkResult {
  name: string;
  opsPerSec: number;
  avgTimeMs: number;
  samples: number;
  variance: number;
  memoryDelta: MemoryDelta;
  error?: string;
}

export interface ComparisonResult {
  optimized: BenchmarkResult;
  baseline: BenchmarkResult;
  improvement: {
    speed: number; // Factor improvement (e.g., 2.5x faster)
    memory: number; // Memory usage ratio
  };
}

export class BenchmarkRunner {
  private memoryTracker = new MemoryTracker();

  /**
   * Run single benchmark with memory tracking
   */
  async runSingle(
    name: string,
    fn: () => void,
    options: { minSamples?: number; maxTime?: number } = {}
  ): Promise<BenchmarkResult> {
    const { minSamples = 5, maxTime = 5 } = options;

    return new Promise((resolve, reject) => {
      const suite = new Benchmark.Suite();
      let memoryDelta: MemoryDelta;

      suite
        .add(name, {
          fn: fn,
          onStart: () => {
            // Start memory tracking when benchmark starts
            this.memoryTracker.startTracking();
          },
          onComplete: () => {
            // Stop memory tracking when benchmark completes
            memoryDelta = this.memoryTracker.stopTracking();
          },
          minSamples,
          maxTime,
        })
        .on("complete", (event: any) => {
          const benchmark = event.target;

          if (benchmark.error) {
            reject(new Error(`Benchmark failed: ${benchmark.error}`));
            return;
          }

          resolve({
            name: benchmark.name,
            opsPerSec: benchmark.hz,
            avgTimeMs: benchmark.stats.mean * 1000,
            samples: benchmark.stats.sample.length,
            variance: benchmark.stats.variance,
            memoryDelta: memoryDelta!,
            error: benchmark.error?.message,
          });
        })
        .run({ async: false });
    });
  }

  /**
   * Compare optimized vs baseline implementation
   */
  async compare(
    optimizedFn: () => void,
    baselineFn: () => void,
    testName = "Performance Comparison"
  ): Promise<ComparisonResult> {
    console.log(`\n🔄 Running ${testName}...`);

    const optimizedResult = await this.runSingle("Optimized", optimizedFn);
    const baselineResult = await this.runSingle("Baseline", baselineFn);

    const speedImprovement =
      optimizedResult.opsPerSec / baselineResult.opsPerSec;
    const memoryRatio =
      optimizedResult.memoryDelta.maxHeapUsed /
      baselineResult.memoryDelta.maxHeapUsed;

    return {
      optimized: optimizedResult,
      baseline: baselineResult,
      improvement: {
        speed: speedImprovement,
        memory: memoryRatio,
      },
    };
  }

  /**
   * Run multiple benchmarks for different data sizes
   */
  async runScalabilityTest(
    testCases: Array<{
      name: string;
      fn: () => void;
      size: number;
    }>
  ): Promise<BenchmarkResult[]> {
    const results: BenchmarkResult[] = [];

    console.log("\n📊 Running scalability tests...");

    for (const testCase of testCases) {
      console.log(`  Testing ${testCase.name} (size: ${testCase.size})...`);
      const result = await this.runSingle(testCase.name, testCase.fn);
      results.push(result);
    }

    return results;
  }

  /**
   * Generate test data for array operations
   */
  static generateArrayData(size: number): {
    nums1: number[];
    nums2: number[];
    m: number;
    n: number;
  } {
    const m = Math.floor(size / 2);
    const n = size - m;

    // Generate sorted arrays
    const nums1 = Array.from({ length: m }, (_, i) => i * 2).concat(
      Array(n).fill(0)
    ); // Add zeros for merge space

    const nums2 = Array.from({ length: n }, (_, i) => i * 2 + 1);

    return { nums1, nums2, m, n };
  }

  /**
   * Format benchmark result for display
   */
  static formatResult(result: BenchmarkResult): string {
    return [
      `Name: ${result.name}`,
      `Ops/sec: ${result.opsPerSec.toLocaleString()}`,
      `Avg Time: ${result.avgTimeMs.toFixed(3)}ms`,
      `Memory: ${MemoryTracker.formatMemory(result.memoryDelta.maxHeapUsed)}`,
      `Samples: ${result.samples}`,
    ].join(" | ");
  }
}
