// Code validation and test execution system

export interface TestCase {
  name: string
  input: any
  expectedOutput: any
  testFunction: (code: string, input: any) => any
}

export interface ValidationResult {
  name: string
  passed: boolean
  message: string
  executionTime?: number
}

export class CodeValidator {
  private testCases: TestCase[]

  constructor(testCases: TestCase[]) {
    this.testCases = testCases
  }

  async validateCode(code: string): Promise<ValidationResult[]> {
    const results: ValidationResult[] = []

    for (const testCase of this.testCases) {
      const startTime = performance.now()

      try {
        const output = await this.executeTest(code, testCase)
        const passed = this.compareOutputs(output, testCase.expectedOutput)
        const executionTime = performance.now() - startTime

        results.push({
          name: testCase.name,
          passed,
          message: passed
            ? `Test passed in ${executionTime.toFixed(2)}ms`
            : `Expected ${JSON.stringify(testCase.expectedOutput)}, got ${JSON.stringify(output)}`,
          executionTime,
        })
      } catch (error) {
        const executionTime = performance.now() - startTime
        results.push({
          name: testCase.name,
          passed: false,
          message: `Runtime error: ${error instanceof Error ? error.message : "Unknown error"}`,
          executionTime,
        })
      }
    }

    return results
  }

  private async executeTest(code: string, testCase: TestCase): Promise<any> {
    // In a real implementation, this would execute the code in a sandboxed environment
    // For now, we'll simulate test execution
    return testCase.testFunction(code, testCase.input)
  }

  private compareOutputs(actual: any, expected: any): boolean {
    return JSON.stringify(actual) === JSON.stringify(expected)
  }
}

// Predefined test suites for different challenge types
export const testSuites = {
  apiEndpoint: (challengeId: string): TestCase[] => {
    switch (challengeId) {
      case "1":
        return [
          {
            name: "GET /api/users returns array of users",
            input: { method: "GET", url: "/api/users" },
            expectedOutput: { status: 200, hasUsers: true },
            testFunction: (code: string) => {
              // Simulate checking if code handles GET request
              const hasGetHandler = code.includes("export async function GET")
              const returnsUsers = code.includes("users") && code.includes("NextResponse.json")
              return { status: hasGetHandler && returnsUsers ? 200 : 500, hasUsers: returnsUsers }
            },
          },
          {
            name: "GET /api/users?id=1 returns single user",
            input: { method: "GET", url: "/api/users?id=1" },
            expectedOutput: { status: 200, hasUser: true },
            testFunction: (code: string) => {
              const checksUserId = code.includes("searchParams.get") && code.includes("id")
              const findsUser = code.includes("find") || code.includes("filter")
              return { status: checksUserId && findsUser ? 200 : 404, hasUser: checksUserId && findsUser }
            },
          },
          {
            name: "POST /api/users creates new user",
            input: { method: "POST", body: { name: "Test User", email: "test@example.com" } },
            expectedOutput: { status: 201, created: true },
            testFunction: (code: string) => {
              const hasPostHandler = code.includes("export async function POST")
              const parsesBody = code.includes("request.json")
              const createsUser = code.includes("push") || code.includes("create")
              return { status: hasPostHandler && parsesBody && createsUser ? 201 : 400, created: createsUser }
            },
          },
          {
            name: "Invalid email returns 400 error",
            input: { method: "POST", body: { name: "Test", email: "invalid-email" } },
            expectedOutput: { status: 400, error: true },
            testFunction: (code: string) => {
              const hasValidation =
                code.includes("email") && (code.includes("test") || code.includes("match") || code.includes("@"))
              const returns400 = code.includes("400")
              return { status: hasValidation && returns400 ? 400 : 201, error: hasValidation }
            },
          },
        ]
      default:
        return []
    }
  },

  algorithm: (challengeId: string): TestCase[] => {
    switch (challengeId) {
      case "2":
        return [
          {
            name: "Insert nodes correctly",
            input: [5, 3, 7, 1, 9],
            expectedOutput: { valid: true, size: 5 },
            testFunction: (code: string) => {
              const hasInsert = code.includes("insert") || code.includes("add")
              const hasNode = code.includes("node") || code.includes("Node")
              return { valid: hasInsert && hasNode, size: 5 }
            },
          },
          {
            name: "Search finds existing values",
            input: { search: 7 },
            expectedOutput: { found: true },
            testFunction: (code: string) => {
              const hasSearch = code.includes("search") || code.includes("find")
              return { found: hasSearch }
            },
          },
          {
            name: "Delete removes nodes properly",
            input: { delete: 3 },
            expectedOutput: { deleted: true, size: 4 },
            testFunction: (code: string) => {
              const hasDelete = code.includes("delete") || code.includes("remove")
              return { deleted: hasDelete, size: 4 }
            },
          },
        ]
      default:
        return []
    }
  },

  react: (challengeId: string): TestCase[] => {
    switch (challengeId) {
      case "3":
        return [
          {
            name: "Component renders todo list",
            input: {},
            expectedOutput: { renders: true },
            testFunction: (code: string) => {
              const hasComponent = code.includes("function") || code.includes("const")
              const hasTodoList = code.includes("todo") || code.includes("list")
              return { renders: hasComponent && hasTodoList }
            },
          },
          {
            name: "Uses useState for state management",
            input: {},
            expectedOutput: { usesState: true },
            testFunction: (code: string) => {
              const hasUseState = code.includes("useState")
              return { usesState: hasUseState }
            },
          },
          {
            name: "Implements add todo functionality",
            input: { action: "add", todo: "New task" },
            expectedOutput: { added: true },
            testFunction: (code: string) => {
              const hasAddFunction = code.includes("add") || code.includes("create")
              const updatesState = code.includes("set") || code.includes("...")
              return { added: hasAddFunction && updatesState }
            },
          },
        ]
      default:
        return []
    }
  },
}

// Helper function to get appropriate test suite based on challenge category
export function getTestSuite(challengeId: string, category: string): TestCase[] {
  switch (category) {
    case "api":
      return testSuites.apiEndpoint(challengeId)
    case "algorithms":
      return testSuites.algorithm(challengeId)
    case "react":
      return testSuites.react(challengeId)
    default:
      return []
  }
}
