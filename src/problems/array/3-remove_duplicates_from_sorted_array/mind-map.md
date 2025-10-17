# Mind Map: Remove Duplicates from Sorted Array (LeetCode #26)

## 🧠 Problem Solving Mind Map

````mermaid
mindmap
  root((Remove Duplicates from Sorted Array))
    Problem Understanding
      Input
        Sorted Array
        Non-decreasing order
        May have duplicates
      Output
        Count of unique elements
        Modified array in-place
        First k elements are unique
      Examples
        Example 1: nums equals 1,1,2 returns k equals 2
        Example 2: nums equals 0,0,1,1,1,2,2 returns k equals 3

    Key Insights
      Sorted Property
        Duplicates are adjacent
        Compare with previous only
        No need to check all elements
      In-place Requirement
        O(1) space constraint
        Cannot use extra arrays
        Modify original array
      Two Pointer Strategy
        Slow pointer k for unique position
        Fast pointer i for current check
        Start both from index 1

    Algorithm Design
      Setup
        Handle edge case empty array
        k equals 1 first element always unique
        Loop from i equals 1
      Main Logic
        Compare nums[i] with nums[i-1]
        If different copy to position k and increment k
        If same skip duplicate
      Return
        k equals count of unique elements

    Complexity Analysis
      Time Complexity
        O(n) single pass
        Each element visited once
        Constant work per element
      Space Complexity
        O(1) in-place modification
        Only use k and i variables
        No additional data structures

    Edge Cases
      Single Element
        Always unique
        Return 1
      All Same
        Only first is unique
        Return 1
      All Different
        No duplicates
        Return original length
      Empty Array
        Handle separately
        Return 0

    Alternative Approaches
      Hash Set Method
        Track seen elements
        O(n) space O(n) time
        Not optimal for sorted input
      Filter Method
        Create new array
        O(n) space overhead
        Not in-place
      Naive O(n squared)
        Compare each with all previous
        Inefficient unused sorted property

    Related Problems
      Remove Element 27
        Remove specific value
        Similar two-pointer technique
        Different comparison logic
      Remove Duplicates II 80
        Allow at most 2 duplicates
        Extension of this problem
      Move Zeroes 283
        Move elements to end
        Similar in-place modification
```## 🎯 Algorithm Flow Diagram

```mermaid
flowchart TD
    Start([Start: Remove Duplicates]) --> Check{Array empty?}
    Check -->|Yes| ReturnZero[Return 0]
    Check -->|No| Setup["k = 1, i = 1<br/>First element always unique"]

    Setup --> Loop{"i < nums.length?"}
    Loop -->|No| Return[Return k]
    Loop -->|Yes| Compare{"nums at i != nums at i-1?"}

    Compare -->|Yes| Unique["nums at k = nums at i<br/>k++"]
    Compare -->|No| Skip[Skip duplicate]

    Unique --> Next["i++"]
    Skip --> Next
    Next --> Loop

    ReturnZero --> End([End])
    Return --> End

    style Start fill:#e1f5fe
    style End fill:#f3e5f5
    style Unique fill:#e8f5e8
    style Skip fill:#fff3e0
    style Compare fill:#fce4ec
````

## 🔄 Two Pointer Movement Pattern

```mermaid
graph TD
    A["Initial: [1,1,2,2,3]<br/>k=1, i=1"] --> B["Check nums[1]=1 vs nums[0]=1"]
    B --> C["Same - Skip<br/>k=1, i=2"]
    C --> D["Check nums[2]=2 vs nums[1]=1"]
    D --> E["Different - Keep<br/>nums[1]=2, k=2, i=3"]
    E --> F["Check nums[3]=2 vs nums[2]=2"]
    F --> G["Same - Skip<br/>k=2, i=4"]
    G --> H["Check nums[4]=3 vs nums[3]=2"]
    H --> I["Different - Keep<br/>nums[2]=3, k=3"]
    I --> J["Final: [1,2,3,_,_]<br/>Return k=3"]

    style A fill:#e3f2fd
    style E fill:#e8f5e8
    style I fill:#e8f5e8
    style J fill:#f3e5f5
```

## 📊 Complexity Comparison

```mermaid
xychart-beta
    title "Time Complexity Comparison"
    x-axis [10, 100, 1000, 10000]
    y-axis "Operations" 0 --> 100000000
    line "Our O(n) Solution" [10, 100, 1000, 10000]
    line "Naive O(n squared) Solution" [100, 10000, 1000000, 100000000]
    line "Hash Set O(n) Solution" [10, 100, 1000, 10000]
```

## 🎨 Visual Memory Layout

```mermaid
graph TB
    subgraph "Initial Array"
        A1[1] --- A2[1] --- A3[2] --- A4[2] --- A5[3]
    end

    subgraph "Pointer Positions"
        P1[k=1] --- P2[i=1]
    end

    subgraph "After Processing"
        B1[1] --- B2[2] --- B3[3] --- B4[_] --- B5[_]
    end

    subgraph "Result k=3"
        R1[Valid] --- R2[Valid] --- R3[Valid] --- R4[Invalid] --- R5[Invalid]
    end
```

## 🌐 Related Problems Network

```mermaid
graph LR
    A["Remove Duplicates from Sorted Array 26"] --> B["Remove Duplicates from Sorted Array II 80"]
    A --> C["Remove Element 27"]
    A --> D["Move Zeroes 283"]

    B --> E["Remove Duplicates from Unsorted Array Custom"]
    C --> F["Remove All Adjacent Duplicates 1047"]
    D --> G["Sort Array by Parity 905"]

    A --> H["Two Pointer Technique"]
    H --> I["Container with Most Water 11"]
    H --> J["3Sum 15"]

    style A fill:#ff6b6b
    style H fill:#4ecdc4
    style B fill:#45b7d1
    style C fill:#45b7d1
    style D fill:#45b7d1
```

## 🎯 Problem Categories

```mermaid
pie title Problem Classification
    "Array Manipulation" : 40
    "Two Pointers" : 30
    "In-place Algorithms" : 20
    "Sorting Related" : 10
```

## ⚡ Performance Analysis

```mermaid
quadrantChart
    title Algorithm Efficiency Analysis
    x-axis Low Memory --> High Memory
    y-axis Low Time --> High Time

    quadrant-1 High Time, High Memory
    quadrant-2 High Time, Low Memory
    quadrant-3 Low Time, Low Memory
    quadrant-4 Low Time, High Memory

    Our Solution: [0.1, 0.1]
    Hash Set Approach: [0.1, 0.7]
    Naive O(n squared): [0.9, 0.1]
    Filter Method: [0.2, 0.8]
```

---

_💡 **Usage**: These diagrams can be rendered in any Mermaid-compatible viewer like GitHub, GitLab, VS Code extensions, or online Mermaid editors for beautiful visualizations!_
