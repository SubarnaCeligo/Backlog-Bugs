import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import BQ from "@testData/STANDALONE/TC_C37036.json";

test.describe("TC_C37039", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T7667 @Env-All TC_C37039", async ({io,page}, testInfo) => {
    // *Create Page Generator
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.BIGQUERYADAPTOR);
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    var conn = BQ.pageGenerators[0].qa__export._connectionId;
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.loadingTime();

    const onceValue = await io.homePage.isVisible(selectors.exportsPagePO.EXPORT_TYPE_FULL);
    await io.assert.expectToBeFalse(onceValue, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
