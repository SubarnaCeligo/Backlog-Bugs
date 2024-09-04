import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Zephyr-IO-T17166 @ENV-All @Priority-P2 To verify conflict message is displayed under each resource in the review changes panel", () => {
  test.beforeEach(async ({ io, page }) => {
    await io.homePage.addStep("Creating the integration");
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/FlowBuilder/TC_T17166.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("HTTP ZENDESK CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    await io.homePage.addStep("Selected 'HTTP ZENDESK CONNECTION' from dropdown");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON
    );
    await io.homePage.loadingTime();

    await io.homePage.addStep("Cloning the flow");
    await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);

    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap2 = await io.api.loadConnections();
    var connId2 = connMap2.get("HTTP ZENDESK CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId2);
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.loadingTime();
  });
  test.afterEach(async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.integrationPage.addStep("Deleting the flow")
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'T17166');
    await io.integrationPage.clickByTextByIndex('T17166', 0);
    await io.integrationPage.clickByText('Flow name');
    await io.integrationPage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.integrationPage.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.integrationPage.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

    await io.integrationPage.addStep("Deleting the cloned flow")
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - T17166');
    await io.integrationPage.clickByTextByIndex('Clone - T17166', 0);
    await io.integrationPage.clickByText('Flow name');
    await io.integrationPage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.integrationPage.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.integrationPage.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
  test("@Priority-P2 @Zephyr-IO-T17166 @Env-All To verify conflict message is displayed under each resource in the review changes panel", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.flowBuilder.addStep("modify resources in the cloned integration");
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - T17166');
    await io.integrationPage.clickByTextByIndex('Clone - T17166', 0);
    await io.flowBuilder.clickByText('Flow name');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.fill(selectors.basePagePO.DESCRIPTION_AREA, "Flow description 2");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.fill(selectors.basePagePO.DESCRIPTION_INPUT, "Export description 2");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.fill(selectors.basePagePO.DESCRIPTION_INPUT, "Import description 2");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();


    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.flowBuilder.addStep("modify resources in the origin integration");
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'T17166');
    await io.flowBuilder.clickByTextByIndex('T17166', 0);
    await io.flowBuilder.clickByText('Flow name');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.fill(selectors.basePagePO.DESCRIPTION_AREA, "Flow description 1");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.fill(selectors.basePagePO.DESCRIPTION_INPUT, "Export description 1");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.fill(selectors.basePagePO.DESCRIPTION_INPUT, "Import description 1");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();

    await io.integrationPage.addStep("Open the review changes panel and check for conflict message");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);
    await io.integrationPage.clickByTextByIndex("Revisions", 0);
    await io.integrationPage.click(selectors.integrationPagePO.CREATE_PULL);
    await io.integrationPage.fill(selectors.basePagePO.DESCRIPTION_INPUT, "Pull request description");
    await io.integrationPage.clickByTextByIndex("Clone - T17166", 0);
    await io.integrationPage.click(selectors.integrationPagePO.NEXT);
    await io.integrationPage.loadingTime();
    await io.integrationPage.clickByText("Expand all");
    await io.assert.verifyElementDisplayedByText(
      "3 conflicts",
      "The conflicts are not shown correctly"
    );
  });
});