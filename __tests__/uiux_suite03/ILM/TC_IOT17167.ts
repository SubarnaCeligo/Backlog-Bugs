import {  expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT17167 To verify Pull from Integration dropdown field lists the source integrations for cloned integration present in both production and sandbox account`, () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("Clone - TC_IOT17167", "_id");
    await io.api.deleteIntegration(intId);
  });
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T17167 @Env-All C42719 To verify Pull from Integration dropdown field lists the source integrations for cloned integration present in both production and sandbox account`, async ({
    io,
    page
  }) => {
    let env = "Production,Sandbox";
    let environment = env.split(",");
    for (const envItem of environment) {
      await io.flowBuilder.clickByTextByIndex(envItem, 0);
      await io.homePage.addStep(`*** Clicked on ${envItem} Env ***`)
      await io.flowBuilder.clickByText("Create");
      await io.homePage.addStep(`*** Clicked on Create Button ***`)
      await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
      await io.homePage.addStep(`*** Clicked on Create New Source Integration ***`)
      await io.homePage.fill(selectors.basePagePO.NAME, "TC_IOT17167");
      await io.homePage.addStep(`*** Filled integration name ***`)
      await io.homePage.loadingTime();
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.addStep(`*** Clicked on Save and Close ***`)
      await io.homePage.loadingTime();
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
      await io.homePage.addStep(`*** Clicked on Clone Integration label on Source Integration ***`)
      await io.homePage.loadingTime();
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
      await io.homePage.loadingTime();
      await io.homePage.addStep(`*** Clicked on Clone Integration Button on Source Integration ***`)
      await io.flowBuilder.click(selectors.basePagePO.INSTALL);
      await io.homePage.addStep(`*** Clicked on Install Integration Button on Source Integration ***`)
      await io.homePage.loadingTime();
      await io.flowBuilder.click(selectors.integrationPagePO.REVISIONS);
      await io.homePage.addStep("*** Clicked on Revisions Tab ***")
      await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
      await io.homePage.addStep("*** Clicked on Create Pull ***")
      await io.homePage.loadingTime();
      const isParentIntegrationNameDisplayed = await page.locator('text="TC_IOT17167"').isVisible();
      expect(isParentIntegrationNameDisplayed).toBeTruthy();
      await io.homePage.loadingTime();
      await io.flowBuilder.click("[data-test='cancelCreatePull']");
      await io.homePage.addStep("*** Closed Create Pull Dialog ***")
      await io.homePage.addStep("*** Clicked on Integration TC_IOT17167 ***")
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.homePage.addStep("*** Clicked on Delete Source Integration ***")
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.homePage.addStep("*** Clicked on Delete Button ***")
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Naviagated to Home page ***")
      await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      await io.homePage.addStep("*** Waiting for home page Search Bar ***")

      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT17167');
      await io.homePage.addStep("*** Searching for TC_IOT17167 ***")
      await io.flowBuilder.clickByTextByIndex("TC_IOT17167",0);
      await io.homePage.addStep("*** Clicked on Integration TC_IOT17167 ***")
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.homePage.addStep("*** Clicked on Delete Source Integration ***")
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.homePage.addStep("*** Clicked on Delete Button ***")
    }
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.addStep(`*** Clicked on Production Button ***`)
  });
});