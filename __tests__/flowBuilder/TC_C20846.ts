
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as TC from "@testData/FlowBuilder/TC_C20846.json";

test.describe("TC_C20846", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T2975|Verify error count should display on the PG step", async ({io, page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.api.checkJobStatusFromAPI( TC.name, flowId, [0, 0,1]);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    const label = await page.locator(selectors.flowBuilderPagePO.ERROR_COUNT5).textContent();
    expect(label).toContain("1 error");
    test.step("*** Verified error count is displayed on PG export.***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });
});
