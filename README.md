# Playwright TypeScript Project

This is a Playwright and TypeScript project that provides a comprehensive testing framework for web applications. It includes features like visual regression tests, parallel execution, retries on CI, and more.

## Steps to Build the Project

## Configure the project
```sh
npm install
```

## How to write a test case
-Please refer the sample test file in the project(./helper/sample.test.ts)
## Run a test Case
```sh
ENV={env} SUITE={suitename} npm run test - To run tests based on suite name
ENV={env} npm run test - To run all tests
ENV={env} npm run test:smoke - To run tests based on tags.Tags are defined in the test files
```

## Reports

```sh
npm run report
```

## Features

- **Awesome report with screenshots, videos & logs**: Generate detailed test reports with screenshots and videos of test executions, as well as logs for easy debugging and analysis.
- **Execute tests on multiple environments**: Run tests across multiple browsers (Chromium, Firefox, and WebKit) and platforms (Windows, macOS, and Linux).
- **Parallel execution**: Execute tests in parallel, significantly reducing the overall test execution time.
- **Rerun only failed features**: Quickly rerun only the tests that failed in the previous run, saving time and resources.
- **Retry failed tests on CI**: Automatically retry failed tests on Continuous Integration (CI) systems to minimize test flakiness.
- **Page Object Model**: Utilize the Page Object Model design pattern to create maintainable and reusable test code.
- **Visual regression tests**: Perform visual regression testing to catch UI discrepancies and ensure consistent user experiences.


