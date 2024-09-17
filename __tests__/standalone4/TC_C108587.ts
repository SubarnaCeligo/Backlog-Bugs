
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C108587.json";

test.describe("TC_C108587", () => {
  let flowId;
  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C108587 @Zephyr-IO-T24153 @Env-All", async ({ io, page }, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await test.step("*** Created Flows :" + TC.name, async () => { });
    await io.homePage.loadingTime();
    //Run Flow
    await io.api.checkJobStatusFromAPI(TC.name, flowId,
      [0, 0, 5]
    );
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 0);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.PANELICON);
    await io.homePage.click(selectors.flowBuilderPagePO.LIST_VIEW_ERRORS);

    let Erroricon = await io.homePage.isVisible(selectors.flowBuilderPagePO.ERROR_TAG);
    
    await io.assert.expectToBeFalse(Erroricon, "");
    test.step("*** Verified tag icons and filter tag icon is not available on old error view window ***", async ()=>{});


    const errors = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const lastErrorIndex = errors.length - 1;
    await errors[lastErrorIndex].click();
    let filtererrorTag = await io.homePage.isVisible(selectors.flowBuilderPagePO.ERROR_TAG);
    await io.assert.expectToBeFalse(filtererrorTag, "");
  });
});
