import { test, expect } from "@celigo/ui-core-automation";
import {testconversion} from "@celigo/aut-utilities"

test.describe("E2E Flows", () => {
    test("test",async () => {
        testconversion("/Users/pareshvilasmore/celigo/wdio-Platform-react-qa/celigo-qa-automation/tests/functional/specs/GENERAL")
    });
});