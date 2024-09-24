import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C32362 Verify cloned integration has the updated flow after updating the settings`, () => {
  test(`@Env-All @Zephyr-IO-T5337 C32362 Verify cloned integration has the updated flow after updating the settings`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
   
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "C32362_DND")
    await io.homePage.clickByTextByIndex("C32362_DND", 0);
    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.clickByText("Clone flow");
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Clone_C32362');
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.selectTextfromDropDown(page, process.env.IO_Integration_ID);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.homePage.selectTextfromDropDown(page, connId)
    await io.homePage.addStep("Selected connection from dropdown");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    connId = connMap.get("NETSUITE CONNECTION");
    await io.homePage.selectTextfromDropDown(page, connId)
    await io.homePage.addStep("Selected connection from dropdown");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    connId = connMap.get("Salesforce Connection");
    await io.homePage.selectTextfromDropDown(page, connId)
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Clone_C32362")
    await io.homePage.clickByTextByIndex("Clone_C32362", 0);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.assert.verifyElementDisplayedByText(
      "NETSUITE CONNECTION",
      "NETSUITE CONNECTION step is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "FTP CONNECTION",
      "FTP connection step is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Salesforce Connection",
      "Salesforce Connection step is not displayed"
    );
  });
});
