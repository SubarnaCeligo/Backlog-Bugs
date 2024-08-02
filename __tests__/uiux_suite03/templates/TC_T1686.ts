import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T1686 To verify user is able to install SAP Ariba template @author_Kaushik UI_Backlog", () => {
  test("@Env-All T1686 To verify user is able to install SAP Ariba template @author_Kaushik UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.homePage.addStep("Select template from marketplace")
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
    await io.homePage.goToMenu("Marketplace");
    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'TC_T1686_DND');
    await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.homePage.clickByText("Install now");

    await io.homePage.addStep("Installing the template")
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await page
      .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
      .getByText("FTP CONNECTION")
      .first()
      .click();
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON
    );

    await io.homePage.addStep("Verify if the sap ariba listener is installed")
    await io.flowBuilder.clickByText('TC_T1686');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);

    const name = await page
      .locator(selectors.connectionsPagePO.NAME_INPUT)
      .evaluate((el: HTMLInputElement) => el.value);

    await io.assert.expectToBeValue("SAP Ariba listener", name, "Name value is incorrect");

    await io.homePage.addStep("Clear the template");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
});