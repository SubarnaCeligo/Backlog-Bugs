import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few.json";

test.describe(`@Author-ashu-g TC_C23450 Trying to create a connection at the export/import step is not working for integration with manage permissions`, () => {
   test.afterEach(async ({ io }) => {
    await io.connections.deleteConnection('Zendesk Manage Connection TC_C23450');
  });

  test(`@Bug-IO-19381 @Priority-P2 @Zephyr-IO-T4706 @Env-QA TC_C23450 Trying to create a connection at the export/import step is not working for integration with manage permissions`, async ({
    io
  }) => {
    // update the ashare with right permissions
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );

    // navigate to integration with manage access and create new source
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
    await io.homePage.clickByText('Automation Flows');
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "Zendesk");
    await io.homePage.clickByText('Zendesk');
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    
    // create new dummy connection
    await io.homePage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.homePage.fillByIndex(selectors.basePagePO.NAME, 'Zendesk Manage Connection TC_C23450', 1);
    await io.homePage.click(selectors.flowBuilderPagePO.ZENDESKSUPPORT);
    await io.homePage.fill(selectors.connectionsPagePO.ZENDESK_SUBDOMAIN, 'celigoqa');
    await io.homePage.fill(selectors.connectionsPagePO.USERNAME, 'username');
    await io.homePage.fill(selectors.connectionsPagePO.PASSWORD, 'test');
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();

    // close export and open again to verify connection is available in dropdown
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "Zendesk");
    await io.homePage.clickByText('Zendesk');
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "Zendesk Manage Connection TC_C23450");
    const manageConn = await io.homePage.isVisible(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.assert.expectToBeValue(manageConn.toString(), 'true', "Connection not found")
  });
});