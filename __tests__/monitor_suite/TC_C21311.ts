import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few.json";

 
 
test.describe(`C21311 Verify Connections and Exports & Imports of monitored tiles should not be displayed while creating flows in the managed tile`, () => {
  test(`C21311 Verify Connections and Exports & Imports of monitored tiles should not be displayed while creating flows in the managed tile`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText('Automation Flows')
    await io.homePage.clickByText('Create flow')
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION)
    await io.homePage.click(selectors.basePagePO.CONNECTION_DROPDOWN)
    await io.homePage.clickByTextByIndex("FTP connection", 0)
    await io.homePage.click(selectors.exportsPagePO.CHECK_EXISTING_EXPORT)
    const monitorExp = await io.homePage.isVisible("text='FTP'")
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found")
    

  });
});