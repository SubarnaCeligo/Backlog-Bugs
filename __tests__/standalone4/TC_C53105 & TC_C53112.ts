import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Create Flow While Creating Integration", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION_WDIO, "NewFlow1");
    await io.homePage.loadingTime();

    const isIntegrationAvailable = await page.locator(selectors.homePagePO.INTEGRATION_TILES, { hasText: 'NewFlow1' }).count();

    if (isIntegrationAvailable > 0) {
      const actionmenu = await page.$$(selectors.homePagePO.INTEGRATION_TILES_ACTIONS_MENU);
      await actionmenu[0].click();
      await io.homePage.loadingTime();

      await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.homePage.click(selectors.basePagePO.DELETE);
      await io.homePage.loadingTime();
    }
  });

  test("TC_C53105_Verify the name field is Mandatory @Env-All @Zephyr-IO-T15055", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    const saveButton = await page.locator(selectors.basePagePO.SAVE);
    const isDisabled = await saveButton.isDisabled();
    expect(isDisabled).toBeTruthy();

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "NewFlow1");
    await io.homePage.loadingTime();
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Save And Create Flow button ***", async ()=>{});
  });

  test("TC_C53112_Verify the SAVE button present in creating a new integration Page. @Env-All @Zephyr-IO-T15056", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    const saveButton = await page.locator(selectors.basePagePO.SAVE);
    const isDisabled = await saveButton.isDisabled();
    await io.assert.expectToBeTrue(isDisabled, "Save button is not disabled");
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "NewFlow1");
    await io.homePage.loadingTime();
    test.step("*** Entered Flow Name ***", async ()=>{});

    const isSaveButtonVisible = await io.homePage.isVisible(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    expect(isSaveButtonVisible).toBeTruthy();
    const saveButtonAfterChange = await page.locator(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    const isEnabled = await saveButtonAfterChange.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Save button is disabled");
    test.step("*** SAVE AND CREATE FLOW BUTTON PRESENT ", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    await io.homePage.loadingTime();
    test.step("*** CLICKED ON SAVE AND CREATE FLOW BUTTON ", async () => { });
  });
  
});
