import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(`TC_C41573 To verify Pull from Integration dropdown field doesn't lists the grand child clone integrations present in both production and sandbox account(Admin access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T454 @Env-All C41573 To verify Pull from Integration dropdown field doesn't lists the grand child clone integrations present in both production and sandbox account(Admin access)`, async ({
    page,
    io
  }, test) => {
    let env = "Production,Sandbox";
    let environment = env.split(",");
    for (let i = 0; i < environment.length; i++) {
      await io.flowBuilder.clickByTextByIndex(environment[i], 0);
      await io.flowBuilder.clickByText("Create");
      await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
      await io.flowBuilder.fill(
        selectors.basePagePO.INPUT_NAME_SELECTOR,
        "TC_C41573 Integration"
      );
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
      await io.flowBuilder.click(selectors.basePagePO.INSTALL);
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
      await io.flowBuilder.fill(
        selectors.connectionsPagePO.NAME_INPUT,
        "Clone TC_C41573 Integration"
      );
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
      await io.flowBuilder.click(selectors.basePagePO.INSTALL);
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
      await io.flowBuilder.fill(
        selectors.connectionsPagePO.NAME_INPUT,
        "GrandChildIntegration"
      );
      await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
      await io.flowBuilder.click(selectors.basePagePO.INSTALL);
      await io.flowBuilder.clickByTextByIndex("Revisions", 0);
      await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
      const isChildIntegrationNameDisplayed = await io.flowBuilder.isVisible(
        'text="Clone TC_C41573 Integration"'
      );
      await io.assert.expectToBeTrue(
        isChildIntegrationNameDisplayed,
        "Child Integration Name is not displayed"
      );
      await io.flowBuilder.clickButtonByIndex("Close", 0);
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.flowBuilder.clickByText("TC_C41573 Integration");
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.flowBuilder.clickByText("Clone TC_C41573 Integration");
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.flowBuilder.clickByText("GrandChildIntegration");
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
    }
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
  });
});
