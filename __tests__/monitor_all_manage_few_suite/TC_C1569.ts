import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./monitor_all_manage_few.json";

test.describe(`C1569 Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, () => {
  test(`C21309Verify If same document is under two integrations with different access levels then the higher access level will take precedence`, async ({
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
    const monitorExp = await io.homePage.isVisible("text='FTP CONNECTION'")
    await io.homePage.addStep("FTP CONNECTION is present in both monitor and manage accese integrations");
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found")
    

  });
});