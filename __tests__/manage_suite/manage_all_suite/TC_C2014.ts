import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_all.json";


test.describe(`C2014 Verify PG,PP-export&import created in account level manage user are shown up in list of "exports&imports" in that account.`, () => {
  test(`@Env-All @Zephyr-IO-T6916 C2014 Verify PG,PP-export&import created in account level manage user are shown up in list of "exports&imports" in that account.`, async ({
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
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
    await io.homePage.clickByText("Automation Flows");
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    await io.homePage.clickByTextByIndex('FTP CONNECTION', 0);
    await io.homePage.click(selectors.basePagePO.SAVE)
    await io.homePage.waitForElementAttached(selectors.importPagePO.NAME)
    await io.exportsPage.fill(selectors.importPagePO.NAME, "test");
    await io.exportsPage.clickByTextByIndex("Please select", 0);
    await io.exportsPage.clickByText("JSON");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/MyAccount/C733.json");
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.FTP_DIRECTORY_PATH)
    await io.exportsPage.fill(selectors.basePagePO.FTP_DIRECTORY_PATH, "/user")
    await io.homePage.loadingTime();
    await io.exportsPage.click(selectors.basePagePO.SAVE_AND_CLOSE)
    await io.exportsPage.clickByText("Resources")
    await io.exportsPage.clickByText("Exports")
    await io.homePage.loadingTime();
    const exportText = await io.exportsPage.isVisible("text='test'")
    await io.assert.expectToBeTrue(exportText, "export is not created")
  });
});
