import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/flowbranching/TC_T18958.json"

test.describe("T18958 Verify flow run on adding output filter 'is empty' and 'is not empty' conditions in a branched flow", () => {
  let branchScript;
  let flowId;
  test.beforeEach(async ({ io }) => {
    branchScript = await io.api.createScriptViaAPI(TC.scriptSchema);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteScriptViaAPI(branchScript);
  });
  test("@Env-All @Priority-P2 @Zephyr-IO-T18958 C68559 Verify flow run on adding output filter 'is empty' and 'is not empty' conditions in a branched flow", async ({ io, page }) => {
    TC.routers[0].script._scriptId = branchScript;
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.flowBuilder.navigateTo(
      process.env.IO_Integration_URL + "flowBuilder/" + flowId
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.addStep("Running the flow");
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    expect(lastRun).toBeVisible();
  });
});