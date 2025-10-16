# Top 150 LeetCode - TypeScript Playground

TypeScript playground with hot reload for practicing LeetCode top 150 problems.

## 🚀 Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server with hot reload:

```bash
npm run dev
```

3. Build project (optional):

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── index.ts                    # Main entry point - edit this for testing
├── problems/                   # Folder for solutions
│   ├── array/                  # Array problems
│   │   └── 1-merge_sorted_array.ts
│   ├── string/                 # String problems
│   ├── linked-list/            # Linked List problems
│   ├── stack/                  # Stack problems
│   └── tree/                   # Tree problems
└── utils/                      # Helper utilities
    └── data-structures.ts      # Common data structures (ListNode, TreeNode, etc.)
```

## 🎯 Usage

### 1. Running with Hot Reload

```bash
npm run dev
```

Any file changes will automatically restart the application.

### 2. Creating New Solutions

1. Create a new file in the appropriate folder (e.g., `src/problems/array/`)
2. Export your solution function
3. Import and use it in `src/index.ts`

### 3. Solution Template

```typescript
/**
 * Problem: [Problem Name]
 * Difficulty: [Easy/Medium/Hard]
 * LeetCode #[Number]
 *
 * [Problem description]
 *
 * Example:
 * Input: [example input]
 * Output: [example output]
 */

export function solutionName(input: any): any {
  // Your solution here
  return result;
}

// Test cases
export function testSolutionName(): void {
  console.log("Testing [Problem Name]...");

  const result1 = solutionName(testInput);
  console.log("Test 1:", result1); // Expected: [expected output]

  console.log("[Problem Name] tests completed!\n");
}
```

## 🛠 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run compiled JavaScript
- `npm run build:watch` - Build with watch mode
- `npm run clean` - Remove dist folder

## 📚 Available Data Structures

In `src/utils/data-structures.ts`:

- `ListNode` - For linked list problems
- `TreeNode` - For binary tree problems
- `createLinkedList(values)` - Helper to create linked list
- `linkedListToArray(head)` - Convert linked list to array
- `createBinaryTree(values)` - Helper to create binary tree
- `printBinaryTree(root)` - Print tree with in-order traversal

## 💡 Tips

1. **Hot Reload**: Save files and see results immediately in terminal
2. **Debugging**: Use `console.log()` for debugging
3. **Testing**: Create test cases in each solution file
4. **Organization**: Group problems by category

## 🏃 Quick Start

1. Open `src/index.ts`
2. Uncomment or edit the section you want to test
3. Save file and see results in terminal

Happy coding! 🎉
