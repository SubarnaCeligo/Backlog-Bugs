import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Create Flow While Creating Integration", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    const tiles = await io.api.getCall("v1/tiles");
    if (!tiles) {
      return;
    }
    for (let tile of tiles) {
      if (tile.name.includes("TC_C53118")) {
        await io.api.deleteCall(`v1/integrations/${tile._integrationId}`);
      }
    }
  });

  test("TC_C53116_Verify the CLOSE button present in creating a new integration Page. @Env-All @Zephyr-IO-T15059", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_53116");
    test.step("*** Entered Flow Name ***", async ()=>{});

    const isCancelButtonVisible = await io.homePage.isVisible(selectors.basePagePO.CLOSE);
    await io.assert.expectToBeTrue(isCancelButtonVisible, "Cancel button is not visible");
    await io.homePage.click(selectors.basePagePO.CLOSE);

    const isCloseButtonVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.CLOSEBTN);
    await io.assert.expectToBeTrue(isCloseButtonVisible, "Discard button is not visible");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    test.step("*** CLICKED ON DISCARD CHANGES OPTION ", async () => { });
  });
  test("TC_C53118_Verify the data flow from Create integration page to Flow builder page @Env-All @Zephyr-IO-T15061", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C53118");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    test.step("*** Clicked on Save And Create Flow button ***", async ()=>{});

    await io.homePage.loadingTime();
    const isRunConsoleAvailable = await io.homePage.isVisible(selectors.homePagePO.RUN_CONSOLE)
    await io.assert.expectToBeTrue(isRunConsoleAvailable, "Flow builder page not opened");
  });
});
