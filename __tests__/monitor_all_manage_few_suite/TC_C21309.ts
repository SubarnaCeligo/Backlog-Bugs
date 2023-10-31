import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./monitor_all_manage_few.json";

 
test.describe(`C21309 Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, () => {
  test(`C21309 Verify the connections of a monitored tiles should not be listed while creating new flow under manage tile.`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    console.log(res)
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText('Automation Flows')
    await io.homePage.clickByText('Create flow')
    await io.homePage.click('[data-test="Add source"]')
    await io.homePage.click('[data-test="FTP"]')
    await io.homePage.click('#connections-dropdown')
    const monitorExp = await io.homePage.isVisible("text='MONITOR CONNECTION'")
    await io.assert.expectToBeValue(monitorExp.toString(), 'false', "Value is found")
    

  });
});