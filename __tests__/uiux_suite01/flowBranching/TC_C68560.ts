import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testdata from "./testdata.json";

test.describe(`C68560 Verify user is upload the ntegration zip file having one linear flow in the template and able to install the template`, () => {
  test.describe.configure({ retries: 1 })
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    const res = await io.api.deleteCall(`v1/flows/${testdata.secondString}`);
    const res2 = await io.api.deleteCall(
      `v1/integrations/${testdata.firstString}`
    );
  });
//Skipped this test case as we don't have creds for the connection and the tracker is : https://celigo.atlassian.net/browse/IOAUT-15782
  test.skip(`@Env-All @Zephyr-IO-T17461 C68560 Verify user is upload the ntegration zip file having one linear flow in the template and able to install the template`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Resources");
    await io.homePage.clickByText("Templates");
    await io.homePage.waitForElementAttached(
      `:has-text("temp2_DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.click(
      `tbody tr:has-text("temp2_DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`
    );
    await io.homePage.clickByText("Upload template zip");
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/inputData/Templates/C68650copy.zip");
    await io.homePage.clickByText("Marketplace");
    await io.marketplacePage.fill(
      '[placeholder="Search marketplace"]',
      "temp2_DND"
    );
    await io.marketplacePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.marketplacePage.clickByText("Install now");
    await io.marketplacePage.waitForElementAttached(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON,
      0
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await page
      .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
      .getByText("BOX CONNECTION")
      .click();
    await io.connectionPage.click(selectors.basePagePO.SAVE);

    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId)
    await io.connectionPage.click(selectors.basePagePO.SAVE);

    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.loadingTime()
    await io.homePage.click("//a[contains(text(), 'TC100370_FTP_TO_FTP')]");
    const linkUrl = await page.url();
    const match = linkUrl.match(/\/integrations\/(\w+)\/flowBuilder\/(\w+)/);
    testdata.firstString = match[1];
    testdata.secondString = match[2];

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "TC100370_FTP_TO_FTP"
    );
    //Commenting below code as per the BUG https://celigo.atlassian.net/browse/IO-78629 
    // only integration would be shown not the flows in home page, this is expected behaviour
    
    // await io.homePage.waitForElementAttached("text='TC100370_FTP_TO_FTP'");
    // const flow = await io.homePage.isVisible("text='TC100370_FTP_TO_FTP'");
    // await io.assert.expectToBeValue(
    //   flow.toString(),
    //   "true",
    //   "Template flow not found"
    // );
  });
});
