import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T6094 To verify create/edit flow group pages and its fields are not broken in different browsers", () => {
  test.beforeEach(async ({ io, page }) => {
    await io.homePage.addStep("Creating the integration");
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/FlowBuilder/TC_T6094.zip");
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
  });
  test.afterEach(async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.integrationPage.addStep("Deleting the flow")
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Testing');
    await io.integrationPage.clickByTextByIndex('Automation Testing', 0);
    await io.integrationPage.clickByText('IO-T6094');
    await io.integrationPage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.integrationPage.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.integrationPage.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
  test("@Priority-P2 @Zephyr-IO-T6094 @Env-All To verify create/edit flow group pages and its fields are not broken in different browsers", async ({ io, page }) => {
    await io.flowBuilder.addStep("Creating the flow group");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME, 'Flow group 1');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex('Flow group 1', 0);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("Editing the flow group");
    // await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
    // await io.flowBuilder.click(selectors.flowGroupingPagePO.EDIT_FG);
    // await io.flowBuilder.clickByTextByIndex("Delete flow group", 0);
    // await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_DELETE);
    // await io.flowBuilder.loadingTime();
    // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
  });
});