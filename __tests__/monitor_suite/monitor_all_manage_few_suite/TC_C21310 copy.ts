import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./monitor_all_manage_few.json";

 
 
 
test.describe(`C21310 Verify Connections and Exports & Imports of monitored tiles should not be displayed while creating flows in the managed tile`, () => {
  test(`C21310 Verify Connections and Exports & Imports of monitored tiles should not be displayed while creating flows in the managed tile`, async ({
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
    await io.homePage.click('[data-test="Add source"]')
    await io.homePage.click('[data-test="FTP"]')
    await io.homePage.click('#connections-dropdown')
    await io.homePage.clickByTextByIndex("FTP connection", 0)
    await io.homePage.click('[name="checkExistingExport"]')
    await page.pause()
    const monitorExp = await io.homePage.isVisible("text='AutomationStandalone_Uw3YN'")
    await io.assert.expectToBeValue(monitorExp.toString(), 'false', "Value is found")

  });
});
