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
      if (tile.name.includes("TC_C53113")) {
        await io.api.deleteCall(`v1/integrations/${tile._integrationId}`);
      }
    }
  });

  test("TC_C53113_Verify the SAVE & CLOSE button @Env-All @Zephyr-IO-T15057", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async () => { });
    await io.homePage.loadingTime();
    const saveButton = await page.locator(selectors.basePagePO.SAVE);
    const isDisabled = await saveButton.isDisabled();
    await io.assert.expectToBeTrue(isDisabled, "Save button is not disabled");
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C53113");
    await io.homePage.loadingTime();
    test.step("*** Entered Flow Name ***", async () => { });

    const isSaveButtonVisible = await io.homePage.isVisible(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.expectToBeTrue(isSaveButtonVisible, "Save and Close button is not visible");
    const saveButtonAfterChange = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE);
    const isEnabled = await saveButtonAfterChange.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Save button is disabled");
    test.step("*** SAVE AND ClOSE BUTTON PRESENT ", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** CLICKED ON SAVE AND CLOSE BUTTON ", async () => { });
  });

  test("TC_C53115_Name field must not exceed characters more than 100 @Env-All @Zephyr-IO-T15058", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789");
    await io.homePage.loadingTime();
    test.step("*** Flow Name Entered ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CREATE_FLOW);
    test.step("*** Clicked on Save And Create Flow button ***", async ()=>{});

    var error = "The maximum size of the field: name in the Integration document should be 100 characters.";
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, error);
    test.step("*** verifying the error message displayed ***", async ()=>{});
  });
});
