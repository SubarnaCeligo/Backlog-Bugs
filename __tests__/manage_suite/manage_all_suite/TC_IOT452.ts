import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT452 To verify Pull from Integration (Manage access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T452 @Env-All C41571 To verify Pull from Integration (Manage access)`, async ({
    io,
    page
  }) => {
    // In Production
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.addStep("*** Clicked on Production Env ***");
    await io.homePage.loadingTime();
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.addStep("*** Waiting for home page Search Bar ***");
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT452_Integration_DND');
    await io.homePage.addStep("*** Searching for TC_IOT452_Integration_DND ***");
    await io.flowBuilder.clickByTextByIndex("TC_IOT452_Integration_DND", 0);
    await io.homePage.addStep("*** Clicked on Integration TC_IOT452_Integration_DND ***");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Revisions", 0);
    await io.homePage.addStep("*** Clicked on Revisions Tab ***");
    const isCreatePullVisible = await page.locator(selectors.integrationPagePO.CREATE_PULL).isVisible()
    expect(isCreatePullVisible).toBeTruthy();
    await io.homePage.addStep("*** Checking if Create Pull visible  on DOM ***");


    // In SandBox
    await io.flowBuilder.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.addStep("*** Naviating on Sandbox Env ***");
    await io.homePage.loadingTime();
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.addStep("*** Waiting for home page Search Bar ***")
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT452_Integration_DND');
    await io.homePage.addStep("*** Searching for TC_IOT452_Integration_DND ***");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("TC_IOT452_Integration_DND", 0);
    await io.homePage.addStep("*** Clicked on Integration TC_IOT452_Integration_DND ***");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Revisions", 0);
    await io.homePage.addStep("*** Clicked on Revisions Tab ***");
    const isCreatePullSandBoxVisible = await page.locator(selectors.integrationPagePO.CREATE_PULL).isVisible()
    expect(isCreatePullSandBoxVisible).toBeTruthy();
    await io.homePage.addStep("*** Checking if Create Pull visible  on DOM ***");
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.flowBuilder.loadingTime();
  });
});
