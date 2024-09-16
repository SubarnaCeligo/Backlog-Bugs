import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C15540 from "@testData/FlowBuilder/TC_C15540.json";

test.describe("@Env-All @Zephyr-IO-T2769", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Flow Page ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2769", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C15540);
    flowId = await io.api.getFlowId(TC_C15540.name);
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(
      flowId
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    test.step("Clicked on Export.", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.TYPE
    );
    await io.homePage.loadingTime();
    
    const label = await page.$$(selectors.basePagePO.MENU_ITEM);
    const all = await label[1].textContent();
    console.log(all);
    await expect(all).toContain("All - always export all data");
    const delta = await label[2].textContent();
    await expect(delta).toContain("Delta - export only modified data");
    const once = await label[3].textContent();
    await expect(once).toContain("Once - export records only once");
    const limit = await label[4].textContent();
    await expect(limit).toContain("Limit - export a set number of records");
    test.step("Export type dropdown values are sorted.", async ()=>{});
  });
});
