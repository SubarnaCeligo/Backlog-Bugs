import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Create Flow While Creating Integration", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("TC_C54426_Validate create flow now button present in Integration Page. @Env-All @Zephyr-IO-T15063", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C54426");
    test.step("*** Entered Integration Name ***", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on SAVE and CLOSE button ***", async ()=>{});
    await io.homePage.loadingTime();

    const isCreateFlowNowButtonPresent = await page.locator(selectors.basePagePO.ADD_NEW_RESOURCE).isVisible();
    await io.assert.expectToBeTrue(isCreateFlowNowButtonPresent, "Create flow now button is not present");
    test.step("*** Verifying the Create flow now button is present in Integration Page ***", async () => { });

    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    test.step("*** deleting the integration ***", async () => { });
  });

  test("TC_C54427_Validate message Present on Integration screen. @Env-All @Zephyr-IO-T15064", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C54427");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on SAVE and CLOSE button ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("You don’t have any flows yet", "You don’t have any flows yet is not displayed");
    test.step("*** verifying the message You don’t have any flows yet is displayed ***", async () => { });

    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    test.step("*** deleting the integration ***", async () => { });
  });
});
