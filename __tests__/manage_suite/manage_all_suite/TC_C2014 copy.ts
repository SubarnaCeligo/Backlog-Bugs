import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_all.json";

 
test.describe(`C2014 Verify PG,PP-export&import created in account level manage user are shown up in list of "exports&imports" in that account.`, () => {
  test(`C2014 Verify PG,PP-export&import created in account level manage user are shown up in list of "exports&imports" in that account.`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(
      io.data.links.HOME_PAGE_URL
    );

    await io.homePage.clickByText("Automation Flows")
    await io.homePage.clickByText('Create flow')
    await io.homePage.click('[data-test="Add source"]')
    await io.homePage.click('[data-test="FTP"]')
    await io.homePage.click('#connections-dropdown')
    await io.homePage.clickByTextByIndex("FTP connection", 0)
    await io.homePage.click('[data-test="save"]')
    await io.homePage.waitForElementAttached('[name="/name"]')
    await io.exportsPage.fill('[name="/name"]', "test")
    await io.exportsPage.clickByTextByIndex("Please select",0)
    await io.exportsPage.clickByText("JSON")

    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/MyAccount/C733.json");
    await io.homePage.waitForElementAttached('[name="/ftp/directoryPath"]')
    await io.exportsPage.fill('[name="/ftp/directoryPath"]', "/user")

    await io.exportsPage.click('[data-test="saveAndClose"]')
    await io.exportsPage.clickByText("Resources")
    await io.exportsPage.clickByText("Exports")
    const exportText = await io.exportsPage.isVisible("text='test'")
    await io.assert.expectToBeTrue(exportText,"export is not created")
  });
});
