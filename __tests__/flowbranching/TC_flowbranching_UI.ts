import { test, expect } from "@celigo/ui-core-automation";
import fb from "@testData/flowbranching/fb_ui.json"

// As per discussion with Rajaneesh I'm skipping this test case as its a sample test

test.describe.skip("flowbranching_UI", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All SAMPLE_TEST", async ({
        io
    }, testInfo) => {
        await io.pageGenerator(
            "allureReporter",
            fb
        );
        await io.flowbranching.createFlowBranch(
            fb
        );
        // Next steps
        // Add few steps to validate data from API/UI based on requirements
        // Add Assertions for validation
    });
});
