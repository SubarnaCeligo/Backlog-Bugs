import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT455 To verify Pull from Integration dropdown field doesn't lists the grand child clone integrations present in both production and sandbox account(Manage access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T455 @Env-All C41574 To verify Pull from Integration dropdown field doesn't lists the grand child clone integrations present in both production and sandbox account(Manage access)`, async ({
    io,
    page
  }) => {
    let env = "Production,Sandbox";
    let environment = env.split(",");
    for (const envItem of environment) {
      await io.flowBuilder.clickByTextByIndex(envItem, 0);
      await io.homePage.addStep(`*** Clicked on ${envItem} Env ***`);
      await io.flowBuilder.clickByText("Create");
      await io.homePage.addStep(`*** Clicked on Create Button ***`);
      await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
      await io.homePage.addStep(`*** Clicked on Create New Source Integration ***`)
      await io.flowBuilder.fill(
        selectors.basePagePO.INPUT_NAME_SELECTOR,
        "TC_IOT455 Integration"
      );
      await io.homePage.addStep(`*** Filled integration name ***`)
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.addStep(`*** Clicked on Save and Close ***`);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
      await io.homePage.addStep(`*** Clicked on Clone Integration label on Source Integration ***`)
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
      await io.homePage.addStep(`*** Clicked on Clone Integration Button on Source Integration ***`)
      await io.flowBuilder.click(selectors.basePagePO.INSTALL);
      await io.homePage.addStep(`*** Clicked on Install Integration Button on Source Integration ***`)
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
      await io.homePage.addStep(`*** Clicked on Clone Integration on Cloned Intgration ***`)
      await io.flowBuilder.fill(
        selectors.connectionsPagePO.NAME_INPUT,
        "GrandChildIntegration"
      );
      await io.homePage.addStep(`*** Filled GrandChildIntegration Name ***`)
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
      await io.homePage.addStep(`*** Clicked on Clone Integration Button on Cloned Integration ***`)
      await io.flowBuilder.click(selectors.basePagePO.INSTALL);
      await io.homePage.addStep(`*** Clicked on Install Integration Button on Cloned Integration ***`)
      await io.flowBuilder.loadingTime();
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Naviagated to Home page ***")
      await io.homePage.loadingTime();
      await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      await io.homePage.addStep("*** Waiting for home page Search Bar ***")
      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT455 Integration');
      await io.homePage.addStep("*** Searching for TC_IOT455 Integration ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.clickByTextByIndex("TC_IOT455 Integration", 0);
      await io.homePage.addStep("*** Clicked on Integration TC_IOT455 Integration ***")
      await io.homePage.loadingTime();
      await io.flowBuilder.clickByTextByIndex("Revisions", 0);
      await io.homePage.addStep("*** Clicked on Revisions Tab ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
      await io.homePage.addStep("*** Clicked on Create Pull ***")
      const isChildIntegrationNameDisplayed = await page.locator('text="Clone - TC_IOT455 Integration"').isVisible();
      const isGrandChildIntegrationNameDisplayed = await page.locator('text="GrandChildIntegration"').isVisible();
      expect(isChildIntegrationNameDisplayed).toBeTruthy();
      await io.homePage.addStep("*** Checking if cloned child integration displayed ***")
      expect(isGrandChildIntegrationNameDisplayed).toBeFalsy();
      await io.homePage.addStep("*** Checking if cloned grand child integration not displayed ***")
      await io.flowBuilder.clickButtonByIndex("Close", 0);
      await io.homePage.addStep("*** Closed Create Pull Dialog ***")
      await io.flowBuilder.loadingTime();
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Naviagated to Home page ***");
      await io.flowBuilder.loadingTime();
      await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      await io.homePage.addStep("*** Waiting for home page Search Bar ***");

      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT455 Integration');
      await io.homePage.addStep("*** Searching for TC_IOT455 Integration ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.clickByTextByIndex("TC_IOT455 Integration", 0);
      await io.homePage.addStep("*** Clicked on Integration TC_IOT455 Integration ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.homePage.addStep("*** Clicked on Delete Source Integration ***")
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.homePage.addStep("*** Clicked on Delete Button ***")

      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Naviagated to Home page ***");
      await io.flowBuilder.loadingTime();
      await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      await io.homePage.addStep("*** Waiting for home page Search Bar ***")
      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - TC_IOT455 Integration');
      await io.homePage.addStep("*** Searching for Clone - TC_IOT455 Integration ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.clickByTextByIndex("Clone - TC_IOT455 Integration", 0);
      await io.homePage.addStep("*** Clicked on Clone - TC_IOT455 Integration ***");
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.homePage.addStep("*** Clicked on Delete Cloned Integration ***");
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.homePage.addStep("*** Clicked on Delete Button ***")

      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Naviagated to Home page ***");
      await io.flowBuilder.loadingTime();
      await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      await io.homePage.addStep("*** Waiting for home page Search Bar ***")
      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'GrandChildIntegration');
      await io.homePage.addStep("*** Searching for GrandChildIntegration ***")
      await io.flowBuilder.clickByTextByIndex("GrandChildIntegration", 0);
      await io.homePage.addStep("*** Clicked on GrandChildIntegration ***")
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.homePage.addStep("*** Clicked on Delete GrandChildIntegration ***")
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.homePage.addStep("*** Clicked on Delete Button ***")
    }
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.addStep(`*** Clicked on Production Button ***`)
  });
});
