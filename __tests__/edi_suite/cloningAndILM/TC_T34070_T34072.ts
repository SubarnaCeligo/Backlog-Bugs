import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FDR from "@testData/edi_suite/FDR.json"

test.describe("@Author-Shriti S Verify able to pull on source integration when FTP/AS2 EDI X12 export is updated with _postParseListenerId on clone integration in Production", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Env-All @Epic-IO-59196 @Priority-P2 @Zephyr-IO-T34070 Verify able to pull on source integration when FTP/AS2 EDI X12 export is updated with _postParseListenerId on clone integration in Production", async ({ io, page }) => {
    //Go to Home Page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FA_ReveresePullTest_DND");
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);

    //Clone the integration
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.loadingTime();

    //Input name
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT,'FARevPullTest_ToBeDeleted');

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

    //Update listner in source flow
    //Go to Home Page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FARevPullTest_ToBeDeleted");
    await io.homePage.loadingTime();
    

    await io.integrationPage.clickByIndex(selectors.homePagePO.INTEGRATION_NAME, 0);
    await io.integrationPage.clickByText('MainFlow_RevPull_DND');
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATORS);

    //Update the listener and save
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_LISTENER_DROPDOWN);
    await io.exportsPage.click(selectors.exportsPagePO.FA_LISTENER_DROPDOWN);
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_LISTENER_DRODOWN_LISTBOX);
    await io.exportsPage.clickByText('RevPullTest_Listener_Updated');
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
   
    await io.exportsPage.clickByText('Save & close');
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    //Create a pull in source integration
    //search for the integration
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FA_ReveresePullTest_DND");
    await io.homePage.loadingTime();
  
    //Go to Revisions
    await io.integrationPage.clickByIndex(selectors.homePagePO.INTEGRATION_NAME, 0);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.REVISIONS);
    await io.integrationPage.click(selectors.integrationPagePO.REVISIONS);

    await io.integrationPage.click(selectors.integrationPagePO.CREATE_PULL);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.ILM_PULL_NAME);
    await io.integrationPage.fill(selectors.integrationPagePO.ILM_PULL_NAME, "Pull Listener Changes");

    await io.integrationPage.loadingTime();
    await io.integrationPage.clickByText('FARevPullTest_ToBeDeleted'); 
    await io.integrationPage.click(selectors.integrationPagePO.NEXT);
    await io.integrationPage.loadingTime();
    await io.integrationPage.getByRoleClick("button", "Next");
    await io.integrationPage.loadingTime();
    await io.integrationPage.click(selectors.integrationPagePO.MERGE);
    await io.integrationPage.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR);

    //Go to main flow
    await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);
    await io.homePage.click(selectors.templatePagePO.FLOWS);
    await io.homePage.loadingTime();
    await io.integrationPage.clickByText('MainFlow_RevPull_DND');
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATORS);

    //Update the listener and save
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_LISTENER_DROPDOWN);
    let updatedListener =  (await io.exportsPage.getText(selectors.exportsPagePO.FA_LISTENER_DROPDOWN)).toString();
    await io.assert.expectToContainValue('RevPullTest_Listener_Updated', updatedListener, 'Listener not updated after pull');

  });

  test.afterEach(async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //Update the listener back to original
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FA_ReveresePullTest_DND");
    await io.homePage.loadingTime();
    
    await io.integrationPage.clickByIndex(selectors.homePagePO.INTEGRATION_NAME, 0);
    await io.integrationPage.clickByText('MainFlow_RevPull_DND');
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATORS);

    //Update the listener and save
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_LISTENER_DROPDOWN);
    await io.exportsPage.click(selectors.exportsPagePO.FA_LISTENER_DROPDOWN);
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_LISTENER_DRODOWN_LISTBOX);
    await io.exportsPage.clickByTextByIndex("RevPullTest_Listener_Original",0);
    await io.homePage.loadingTime();
    await io.exportsPage.clickByText('Save & close');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.homePage.loadingTime();

    //search for the integration
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FARevPullTest_ToBeDeleted");
    await io.homePage.loadingTime();

    await io.homePage.clickByTextByIndex('FARevPullTest_ToBeDeleted', 0);
    await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);
    await io.homePage.loadingTime();

    //Delete the flows inside the integration
    await io.integrationPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 3);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

    await io.integrationPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    
    await io.homePage.loadingTime();
    await io.integrationPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);

    //Delete cloned integration
    await io.homePage.loadingTime();
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.integrationPage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.integrationPage.waitForElementAttached(selectors.basePagePO.DELETE_BUTTON);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

});