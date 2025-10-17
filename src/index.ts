import * as fs from "fs";
import * as path from "path";

class ProblemRunner {
  private problemsPath = path.join(__dirname, "problems");

  constructor() {
    // Handle graceful exit
    process.on("SIGINT", () => this.exit());
    process.on("SIGTERM", () => this.exit());
  }

  run() {
    const problemNumber = process.argv[2];

    if (!problemNumber) {
      this.showHelp();
      return;
    }

    if (problemNumber === "list") {
      this.listProblems();
      return;
    }

    const problem = this.findProblem(parseInt(problemNumber));

    if (!problem) {
      console.log(`❌ Problem #${problemNumber} not found!`);
      this.listProblems();
      return;
    }

    this.executeProblem(problem);
  }

  private showHelp() {
    console.log("🚀 LeetCode TypeScript Playground");
    console.log("📝 Problem Runner with main() function\n");
    console.log("Usage:");
    console.log(
      "  npm run dev:1    # Run problem #1 main() function with hot reload"
    );
    console.log(
      "  npm run dev:2    # Run problem #2 main() function with hot reload"
    );
    console.log(
      "  npm run dev:3    # Run problem #3 main() function with hot reload"
    );
    console.log(
      "  npm run dev:4    # Run problem #4 main() function with hot reload"
    );
    console.log(
      "  npm run dev:5    # Run problem #5 main() function with hot reload"
    );
    console.log("  npm run test:1   # Run Jest tests for problem #1");
    console.log("  npm run test:2   # Run Jest tests for problem #2");
    console.log("  npm run test:3   # Run Jest tests for problem #3");
    console.log("  npm run test:4   # Run Jest tests for problem #4");
    console.log("  npm run test:5   # Run Jest tests for problem #5");
    console.log("  npm run list     # List all problems");
    console.log("  npm run dev      # Show this help\n");

    this.listProblems();
  }

  private listProblems() {
    const problems = this.scanAvailableProblems();

    if (problems.length === 0) {
      console.log(
        "❌ No problems found! Add some problems to the problems folder."
      );
      return;
    }

    console.log("📚 Available problems:");
    problems.forEach((p) => {
      console.log(`  #${p.number} - ${p.fileName}`);
    });
  }

  private scanAvailableProblems(): Array<{
    number: number;
    fileName: string;
    fullPath: string;
  }> {
    const problems: Array<{
      number: number;
      fileName: string;
      fullPath: string;
    }> = [];

    const scanDirectory = (dirPath: string) => {
      if (!fs.existsSync(dirPath)) return;

      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Check if this directory matches the pattern (starts with number)
          const match = item.match(/^(\d+)-/);
          if (match && match[1]) {
            // Check if it contains dev.ts
            const devPath = path.join(fullPath, "dev.ts");
            if (fs.existsSync(devPath)) {
              const number = parseInt(match[1]);
              problems.push({
                number,
                fileName: item, // Use directory name
                fullPath: devPath, // Point to dev.ts
              });
            }
          } else {
            // Continue scanning subdirectories (for category folders like 'array')
            scanDirectory(fullPath);
          }
        } else if (item.endsWith(".ts")) {
          // Keep support for old flat file structure
          const match = item.match(/^(\d+)-/);
          if (match && match[1]) {
            const number = parseInt(match[1]);
            problems.push({
              number,
              fileName: item,
              fullPath,
            });
          }
        }
      }
    };

    scanDirectory(this.problemsPath);
    return problems.sort((a, b) => a.number - b.number);
  }

  private findProblem(problemNumber: number) {
    const problems = this.scanAvailableProblems();
    return problems.find((p) => p.number === problemNumber);
  }

  private executeProblem(problem: {
    number: number;
    fileName: string;
    fullPath: string;
  }) {
    try {
      console.log(`🎯 Problem #${problem.number} - ${problem.fileName}`);
      console.log("=".repeat(50));

      // Clear require cache for fresh execution
      const fullPath = path.resolve(problem.fullPath);
      Object.keys(require.cache).forEach((key) => {
        if (key.includes("problems") || key === fullPath) {
          delete require.cache[key];
        }
      });

      // Dynamic import and execute
      const problemModule = require(fullPath);

      // Find and execute main function (prioritize main for development)
      const mainFunction = Object.keys(problemModule).find(
        (key) => key === "main" && typeof problemModule[key] === "function"
      );

      const testFunction = Object.keys(problemModule).find(
        (key) =>
          key.startsWith("test") && typeof problemModule[key] === "function"
      );

      if (mainFunction) {
        console.log(`📝 Running ${mainFunction}...\n`);
        problemModule[mainFunction]();
      } else if (testFunction) {
        console.log(`📝 Running ${testFunction}...\n`);
        problemModule[testFunction]();
      } else {
        console.log("📝 No main or test function found.");
        console.log(
          '💡 Add a function "main" or starting with "test" in your problem file.'
        );
      }

      console.log("\n✅ Execution completed!");
    } catch (error) {
      console.error(
        "❌ Error executing problem file:",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  private exit() {
    console.log("\n👋 Thanks for using LeetCode Playground!");
    process.exit(0);
  }
}

// Run the problem runner
const runner = new ProblemRunner();
runner.run();
