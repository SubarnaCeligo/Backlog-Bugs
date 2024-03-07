import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few.json";

 test.describe(`C21310 Tile level user is allowed to create a flow which uses an export or an import to which the user doesn't have access`, () => {
  test(`C21310 Tile level user is allowed to create a flow which uses an export or an import to which the user doesn't have access`, async ({
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
    await io.homePage.clickByTextByIndex("FTP CONNECTION", 0)
    await io.homePage.click(selectors.exportsPagePO.CHECK_EXISTING_EXPORT)
    const monitorExp = await io.homePage.isVisible("text='monitor export'")
    await io.assert.expectToBeValue(monitorExp.toString(), 'false', "Value is found")

  });
});
