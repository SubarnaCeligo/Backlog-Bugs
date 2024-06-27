import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('IO-T17324 Verify the complex flow which have 3 to 5 routers and mutiple branches', () => {
  test.beforeEach(async ({ io, page }) => {
    await io.homePage.addStep("Creating and running the flow");
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/flowbranching/TC_T17324.zip");
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
    await io.integrationPage.clickByText('Branching flow');
  });
  test.afterEach(async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.integrationPage.addStep("Deleting the flow")
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'T17324');
    await io.integrationPage.clickByTextByIndex('T17324', 0);
    await io.integrationPage.clickByText('Branching flow');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
  test('@Priority-P2 @Zephyr-IO-T17324 @Env-All Verify the complex flow which have 3 to 5 routers and mutiple branches', async ({ io, page }) => {
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    await io.flowBuilder.addStep("Unmerge the first branch");
    await io.flowBuilder.clickByIndex(selectors.flowBranchingPO.UNMERGE_BRANCHING, 0);
    await io.homePage.loadingTime();
    await io.flowBuilder.getByRoleClick('menuitem', 'Unmerge branch');
    await io.homePage.loadingTime();

    await io.flowBuilder.addStep("Unmerge the second branch");
    await io.flowBuilder.clickByIndex(selectors.flowBranchingPO.UNMERGE_BRANCHING, 0);
    await io.homePage.loadingTime();
    await io.flowBuilder.getByRoleClick('menuitem', 'Unmerge branch');
    await io.homePage.loadingTime();

    await io.flowBuilder.addStep("Unmerge the third branch");
    await io.flowBuilder.clickByIndex(selectors.flowBranchingPO.UNMERGE_BRANCHING, 0);
    await io.homePage.loadingTime();
    await io.flowBuilder.getByRoleClick('menuitem', 'Unmerge branch');
    await io.homePage.loadingTime();

    await io.flowBuilder.addStep("Successfully unmerged all the branches with multiple routers");
  });
});