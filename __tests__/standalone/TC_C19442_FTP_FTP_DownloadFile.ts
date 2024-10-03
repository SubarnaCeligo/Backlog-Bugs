
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C19442_FTP_FTP_DownloadFile", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T11510 TC_C19442_FTP_FTP_DownloadFile", async ({io,page}, testInfo) => {

    await io.goToFlowsPage();
    const flowId = await io.api.getFlowId("TC_C19442_DND");
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** Navigating to the Flow ***", async ()=>{});

    test.step("*** clicking on more actions ***", async ()=>{});
    await io.homePage.click(`[id="draggableSectionDivId"] ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await page.waitForTimeout(2000);
    test.step("*** veryfying download files option ***", async ()=>{});
    var data = await io.homePage.isVisible(selectors.flowBuilderPagePO.DOWNLOADFILES);
    await io.assert.expectToBeTrue(data, "");
    await io.homePage.click(selectors.flowBuilderPagePO.DOWNLOADFILES);
  });
});
