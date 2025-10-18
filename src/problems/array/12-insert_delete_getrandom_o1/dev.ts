/**
 * @fileoverview Insert Delete GetRandom O(1) - LeetCode Problem 380
 *
 * Design a data structure that supports all following operations in average O(1) time:
 * 1. insert(val): Inserts an item val to the set if not already present
 * 2. remove(val): Removes an item val from the set if present
 * 3. getRandom(): Returns a random element from the current set of elements
 *
 * Difficulty: Medium
 * Topics: Array, Hash Table, Math, Randomized
 *
 * Key Insights:
 * - Array provides O(1) random access for getRandom()
 * - HashMap provides O(1) lookup for insert/remove operations
 * - Swap-and-pop technique maintains O(1) remove complexity
 * - Need to track indices to enable efficient removal
 */

/**
 * Main RandomizedSet implementation using Array + HashMap approach
 *
 * Time Complexity:
 * - insert: O(1) average
 * - remove: O(1) average
 * - getRandom: O(1)
 *
 * Space Complexity: O(n) where n is the number of elements
 */
export class RandomizedSet {
  private values: number[]; // Store actual values
  private indices: Map<number, number>; // Map value -> index in values array

  constructor() {
    this.values = [];
    this.indices = new Map();
  }

  /**
   * Insert a value into the set
   * Returns true if value was not present, false if already exists
   */
  insert(val: number): boolean {
    if (this.indices.has(val)) {
      return false; // Value already exists
    }

    // Add to end of array and record its index
    this.indices.set(val, this.values.length);
    this.values.push(val);
    return true;
  }

  /**
   * Remove a value from the set
   * Returns true if value was present, false if not found
   */
  remove(val: number): boolean {
    if (!this.indices.has(val)) {
      return false; // Value doesn't exist
    }

    const indexToRemove = this.indices.get(val)!;
    const lastIndex = this.values.length - 1;
    const lastValue = this.values[lastIndex] ?? 0;

    // Swap with last element (if not already the last)
    if (indexToRemove !== lastIndex) {
      this.values[indexToRemove] = lastValue;
      this.indices.set(lastValue, indexToRemove);
    }

    // Remove last element and clean up
    this.values.pop();
    this.indices.delete(val);
    return true;
  }

  /**
   * Get a random element from the set
   * Returns a random element if set is not empty
   */
  getRandom(): number {
    if (this.values.length === 0) {
      throw new Error("Cannot get random element from empty set");
    }

    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex] ?? 0;
  }

  /**
   * Get current size of the set
   */
  size(): number {
    return this.values.length;
  }

  /**
   * Check if the set is empty
   */
  isEmpty(): boolean {
    return this.values.length === 0;
  }

  /**
   * Check if a value exists in the set
   */
  contains(val: number): boolean {
    return this.indices.has(val);
  }

  /**
   * Get all values in the set (for debugging)
   */
  getValues(): number[] {
    return [...this.values];
  }
}

/**
 * Alternative implementation using Set + Array approach
 * Less efficient but simpler to understand
 *
 * Time Complexity:
 * - insert: O(1) average
 * - remove: O(n) worst case due to array operations
 * - getRandom: O(1)
 */
export class RandomizedSetSimple {
  private values: number[];
  private valueSet: Set<number>;

  constructor() {
    this.values = [];
    this.valueSet = new Set();
  }

  insert(val: number): boolean {
    if (this.valueSet.has(val)) {
      return false;
    }

    this.valueSet.add(val);
    this.values.push(val);
    return true;
  }

  remove(val: number): boolean {
    if (!this.valueSet.has(val)) {
      return false;
    }

    this.valueSet.delete(val);
    const index = this.values.indexOf(val);
    this.values.splice(index, 1); // O(n) operation
    return true;
  }

  getRandom(): number {
    if (this.values.length === 0) {
      throw new Error("Cannot get random element from empty set");
    }

    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex] ?? 0;
  }

  size(): number {
    return this.values.length;
  }
}

/**
 * Memory-optimized implementation for space-constrained environments
 * Uses single array with null placeholders and periodic compaction
 */
export class RandomizedSetCompact {
  private values: (number | null)[];
  private indices: Map<number, number>;
  private activeCount: number;
  private compactionThreshold: number;

  constructor(compactionThreshold: number = 100) {
    this.values = [];
    this.indices = new Map();
    this.activeCount = 0;
    this.compactionThreshold = compactionThreshold;
  }

  insert(val: number): boolean {
    if (this.indices.has(val)) {
      return false;
    }

    // Find first null slot or append
    let insertIndex = this.values.indexOf(null);
    if (insertIndex === -1) {
      insertIndex = this.values.length;
      this.values.push(val);
    } else {
      this.values[insertIndex] = val;
    }

    this.indices.set(val, insertIndex);
    this.activeCount++;
    return true;
  }

  remove(val: number): boolean {
    if (!this.indices.has(val)) {
      return false;
    }

    const index = this.indices.get(val)!;
    this.values[index] = null;
    this.indices.delete(val);
    this.activeCount--;

    // Trigger compaction if too many null slots
    if (this.values.length - this.activeCount > this.compactionThreshold) {
      this.compact();
    }

    return true;
  }

  getRandom(): number {
    if (this.activeCount === 0) {
      throw new Error("Cannot get random element from empty set");
    }

    let attempts = 0;
    const maxAttempts = this.values.length * 2; // Prevent infinite loop

    while (attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * this.values.length);
      const value = this.values[randomIndex] ?? null;
      if (value !== null) {
        return value;
      }
      attempts++;
    }

    // Fallback: compact and try again
    this.compact();
    return this.getRandom();
  }

  private compact(): void {
    const newValues: number[] = [];
    const newIndices = new Map<number, number>();

    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i] ?? null;
      if (value !== null) {
        newIndices.set(value, newValues.length);
        newValues.push(value);
      }
    }

    this.values = newValues;
    this.indices = newIndices;
  }

  size(): number {
    return this.activeCount;
  }
}

/**
 * Thread-safe implementation with basic synchronization
 * Note: In real applications, consider using proper locking mechanisms
 */
export class RandomizedSetThreadSafe {
  private values: number[];
  private indices: Map<number, number>;
  private lock: boolean = false;

  constructor() {
    this.values = [];
    this.indices = new Map();
  }

  private async acquireLock(): Promise<void> {
    while (this.lock) {
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
    this.lock = true;
  }

  private releaseLock(): void {
    this.lock = false;
  }

  async insert(val: number): Promise<boolean> {
    await this.acquireLock();

    try {
      if (this.indices.has(val)) {
        return false;
      }

      this.indices.set(val, this.values.length);
      this.values.push(val);
      return true;
    } finally {
      this.releaseLock();
    }
  }

  async remove(val: number): Promise<boolean> {
    await this.acquireLock();

    try {
      if (!this.indices.has(val)) {
        return false;
      }

      const indexToRemove = this.indices.get(val)!;
      const lastIndex = this.values.length - 1;
      const lastValue = this.values[lastIndex] ?? 0;

      if (indexToRemove !== lastIndex) {
        this.values[indexToRemove] = lastValue;
        this.indices.set(lastValue, indexToRemove);
      }

      this.values.pop();
      this.indices.delete(val);
      return true;
    } finally {
      this.releaseLock();
    }
  }

  async getRandom(): Promise<number> {
    await this.acquireLock();

    try {
      if (this.values.length === 0) {
        throw new Error("Cannot get random element from empty set");
      }

      const randomIndex = Math.floor(Math.random() * this.values.length);
      return this.values[randomIndex] ?? 0;
    } finally {
      this.releaseLock();
    }
  }

  async size(): Promise<number> {
    await this.acquireLock();
    try {
      return this.values.length;
    } finally {
      this.releaseLock();
    }
  }
}

/**
 * Generic implementation that works with any type
 */
export class RandomizedSetGeneric<T> {
  private values: T[];
  private indices: Map<T, number>;

  constructor() {
    this.values = [];
    this.indices = new Map();
  }

  insert(val: T): boolean {
    if (this.indices.has(val)) {
      return false;
    }

    this.indices.set(val, this.values.length);
    this.values.push(val);
    return true;
  }

  remove(val: T): boolean {
    if (!this.indices.has(val)) {
      return false;
    }

    const indexToRemove = this.indices.get(val)!;
    const lastIndex = this.values.length - 1;
    const lastValue = this.values[lastIndex];

    if (indexToRemove !== lastIndex && lastValue !== undefined) {
      this.values[indexToRemove] = lastValue;
      this.indices.set(lastValue, indexToRemove);
    }

    this.values.pop();
    this.indices.delete(val);
    return true;
  }

  getRandom(): T {
    if (this.values.length === 0) {
      throw new Error("Cannot get random element from empty set");
    }

    const randomIndex = Math.floor(Math.random() * this.values.length);
    const value = this.values[randomIndex];
    if (value === undefined) {
      throw new Error("Unexpected undefined value in set");
    }
    return value;
  }

  size(): number {
    return this.values.length;
  }

  getValues(): T[] {
    return [...this.values];
  }
}

/**
 * Implementation with duplicate support (RandomizedCollection - LeetCode 381)
 */
export class RandomizedCollection {
  private values: number[];
  private indices: Map<number, Set<number>>;

  constructor() {
    this.values = [];
    this.indices = new Map();
  }

  insert(val: number): boolean {
    const wasEmpty =
      !this.indices.has(val) || this.indices.get(val)!.size === 0;

    if (!this.indices.has(val)) {
      this.indices.set(val, new Set());
    }

    this.indices.get(val)!.add(this.values.length);
    this.values.push(val);

    return wasEmpty;
  }

  remove(val: number): boolean {
    if (!this.indices.has(val) || this.indices.get(val)!.size === 0) {
      return false;
    }

    const indexSet = this.indices.get(val)!;
    const indexToRemove = indexSet.values().next().value as number;
    const lastIndex = this.values.length - 1;
    const lastValue = this.values[lastIndex] ?? 0;

    // Remove index from set
    indexSet.delete(indexToRemove);

    if (indexToRemove !== lastIndex) {
      // Move last element to removed position
      this.values[indexToRemove] = lastValue;

      // Update indices for moved element
      const lastValueIndices = this.indices.get(lastValue)!;
      lastValueIndices.delete(lastIndex);
      lastValueIndices.add(indexToRemove);
    }

    this.values.pop();
    return true;
  }

  getRandom(): number {
    if (this.values.length === 0) {
      throw new Error("Cannot get random element from empty collection");
    }

    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex] ?? 0;
  }

  size(): number {
    return this.values.length;
  }
}

/**
 * Performance testing utilities
 */
export interface PerformanceResult {
  operation: string;
  timeMs: number;
  success: boolean;
}

export function benchmarkRandomizedSet(
  implementation: RandomizedSet | RandomizedSetSimple,
  operations: number = 10000
): PerformanceResult[] {
  const results: PerformanceResult[] = [];

  // Benchmark insert operations
  const insertStart = performance.now();
  for (let i = 0; i < operations; i++) {
    implementation.insert(i);
  }
  const insertTime = performance.now() - insertStart;
  results.push({ operation: "insert", timeMs: insertTime, success: true });

  // Benchmark getRandom operations
  const randomStart = performance.now();
  for (let i = 0; i < operations; i++) {
    implementation.getRandom();
  }
  const randomTime = performance.now() - randomStart;
  results.push({ operation: "getRandom", timeMs: randomTime, success: true });

  // Benchmark remove operations
  const removeStart = performance.now();
  for (let i = 0; i < operations; i++) {
    implementation.remove(i);
  }
  const removeTime = performance.now() - removeStart;
  results.push({ operation: "remove", timeMs: removeTime, success: true });

  return results;
}

/**
 * Utility function to test randomness quality
 */
export function testRandomnessQuality(
  set: RandomizedSet,
  values: number[],
  samples: number = 10000
): Map<number, number> {
  // Insert all values
  values.forEach((val) => set.insert(val));

  // Sample and count frequencies
  const frequencies = new Map<number, number>();
  values.forEach((val) => frequencies.set(val, 0));

  for (let i = 0; i < samples; i++) {
    const random = set.getRandom();
    frequencies.set(random, (frequencies.get(random) ?? 0) + 1);
  }

  return frequencies;
}

/**
 * Compare different implementations
 */
export function compareImplementations(operations: number = 1000): void {
  console.log("🔄 RandomizedSet Implementation Comparison");
  console.log("=".repeat(50));

  const implementations = [
    { name: "Optimized (Array + HashMap)", impl: new RandomizedSet() },
    { name: "Simple (Array + Set)", impl: new RandomizedSetSimple() },
  ];

  implementations.forEach(({ name, impl }) => {
    console.log(`\n📊 Testing ${name}:`);
    const results = benchmarkRandomizedSet(impl, operations);

    results.forEach((result) => {
      const avgTime = result.timeMs / operations;
      console.log(
        `  ${result.operation}: ${result.timeMs.toFixed(
          2
        )}ms total, ${avgTime.toFixed(4)}ms avg`
      );
    });
  });

  console.log("\n✅ Performance comparison completed");
}

/**
 * Demonstration of usage patterns
 */
export function demonstrateUsage(): void {
  console.log("🎯 RandomizedSet Usage Demonstration");
  console.log("=".repeat(40));

  const set = new RandomizedSet();

  // Basic operations
  console.log("\n📝 Basic Operations:");
  console.log(`Insert 1: ${set.insert(1)}`); // true
  console.log(`Insert 2: ${set.insert(2)}`); // true
  console.log(`Insert 1: ${set.insert(1)}`); // false (duplicate)
  console.log(`Current size: ${set.size()}`); // 2

  // Random sampling
  console.log("\n🎲 Random Sampling (10 times):");
  for (let i = 0; i < 10; i++) {
    console.log(`Sample ${i + 1}: ${set.getRandom()}`);
  }

  // Removal
  console.log("\n🗑️ Removal Operations:");
  console.log(`Remove 1: ${set.remove(1)}`); // true
  console.log(`Remove 3: ${set.remove(3)}`); // false (not present)
  console.log(`Current size: ${set.size()}`); // 1

  // Edge cases
  console.log("\n⚠️ Edge Cases:");
  set.remove(2); // Remove last element
  console.log(`Size after removing all: ${set.size()}`); // 0
  console.log(`Is empty: ${set.isEmpty()}`); // true

  try {
    set.getRandom(); // Should throw error
  } catch (error) {
    console.log(`Error on empty getRandom: ${(error as Error).message}`);
  }
}

// Export the main class as default
export default RandomizedSet;
