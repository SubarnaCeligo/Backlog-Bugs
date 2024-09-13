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
      if (tile.name.includes("TC_C53119")) {
        await io.api.deleteCall(`v1/integrations/${tile._integrationId}`);
      }
    }
  });

  test("TC_C53119_Verify the data flow from Create integration page to Integration page @Env-All @Zephyr-IO-T15062", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C53119");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime()
    test.step("*** Clicked on SAVE and CLOSE button ***", async ()=>{});
    const isAddNewResourceVisible = await io.homePage.isVisible(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.assert.expectToBeTrue(isAddNewResourceVisible, "Add New Resource button is not visible");
  });

  test("TC_C53117_Verify Description field is not Mandatory. @Env-All @Zephyr-IO-T15060", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C53119");
    test.step("*** Entered Flow Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.DESCRIPTION, "");
    test.step("*** Entered Description ***", async ()=>{});

    const isSaveButtonVisible = await io.homePage.isVisible(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    await io.assert.expectToBeTrue(isSaveButtonVisible, "Save and Close button is not visible");
    const saveButtonAfterChange = await page.locator(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    const isEnabled = await saveButtonAfterChange.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Save button is disabled");
    test.step("*** SAVE AND CREATE FLOW BUTTON PRESENT ", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    await io.homePage.loadingTime();
    test.step("*** CLICKED ON SAVE AND CREATE FLOW BUTTON ", async () => { });
  });
});
