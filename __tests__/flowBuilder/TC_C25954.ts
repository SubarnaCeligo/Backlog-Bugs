import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C25954 from "@testData/FlowBuilder/TC_C25954.json";

test.describe("TC_C25954", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2808|To verify `Auto-Map fields` button must be shown for all adaptors imports on mapping page", async ({ io, page }) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C25954);
    flowId = await io.api.getFlowId(TC_C25954.name);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON
    );
    await io.homePage.loadingTime();


    let res = true;
    let elements = await page.$$(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    for (let index = 0; index < elements.length; index++) {
      const element = await elements[index];
      await element.waitForElementState("visible");
      await element.click();
      await io.homePage.loadingTime();
      if (!((await page.$(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP)).isVisible())) {
        res = false
      }
      (await page.$(selectors.basePagePO.CLOSE)).click()
      await io.homePage.loadingTime();
    }


    await io.homePage.loadingTime();
    await io.assert.expectToBeTrue(res, "");
    await test.step(
      " 'Auto-Map fields' button must be shown for all adaptors imports on mapping page"
      , async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
});
