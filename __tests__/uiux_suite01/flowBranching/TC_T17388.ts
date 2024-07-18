import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/flowbranching/TC_T17388.json"

test.describe("T17388 Verify flow branching when the script returns 'true'", () => {
  let branchScript;
  let flowId;
  test.beforeEach(async ({ io }) => {
    branchScript = await io.api.createScriptViaAPI(TC.scriptSchema);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteScriptViaAPI(branchScript);
  });
  test("@Env-All @Priority-P2 @Zephyr-IO-T17388 C68484 Verify flow branching when the script returns 'true'", async ({ io, page }) => {
    TC.routers[0].script._scriptId = branchScript;
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.flowBuilder.navigateTo(
      process.env.IO_Integration_URL + "flowBuilder/" + flowId
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL, 'unavailable');
  });
});