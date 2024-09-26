
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20122 from "@testData/EM2.0/TC_C20122.json";

test.describe("TC_C20122", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T7183 TC_C20122| Verify EM 2.0: latest API gets the latest flow jobs per page generator to show in the latest Run Dashboard", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C20122);
await test.step(
      "Created Flow " +
        flows.get(TC_C20122.name)["flowName"] +
        " With ID " +
        flows.get(TC_C20122.name)["flowId"],async () => {}
    );
    test.step("*** Running Flow first time ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      TC_C20122.name,
      flows.get(TC_C20122.name)["flowId"],
      [1, 0, 1]
    );
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C20122.name)["flowId"]
    );
    test.step("*** Running Flow second time***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    console.log("Flow Completed");
    test.step("*** Waiting till flow gets completed ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.delay(30000);
    await io.homePage.isPageReady();
    const lastRun = await page.locator('div').filter({
      has: page.getByText("Last Run")
    });
    const latestDate =new Date(await lastRun.locator(selectors.flowBuilderPagePO.TIME).nth(1).innerText()).toISOString();
    var resp = await io.api.getCall(
      "v1/flows/" + flows.get(TC_C20122.name)["flowId"] + "/jobs/latest"
    );
    await io.assert.expectToContainValue(latestDate.substring(0,10), resp[0].lastExecutedAt.substring(0,10), '');
await test.step(
      "***  latest API gets the latest flow jobs per page generator to show in the latest Run Dashboard ***"
, async ()=>{});
  });
});
