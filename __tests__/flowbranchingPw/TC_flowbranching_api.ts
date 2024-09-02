import { test, expect } from "@celigo/ui-core-automation";
import fb from "@testData/flowbranching/fb_ui.json";

// As per discussion with Rajaneesh I'm skipping this test case as its a sample test
test.describe.skip("flowbranching_api", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-9999999999999 SAMPLE_TEST", async ({ io }, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(fb);
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    // Next steps
    // Add few more steps to do some UI/UX actions on the created flowbranching
    // Add assertions to validate the created flowbranching
  });
});
