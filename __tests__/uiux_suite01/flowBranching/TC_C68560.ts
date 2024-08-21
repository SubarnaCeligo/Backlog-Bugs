import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testdata from "./testdata.json";

test.describe(`C68560 Verify user is upload the ntegration zip file having one linear flow in the template and able to install the template`, () => {
  test.describe.configure({ retries: 0 })
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    const res = await io.api.deleteCall(`v1/flows/${testdata.secondString}`);
    const res2 = await io.api.deleteCall(
      `v1/integrations/${testdata.firstString}`
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN,"C68560_Automation" );
    await io.homePage.loadingTime();

    //Unpublish the template
    let isPublished = await io.homePage.isVisible(selectors.basePagePO.FLAG);
    if(isPublished){
      await io.homePage.click(selectors.basePagePO.TEMPLATE_PUBLISH_UNPUBLISH);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.integrationPagePO.UNPUBLISH);
      await io.homePage.loadingTime();
    }
  });
//Skipped this test case as we don't have creds for the connection and the tracker is : https://celigo.atlassian.net/browse/IOAUT-15782
  test(`@Env-All @Zephyr-IO-T17461 C68560 Verify user is upload the ntegration zip file having one linear flow in the template and able to install the template`, async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN,"C68560_Automation" );
    await io.homePage.waitForElementAttached(
      `:has-text("C68560_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click(
      `tbody tr:has-text("C68560_Automation") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click('[data-test="uploadTemplateZip"]');
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/inputData/Templates/C68560_NEW.zip");
    await io.homePage.loadingTime();
   
    //Publish the template
    let isPublished = await io.homePage.isVisible(selectors.basePagePO.FLAG);
    if(!isPublished){
      await io.homePage.click(selectors.basePagePO.TEMPLATE_PUBLISH_UNPUBLISH);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.integrationPagePO.PUBLISH);
    await io.homePage.loadingTime();
    //Verify that toggle is checked
    await io.assert.verifyElementAttributeContainsText(selectors.basePagePO.TEMPLATE_TOGGLE,'class', 'react-toggle--checked');
    }

    //Go to marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await io.homePage.reloadPage();
    await io.marketplacePage.fill(
      selectors.marketplacePagePO.SEARCH_MARKETPLACE,
      "C68560_Automation"
    );
    await io.homePage.loadingTime();
    await io.marketplacePage.waitForElementAttached(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.marketplacePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.marketplacePage.clickByText("Install now");
    await io.marketplacePage.waitForElementAttached(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );

    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId)
    await io.connectionPage.click(selectors.basePagePO.SAVE);

    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.loadingTime();

    //Verify if the flow is installed
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.integrationPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
    (await io.integrationPage.findElementByDataTest("editFlow")).click();

    //get num of bubbles
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    let bubbles = await page.$$(selectors.flowBuilderPagePO.TRANSFER);
    await io.assert.expectToBeValue((bubbles.length).toString(), "2", 'Template is not fully installed')

   
  });
});
