import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
  

test.describe("[HTTP] Introduce OAuth1.0 auth type without Save & Authorize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  
  test("TC_C56070_Verify the [SAVE & CLOSE] button present in Create connection Page. @Env-All @Zephyr-IO-T15570", async ({ io, page }, testInfo) => {
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_03");
    test.step("*** Entered Flow Name ***", async ()=>{});

    const isSaveButtonVisible = await io.homePage.isVisible(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.expectToBeTrue(isSaveButtonVisible, "Save And Close button not available");
    const saveButtonAfterChange = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE);
    const isEnabled = await saveButtonAfterChange.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Save And Close button is disabled");
  });
  
  test("TC_C56071_Verify the [CLOSE] button. @Env-All @Zephyr-IO-T15571", async ({ io, page }, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_04");
    test.step("*** Entered Flow Name ***", async ()=>{});

    const isCloseButtonVisible = await io.homePage.isVisible(selectors.basePagePO.CLOSE);
    await io.assert.expectToBeTrue(isCloseButtonVisible, "Close button not available");
    const closeButton = await page.locator(selectors.basePagePO.CLOSE);
    const isEnabled = await closeButton.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Close button is disabled");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await io.assert.verifyElementDisplayedByText("Are you sure you want to leave this page and lose your unsaved changes?", "Pop up message is not displayed");
    const isDiscardButtonVisible = await io.homePage.isVisible(selectors.basePagePO.DISCARD_CHANGES);
    await io.assert.expectToBeTrue(isDiscardButtonVisible, "Discard Changes button not available");
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
  });
});
