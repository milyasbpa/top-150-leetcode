/**
 * @fileoverview Test Suite for Insert Delete GetRandom O(1) Problem (LeetCode 380)
 *
 * Tests all implemented data structure variations for correctness and performance.
 * Covers edge cases, concurrent scenarios, and implementation consistency.
 *
 * Test Categories:
 * 1. Basic Operations - Core insert/remove/getRandom functionality
 * 2. Edge Cases - Empty sets, single elements, boundary conditions
 * 3. Duplicate Handling - Insert same values, remove non-existent
 * 4. Random Distribution - Quality of randomness testing
 * 5. Performance Tests - Large dataset handling
 * 6. Memory Management - Space efficiency and cleanup
 * 7. Thread Safety - Concurrent operation testing
 * 8. Generic Types - Type safety and generic implementation
 * 9. Implementation Consistency - All variants produce same results
 */

import {
  RandomizedCollection,
  RandomizedSet,
  RandomizedSetCompact,
  RandomizedSetGeneric,
  RandomizedSetSimple,
  RandomizedSetThreadSafe,
  benchmarkRandomizedSet,
  testRandomnessQuality,
} from "./dev";

describe("Insert Delete GetRandom O(1) - All Implementations", () => {
  /**
   * Category 1: Basic Operations
   * Core functionality testing for all implementations
   */
  describe("Basic Operations", () => {
    describe("RandomizedSet (Main Implementation)", () => {
      let set: RandomizedSet;

      beforeEach(() => {
        set = new RandomizedSet();
      });

      test("should insert new values successfully", () => {
        expect(set.insert(1)).toBe(true);
        expect(set.insert(2)).toBe(true);
        expect(set.insert(3)).toBe(true);
        expect(set.size()).toBe(3);
      });

      test("should not insert duplicate values", () => {
        set.insert(1);
        expect(set.insert(1)).toBe(false);
        expect(set.size()).toBe(1);
      });

      test("should remove existing values", () => {
        set.insert(1);
        set.insert(2);
        expect(set.remove(1)).toBe(true);
        expect(set.size()).toBe(1);
        expect(set.contains(1)).toBe(false);
        expect(set.contains(2)).toBe(true);
      });

      test("should not remove non-existent values", () => {
        set.insert(1);
        expect(set.remove(2)).toBe(false);
        expect(set.size()).toBe(1);
      });

      test("should return random elements", () => {
        set.insert(1);
        set.insert(2);
        set.insert(3);

        const randomValue = set.getRandom();
        expect([1, 2, 3]).toContain(randomValue);
      });

      test("should handle complex operation sequences", () => {
        // LeetCode example sequence
        expect(set.insert(1)).toBe(true);
        expect(set.remove(2)).toBe(false);
        expect(set.insert(2)).toBe(true);
        const random1 = set.getRandom();
        expect([1, 2]).toContain(random1);
        expect(set.remove(1)).toBe(true);
        expect(set.insert(2)).toBe(false);
        expect(set.getRandom()).toBe(2);
      });
    });

    describe("RandomizedSetSimple", () => {
      let set: RandomizedSetSimple;

      beforeEach(() => {
        set = new RandomizedSetSimple();
      });

      test("should maintain same behavior as main implementation", () => {
        expect(set.insert(1)).toBe(true);
        expect(set.insert(1)).toBe(false);
        expect(set.remove(1)).toBe(true);
        expect(set.remove(1)).toBe(false);
        expect(set.size()).toBe(0);
      });
    });

    describe("RandomizedSetCompact", () => {
      let set: RandomizedSetCompact;

      beforeEach(() => {
        set = new RandomizedSetCompact(5); // Low threshold for testing
      });

      test("should handle compaction correctly", () => {
        // Fill with values
        for (let i = 0; i < 10; i++) {
          set.insert(i);
        }

        // Remove many values to trigger compaction
        for (let i = 0; i < 7; i++) {
          set.remove(i);
        }

        expect(set.size()).toBe(3);
        const remaining = [7, 8, 9];
        for (let i = 0; i < 10; i++) {
          const random = set.getRandom();
          expect(remaining).toContain(random);
        }
      });
    });
  });

  /**
   * Category 2: Edge Cases
   * Boundary conditions and minimal inputs
   */
  describe("Edge Cases", () => {
    let set: RandomizedSet;

    beforeEach(() => {
      set = new RandomizedSet();
    });

    test("should handle empty set operations", () => {
      expect(set.size()).toBe(0);
      expect(set.isEmpty()).toBe(true);
      expect(set.contains(1)).toBe(false);
      expect(set.remove(1)).toBe(false);
    });

    test("should throw error on getRandom from empty set", () => {
      expect(() => set.getRandom()).toThrow(
        "Cannot get random element from empty set"
      );
    });

    test("should handle single element operations", () => {
      set.insert(42);
      expect(set.size()).toBe(1);
      expect(set.getRandom()).toBe(42);
      expect(set.remove(42)).toBe(true);
      expect(set.isEmpty()).toBe(true);
    });

    test("should handle negative numbers", () => {
      expect(set.insert(-1)).toBe(true);
      expect(set.insert(-100)).toBe(true);
      expect(set.contains(-1)).toBe(true);
      expect(set.remove(-1)).toBe(true);
      expect(set.getRandom()).toBe(-100);
    });

    test("should handle zero values", () => {
      expect(set.insert(0)).toBe(true);
      expect(set.insert(0)).toBe(false);
      expect(set.getRandom()).toBe(0);
      expect(set.remove(0)).toBe(true);
    });

    test("should handle large numbers", () => {
      const largeNum = Number.MAX_SAFE_INTEGER;
      expect(set.insert(largeNum)).toBe(true);
      expect(set.getRandom()).toBe(largeNum);
    });
  });

  /**
   * Category 3: Duplicate Handling
   * Test behavior with duplicate insertions and removals
   */
  describe("Duplicate Handling", () => {
    let set: RandomizedSet;

    beforeEach(() => {
      set = new RandomizedSet();
    });

    test("should consistently reject duplicate insertions", () => {
      expect(set.insert(5)).toBe(true);
      expect(set.insert(5)).toBe(false);
      expect(set.insert(5)).toBe(false);
      expect(set.size()).toBe(1);
    });

    test("should handle multiple removals of same value", () => {
      set.insert(10);
      expect(set.remove(10)).toBe(true);
      expect(set.remove(10)).toBe(false);
      expect(set.remove(10)).toBe(false);
    });

    test("should handle insert after remove", () => {
      set.insert(7);
      set.remove(7);
      expect(set.insert(7)).toBe(true);
      expect(set.contains(7)).toBe(true);
    });
  });

  /**
   * Category 4: Random Distribution Testing
   * Verify quality of randomness
   */
  describe("Random Distribution", () => {
    test("should provide fair distribution for small sets", () => {
      const set = new RandomizedSet();
      const values = [1, 2, 3];
      values.forEach((val) => set.insert(val));

      const frequencies = testRandomnessQuality(set, values, 3000);

      // Each value should appear roughly 1000 times (±300 tolerance)
      values.forEach((val) => {
        const frequency = frequencies.get(val) || 0;
        expect(frequency).toBeGreaterThan(700);
        expect(frequency).toBeLessThan(1300);
      });
    });

    test("should handle distribution with different value ranges", () => {
      const set = new RandomizedSet();
      const values = [-10, 0, 100, 999];
      values.forEach((val) => set.insert(val));

      const samples = 1000;
      const results = [];
      for (let i = 0; i < samples; i++) {
        results.push(set.getRandom());
      }

      // All returned values should be from our set
      results.forEach((result) => {
        expect(values).toContain(result);
      });

      // Should have reasonable distribution
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1); // Should see multiple values
    });
  });

  /**
   * Category 5: Performance Tests
   * Large dataset handling and efficiency validation
   */
  describe("Performance Tests", () => {
    test("should handle large number of insertions efficiently", () => {
      const set = new RandomizedSet();
      const size = 10000;

      const startTime = performance.now();
      for (let i = 0; i < size; i++) {
        set.insert(i);
      }
      const insertTime = performance.now() - startTime;

      expect(set.size()).toBe(size);
      expect(insertTime).toBeLessThan(100); // Should be fast
    });

    test("should handle large number of removals efficiently", () => {
      const set = new RandomizedSet();
      const size = 5000;

      // Insert elements
      for (let i = 0; i < size; i++) {
        set.insert(i);
      }

      // Remove half efficiently
      const startTime = performance.now();
      for (let i = 0; i < size / 2; i++) {
        set.remove(i);
      }
      const removeTime = performance.now() - startTime;

      expect(set.size()).toBe(size / 2);
      expect(removeTime).toBeLessThan(50); // Should be fast
    });

    test("should maintain O(1) getRandom performance", () => {
      const set = new RandomizedSet();
      const size = 10000;

      // Insert many elements
      for (let i = 0; i < size; i++) {
        set.insert(i);
      }

      // Test getRandom performance
      const samples = 1000;
      const startTime = performance.now();
      for (let i = 0; i < samples; i++) {
        set.getRandom();
      }
      const randomTime = performance.now() - startTime;

      expect(randomTime).toBeLessThan(10); // Should be very fast
    });
  });

  /**
   * Category 6: Memory Management
   * Test space efficiency and cleanup
   */
  describe("Memory Management", () => {
    test("should properly clean up after removals", () => {
      const set = new RandomizedSet();

      // Add elements
      for (let i = 0; i < 100; i++) {
        set.insert(i);
      }

      // Remove all elements
      for (let i = 0; i < 100; i++) {
        set.remove(i);
      }

      expect(set.size()).toBe(0);
      expect(set.isEmpty()).toBe(true);

      // Should be able to add new elements
      expect(set.insert(999)).toBe(true);
      expect(set.getRandom()).toBe(999);
    });

    test("should handle alternating insert/remove patterns", () => {
      const set = new RandomizedSet();

      // Alternating pattern
      for (let i = 0; i < 50; i++) {
        set.insert(i);
        if (i > 0) {
          set.remove(i - 1);
        }
      }

      expect(set.size()).toBe(1);
      expect(set.getRandom()).toBe(49);
    });
  });

  /**
   * Category 7: Thread Safety Testing
   * Test concurrent operations (async)
   */
  describe("Thread Safety", () => {
    test("should handle concurrent operations safely", async () => {
      const set = new RandomizedSetThreadSafe();

      // Concurrent insertions
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(set.insert(i));
      }

      const results = await Promise.all(promises);
      const successCount = results.filter((r) => r).length;

      expect(successCount).toBe(10);
      expect(await set.size()).toBe(10);
    });

    test("should handle mixed concurrent operations", async () => {
      const set = new RandomizedSetThreadSafe();

      // Insert some initial values
      await set.insert(1);
      await set.insert(2);
      await set.insert(3);

      // Concurrent mixed operations
      const operations = [
        set.insert(4),
        set.remove(1),
        set.insert(5),
        set.getRandom(),
        set.size(),
      ];

      const results = await Promise.all(operations);

      // Should complete without errors
      expect(results).toHaveLength(5);
      expect(typeof results[3]).toBe("number"); // getRandom result
      expect(typeof results[4]).toBe("number"); // size result
    });
  });

  /**
   * Category 8: Generic Types
   * Test type safety and generic implementation
   */
  describe("Generic Types", () => {
    test("should work with string types", () => {
      const set = new RandomizedSetGeneric<string>();

      expect(set.insert("hello")).toBe(true);
      expect(set.insert("world")).toBe(true);
      expect(set.insert("hello")).toBe(false);

      const random = set.getRandom();
      expect(["hello", "world"]).toContain(random);

      expect(set.remove("hello")).toBe(true);
      expect(set.getRandom()).toBe("world");
    });

    test("should work with object types", () => {
      interface TestObject {
        id: number;
        name: string;
      }

      const set = new RandomizedSetGeneric<TestObject>();
      const obj1 = { id: 1, name: "test1" };
      const obj2 = { id: 2, name: "test2" };

      expect(set.insert(obj1)).toBe(true);
      expect(set.insert(obj2)).toBe(true);
      expect(set.insert(obj1)).toBe(false); // Same reference

      const random = set.getRandom();
      expect([obj1, obj2]).toContain(random);
    });
  });

  /**
   * Category 9: RandomizedCollection (with duplicates)
   * Test extended functionality that allows duplicates
   */
  describe("RandomizedCollection (Duplicates Support)", () => {
    let collection: RandomizedCollection;

    beforeEach(() => {
      collection = new RandomizedCollection();
    });

    test("should allow duplicate insertions", () => {
      expect(collection.insert(1)).toBe(true); // First insertion
      expect(collection.insert(1)).toBe(false); // Duplicate
      expect(collection.insert(1)).toBe(false); // Another duplicate
      expect(collection.size()).toBe(3);
    });

    test("should remove one instance at a time", () => {
      collection.insert(1);
      collection.insert(1);
      collection.insert(2);

      expect(collection.remove(1)).toBe(true); // Remove one instance
      expect(collection.size()).toBe(2);
      expect(collection.remove(1)).toBe(true); // Remove another instance
      expect(collection.size()).toBe(1);
      expect(collection.remove(1)).toBe(false); // No more instances
    });

    test("should handle random selection with duplicates", () => {
      collection.insert(1);
      collection.insert(1);
      collection.insert(2);

      const samples = [];
      for (let i = 0; i < 100; i++) {
        samples.push(collection.getRandom());
      }

      // Should get both 1 and 2, but 1 should be more frequent
      const ones = samples.filter((x) => x === 1).length;
      const twos = samples.filter((x) => x === 2).length;

      expect(ones).toBeGreaterThan(0);
      expect(twos).toBeGreaterThan(0);
      expect(ones).toBeGreaterThan(twos); // 1 appears twice, should be more frequent
    });
  });

  /**
   * Category 10: Implementation Consistency
   * Verify all implementations produce same results for same operations
   */
  describe("Implementation Consistency", () => {
    const testSequences = [
      [
        { op: "insert", val: 1 },
        { op: "insert", val: 2 },
        { op: "insert", val: 1 },
        { op: "remove", val: 2 },
        { op: "insert", val: 3 },
      ],
      [
        { op: "insert", val: 10 },
        { op: "remove", val: 10 },
        { op: "insert", val: 10 },
        { op: "insert", val: 20 },
        { op: "remove", val: 20 },
      ],
    ];

    testSequences.forEach((sequence, index) => {
      test(`consistency test ${index + 1}`, () => {
        const mainSet = new RandomizedSet();
        const simpleSet = new RandomizedSetSimple();

        const mainResults: boolean[] = [];
        const simpleResults: boolean[] = [];

        sequence.forEach(({ op, val }) => {
          if (op === "insert") {
            mainResults.push(mainSet.insert(val));
            simpleResults.push(simpleSet.insert(val));
          } else if (op === "remove") {
            mainResults.push(mainSet.remove(val));
            simpleResults.push(simpleSet.remove(val));
          }
        });

        // Both implementations should produce same results
        expect(mainResults).toEqual(simpleResults);
        expect(mainSet.size()).toBe(simpleSet.size());
      });
    });

    test("should have consistent state after deterministic operations", () => {
      const implementations = [new RandomizedSet(), new RandomizedSetSimple()];

      // Use deterministic operations instead of random
      const operations = [
        { op: "insert", val: 1 },
        { op: "insert", val: 2 },
        { op: "insert", val: 3 },
        { op: "remove", val: 2 },
        { op: "insert", val: 4 },
        { op: "remove", val: 1 },
        { op: "insert", val: 5 },
        { op: "remove", val: 3 },
        { op: "insert", val: 6 },
      ];

      // Perform same sequence on all implementations
      operations.forEach(({ op, val }) => {
        implementations.forEach((impl) => {
          if (op === "insert") {
            impl.insert(val);
          } else if (op === "remove") {
            impl.remove(val);
          }
        });
      });

      // All should have same size
      const sizes = implementations.map((impl) => impl.size());
      expect(sizes.every((size) => size === sizes[0])).toBe(true);

      // Expected size should be 3 (values 4, 5, 6)
      expect(sizes[0]).toBe(3);
    });
  });

  /**
   * Utility Function Tests
   * Test helper functions for correctness
   */
  describe("Utility Functions", () => {
    test("benchmarkRandomizedSet should complete without errors", () => {
      const set = new RandomizedSet();
      const results = benchmarkRandomizedSet(set, 100);

      expect(results).toHaveLength(3); // insert, getRandom, remove
      expect(results.every((r) => r.success)).toBe(true);
      expect(results.every((r) => typeof r.timeMs === "number")).toBe(true);
    });

    test("testRandomnessQuality should provide frequency analysis", () => {
      const set = new RandomizedSet();
      const values = [1, 2, 3, 4, 5];
      const frequencies = testRandomnessQuality(set, values, 1000);

      expect(frequencies.size).toBe(values.length);

      // Total samples should equal input
      const totalSamples = Array.from(frequencies.values()).reduce(
        (sum, count) => sum + count,
        0
      );
      expect(totalSamples).toBe(1000);
    });
  });
});

/**
 * Integration Tests
 * Real-world usage scenarios and complex operations
 */
describe("RandomizedSet Integration Tests", () => {
  test("cache with random eviction simulation", () => {
    const cache = new RandomizedSet();
    const maxSize = 5;

    // Simulate cache operations
    for (let i = 0; i < 10; i++) {
      if (cache.size() >= maxSize) {
        // Random eviction
        const evicted = cache.getRandom();
        cache.remove(evicted);
      }
      cache.insert(i);
    }

    expect(cache.size()).toBeLessThanOrEqual(maxSize);
  });

  test("load balancer simulation", () => {
    const loadBalancer = new RandomizedSet();
    const servers = [100, 101, 102, 103, 104]; // Server IDs

    // Add servers
    servers.forEach((server) => loadBalancer.insert(server));

    // Simulate requests
    const requestCounts = new Map<number, number>();
    for (let i = 0; i < 1000; i++) {
      const selectedServer = loadBalancer.getRandom();
      requestCounts.set(
        selectedServer,
        (requestCounts.get(selectedServer) || 0) + 1
      );
    }

    // Should distribute load reasonably
    expect(requestCounts.size).toBe(servers.length);
    const counts = Array.from(requestCounts.values());
    const avgCount =
      counts.reduce((sum, count) => sum + count, 0) / counts.length;

    // No server should be heavily overloaded (within 50% of average)
    counts.forEach((count) => {
      expect(count).toBeGreaterThan(avgCount * 0.5);
      expect(count).toBeLessThan(avgCount * 1.5);
    });
  });

  test("playlist shuffler simulation", () => {
    const playlist = new RandomizedSetGeneric<string>();
    const songs = ["song1", "song2", "song3", "song4", "song5"];

    // Add songs to playlist
    songs.forEach((song) => playlist.insert(song));

    // Simulate shuffle play
    const playedSongs = [];
    while (playlist.size() > 0) {
      const nextSong = playlist.getRandom();
      playedSongs.push(nextSong);
      playlist.remove(nextSong);
    }

    expect(playedSongs).toHaveLength(songs.length);
    expect(new Set(playedSongs).size).toBe(songs.length); // All unique

    // Order should be different from original (very high probability)
    const orderChanged = playedSongs.some(
      (song, index) => song !== songs[index]
    );
    expect(orderChanged).toBe(true);
  });
});
