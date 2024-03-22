import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`T10043 Verify Retry is working as expected for imports with asynchelper Orchestration flow(Multiple PPs) @author_Kaushik UI_Backlog`, () => {
  test(`T10043 Verify Retry is working as expected for imports with asynchelper Orchestration flow(Multiple PPs) @author_Kaushik UI_Backlog`, async ({ io, page }) => {
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
      .getByText("AMAZON SELLER CENTRAL CONNECTION")
      .first()
      .click();
    await io.homePage.addStep("Selected 'AMAZON SELLER CENTRAL CONNECTION' from dropdown");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON
    );
    await io.homePage.loadingTime();

    await io.homePage.addStep("Running the flow");
    await io.homePage.clickByText("async export n import");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 600000 });


    await io.connectionPage.addStep("Verifying that the flow ran with errors");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(1) td:nth-child(5)', "Success");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(2) td:nth-child(5)', "errors");
    await io.flowBuilder.click('[data-test="Import"]');
    await io.exportsPage.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, '/feeds/2021-06-30/documents');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("Retrying the flow");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL_OPTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB);
    await page.getByText("Retry completed.")
      .first()
      .waitFor({ state: "visible", timeout: 600000 });
    await io.assert.verifyElementTextByIndex('tbody tr:nth-child(1) td:nth-child(7)', "Success", 1);

    await io.flowBuilder.addStep("Deleting the flow")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
});