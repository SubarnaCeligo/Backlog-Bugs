import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T10044 Verify Retry is working as expected for imports with asynchelper with flow branching", () => {
  test.beforeEach(async ({ io, page }) => {
    await io.homePage.addStep("Creating and running the flow");
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/FlowBuilder/TC_T10043.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await page
      .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
      .getByText("Amazon Connection")
      .first()
      .click();
    await io.homePage.addStep("Selected 'AMAZON CONNECTION' from dropdown");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await page
      .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
      .getByText("NETSUITE CONNECTION")
      .first()
      .click();
    await io.homePage.addStep("Selected 'NETSUITE CONNECTION' from dropdown");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON
    );
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.integrationPage.addStep("Deleting the flow")
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_T10044');
    await io.integrationPage.clickByTextByIndex('TC_T10044', 0);
    await io.integrationPage.clickByText('Branching flow');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

  test("@Priority-P2 @Zephyr-IO-T10044 @Env-All Verify Retry is working as expected for imports with asynchelper with flow branching", async ({ io, page }) => {
    await io.integrationPage.addStep("Navigating to the flow and enabling it");
    await io.integrationPage.clickByText("Branching flow");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);


    await io.homePage.addStep("Running the flow");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 600000 });

    await io.connectionPage.addStep("Verifying that the flow ran with errors");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(1) td:nth-child(5)', "Success");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(2) td:nth-child(5)', "1 error");

    await io.flowBuilder.addStep('Clicking page processor hook');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 0);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("Retrying the flow");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ERROR_BUBBLE);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL_OPTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB);
    await page.getByText("Retry completed.")
      .first()
      .waitFor({ state: "visible", timeout: 600000 });
    await io.assert.verifyElementTextByIndex('tbody tr:nth-child(1) td:nth-child(7)', "Success", 1);
  });
});