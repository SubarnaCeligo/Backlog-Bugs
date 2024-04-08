import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_few_manage_few.json";

test.describe(`C1569 Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, () => {
  test(`C1569 Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.loadingTime()
    await io.homePage.clickByText('Create flow')
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION)
    await io.flowBuilder.clickByText("Create from scratch");
    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'FTP CONNECTION');
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    const monitorExp = await io.homePage.isVisible("text='FTP CONNECTION'")
    await io.homePage.addStep("FTP CONNECTION is present in both monitor and manage accese integrations");
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found")
  });
});
