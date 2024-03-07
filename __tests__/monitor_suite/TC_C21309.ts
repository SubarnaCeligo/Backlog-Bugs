import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few.json";


test.describe(`C21309 Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, () => {
  test(`C21309 Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, async ({
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
    const monitorExp = await io.homePage.isVisible("text='MONITOR CONNECTION'")
    await io.assert.expectToBeValue(monitorExp.toString(), 'false', "Value is found")
  });
});