import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C27331.json";

test.describe("TC_C27331", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2816| Verify 'Override trace key template' field on PG Transfer's Advanced section", async ({io,page}, testInfo) => {
    // Creating Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );

    test.step("*** Opening Advanced option ***", async ()=>{});
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    await io.homePage.loadingTime();
    const element = await page.locator(selectors.mappings.OVERRIDETRACEKEYTEMPLATE);
    await element.scrollIntoViewIfNeeded();
    expect(element.isVisible()).toBeTruthy();
  });
});
