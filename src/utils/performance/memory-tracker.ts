/**
 * Memory Tracker Utility for Performance Testing
 */

export interface MemorySnapshot {
  heapUsed: number;
  heapTotal: number;
  external: number;
  arrayBuffers: number;
  timestamp: number;
}

export interface MemoryDelta {
  heapUsedDelta: number;
  heapTotalDelta: number;
  externalDelta: number;
  arrayBuffersDelta: number;
  maxHeapUsed: number;
  avgHeapUsed: number;
}

export class MemoryTracker {
  private snapshots: MemorySnapshot[] = [];
  private isTracking = false;
  private trackingInterval?: NodeJS.Timeout;

  /**
   * Start memory tracking
   */
  startTracking(intervalMs = 1): void {
    this.isTracking = true;
    this.snapshots = [];

    // Take initial snapshot
    this.takeSnapshot();

    // Start interval tracking for detailed monitoring
    this.trackingInterval = setInterval(() => {
      if (this.isTracking) {
        this.takeSnapshot();
      }
    }, intervalMs);
  }

  /**
   * Stop memory tracking and return analysis
   */
  stopTracking(): MemoryDelta {
    this.isTracking = false;

    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
    }

    // Take final snapshot
    this.takeSnapshot();

    return this.analyzeDelta();
  }

  /**
   * Execute function with memory tracking
   */
  track<T>(fn: () => T): { result: T; memoryDelta: MemoryDelta } {
    this.startTracking();

    try {
      const result = fn();
      const memoryDelta = this.stopTracking();

      return { result, memoryDelta };
    } catch (error) {
      this.stopTracking();
      throw error;
    }
  }

  /**
   * Execute async function with memory tracking
   */
  async trackAsync<T>(
    fn: () => Promise<T>
  ): Promise<{ result: T; memoryDelta: MemoryDelta }> {
    this.startTracking();

    try {
      const result = await fn();
      const memoryDelta = this.stopTracking();

      return { result, memoryDelta };
    } catch (error) {
      this.stopTracking();
      throw error;
    }
  }

  /**
   * Take a memory snapshot
   */
  private takeSnapshot(): void {
    const usage = process.memoryUsage();

    this.snapshots.push({
      heapUsed: usage.heapUsed,
      heapTotal: usage.heapTotal,
      external: usage.external,
      arrayBuffers: usage.arrayBuffers,
      timestamp: Date.now(),
    });
  }

  /**
   * Analyze memory delta between first and last snapshot
   */
  private analyzeDelta(): MemoryDelta {
    if (this.snapshots.length < 2) {
      throw new Error(
        "Not enough snapshots for analysis. Need at least 2 snapshots."
      );
    }

    const first = this.snapshots[0]!;
    const last = this.snapshots[this.snapshots.length - 1]!;

    const heapUsedValues = this.snapshots.map((s) => s.heapUsed);
    const maxHeapUsed = Math.max(...heapUsedValues);
    const avgHeapUsed =
      heapUsedValues.reduce((sum, val) => sum + val, 0) / heapUsedValues.length;

    return {
      heapUsedDelta: last.heapUsed - first.heapUsed,
      heapTotalDelta: last.heapTotal - first.heapTotal,
      externalDelta: last.external - first.external,
      arrayBuffersDelta: last.arrayBuffers - first.arrayBuffers,
      maxHeapUsed,
      avgHeapUsed,
    };
  }

  /**
   * Convert bytes to MB
   */
  static bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }

  /**
   * Format memory value for display
   */
  static formatMemory(bytes: number): string {
    const mb = MemoryTracker.bytesToMB(bytes);
    return mb < 1 ? `${(mb * 1024).toFixed(2)} KB` : `${mb.toFixed(2)} MB`;
  }
}
