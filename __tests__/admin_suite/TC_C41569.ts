import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41569 To verify Pull from Integration dropdown field lists all the child clone integrations present in both production and sandbox account(Account Owner)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteIntegrationRecursively("TC_C41569 Integration");
    await io.api.deleteIntegrationRecursively("Clone - TC_C41569 Integration");
    await io.api.deleteIntegrationRecursively("TC_C41569 Child Integration");
  });
  test(`@Zephyr-IO-T450 @Env-All C41569 To verify Pull from Integration dropdown field lists all the child clone integrations present in both production and sandbox account(Account Owner)`, async ({
    page,
    io
  }, test) => {
    // In Production
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Create");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "TC_C41569 Integration");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C41569 Child Integration");
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.clickByTextByIndex("Revisions", 0);
    await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
    const isChildIntegrationNameDisplayed = await io.flowBuilder.isVisible(
      'text="Clone - TC_C41569 Integration"'
    );
    await io.assert.expectToBeTrue(
      isChildIntegrationNameDisplayed,
      "Child Integration Name is not displayed"
    );
    await io.flowBuilder.clickButtonByIndex("Close", 0);
    await io.flowBuilder.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'TC_C41569 Integration');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("TC_C41569 Integration", 0);
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'TC_C41569 Child Integration');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("TC_C41569 Child Integration", 0);
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'Clone - TC_C41569 Integration');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Clone - TC_C41569 Integration", 0);
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.flowBuilder.loadingTime();

    // In SandBox
    await io.flowBuilder.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Create");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "TC_C41569 Integration"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      "TC_C41569 Child Integration"
    );
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.clickByTextByIndex("Revisions", 0);
    await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
    await io.assert.expectToBeTrue(
      isChildIntegrationNameDisplayed,
      "Child Integration Name is not displayed"
    );
    await io.flowBuilder.clickButtonByIndex("Close", 0);
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'TC_C41569 Integration');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("TC_C41569 Integration", 0);
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'TC_C41569 Child Integration');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("TC_C41569 Child Integration", 0);
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'Clone - TC_C41569 Integration');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Clone - TC_C41569 Integration", 0);
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.flowBuilder.loadingTime();
  });
});
