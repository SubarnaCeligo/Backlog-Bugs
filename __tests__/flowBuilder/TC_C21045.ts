import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C21045 from "@testData/FlowBuilder/TC_C21045.json";

test.describe("TC_C21045", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T2979|To verify Preview panel request/response updates", async ({io, page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C21045);
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    flowId = await io.api.getFlowId(TC_C21045.name);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    // Open the export
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    // Click on preview button
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    await (
      await page.locator(selectors.importPagePO.PREVIEWDATA)
    ).isVisible({ timeout: 5000 });
    await io.homePage.loadingTime();
    // Get the preview data
    var httpresbody =await (await page.$(selectors.importPagePO.PREVIEWDATA)).isVisible();
    await io.assert.expectToBeTrue(httpresbody, "");
    await io.homePage.click(selectors.importPagePO.HTTP_REQUEST);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.TAB,
      "Headers"
    );
    await io.homePage.loadingTime();
    expect (await page.locator(selectors.importPagePO.PREVIEWDATA).isVisible()).toBeTruthy();
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.TAB,
      "Other"
    );
    await io.homePage.loadingTime();
    expect (await page.locator(selectors.importPagePO.PREVIEWDATA).isVisible()).toBeTruthy();

    await io.homePage.click(selectors.exportsPagePO.HTTP_RESPONSE);
    await io.homePage.loadingTime();
    expect (await page.locator(selectors.importPagePO.PREVIEWDATA).isVisible()).toBeTruthy();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.PARSED_OUTPUT);
    await io.homePage.loadingTime();
    expect (await page.locator(selectors.importPagePO.PREVIEWDATA).isVisible()).toBeTruthy();
    await io.api.deleteFlowsWithId([flowId]);
  });
});
