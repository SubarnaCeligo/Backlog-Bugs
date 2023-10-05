import { test, expect } from "@celigo/ui-core-automation";
import fb from "../../testData/flowbranching/fb_ui.json"


test.describe("flowbranching_api", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("SAMPLE_TEST", async ({
        io
    }, testInfo) => {
        await test.step("*** Creating FlowBranching from API ***", async () => {
            await io.flowbranching.createFlowBranchFromAPI(fb);
        });
        // Next steps
        // Add few more steps to do some UI/UX actions on the created flowbranching
        // Add assertions to validate the created flowbranching
    });
});
