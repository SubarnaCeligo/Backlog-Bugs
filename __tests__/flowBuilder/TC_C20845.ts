
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20845 from "@testData/FlowBuilder/TC_C20845.json";
test.describe("TC_C20845", () => {
  let flowId: string;
  test("@Env-All @Zephyr-IO-T2974|Verify Ignore count should display on the PG step", async ({io, page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C20845);
    flowId = await io.api.getFlowId(TC_C20845.name);
    await io.api.checkJobStatusFromAPI( TC_C20845.name, flowId, [0, 0, 1]);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId );
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    const label = await page.locator("table > tbody > tr:nth-child(2) > td:nth-child(4)").textContent();
    expect(label).toContain("1");
    test.step("*** Verified ignore count is displayed on PG export.***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });
});
