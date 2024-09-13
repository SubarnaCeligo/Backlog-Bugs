import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FDR from "@testData/edi_suite/FDR.json"

test.describe("@Author-Shriti S Verify that EDI export can be saved after changing the name on clone integration.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    //Cleanup
    let integrationID = await io.api.getIntegrationId('FACloneTest_ToBeDeleted_renameExport');
    let flows = await io.api.getAllFlowsInIntegration(integrationID);

    if (flows && Array.isArray(flows) && flows.length > 0) {
      const flowIDs = flows
        .map(flowID => flowID?._id) 
        .filter(flowID => flowID !== undefined); 

      flowIDs.forEach(flowID => {
        if (flowID) { 
          io.api.deleteFlowsWithId(flowID);
        }
      });
    }

    // Delete integration
    if (integrationID) {
      await io.api.deleteIntegration(integrationID);
    }
    await io.homePage.reloadPage();


  });
  test("@Env-All @Epic-IO-59196 @Priority-P2 @Zephyr-IO-T34068 Verify that EDI export can be saved after changing the name on clone integration.", async ({ io, page }) => {
    //Go to Home Page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FA_CloneTest_DND");
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);

    //Clone the integration
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.loadingTime();

    //Input name
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FACloneTest_ToBeDeleted_renameExport');

    //Clone
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);

    //Configure connection
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.homePage.loadingTime();
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);

    //Save
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.INSTALL);
    await io.homePage.click(selectors.basePagePO.INSTALL);

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);

    //Open cloned flow
    await io.flowBuilder.clickByText('MainFlow_DND');

    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATORS);

    //Rename the export
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
    await io.exportsPage.fill(selectors.importPagePO.NAME, "Updated_Export_Name");

    await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });
    await io.exportsPage.clickByText('Save & close');
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttribute(selectors.importPagePO.NAME, "value", "Updated_Export_Name");

  });

  test.afterEach(async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    //Cleanup
    let integrationID = await io.api.getIntegrationId('FACloneTest_ToBeDeleted_renameExport');
    let flows = await io.api.getAllFlowsInIntegration(integrationID);

    if (flows && Array.isArray(flows) && flows.length > 0) {
      const flowIDs = flows
        .map(flowID => flowID?._id) 
        .filter(flowID => flowID !== undefined); 

      flowIDs.forEach(flowID => {
        if (flowID) { 
          io.api.deleteFlowsWithId(flowID);
        }
      });
    }
    // Delete integration
    if (integrationID) {
      await io.api.deleteIntegration(integrationID);
    }
    await io.homePage.reloadPage();

  });

});