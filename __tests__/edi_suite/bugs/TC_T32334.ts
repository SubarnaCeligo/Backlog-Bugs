import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FDR from "@testData/edi_suite/Generic_Export_997.json"

test.describe("@Author-Shriti S TC_T32334-Verify that sample data is retained after saving an EDI X12 export", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Bug-IO-79128 @Env-All @Priority-P2 @Zephyr-IO-T32334 Verify that sample data is retained after saving an EDI X12 export", async ({ io, page }) => {
    //Go to Flow Builder
    await io.homePage.goToMenu("Tools", "Flow builder");

    //Add Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    //Search and select an application
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.FTP_IMPORT);
    await io.flowBuilder.click(selectors.importPagePO.FTP_IMPORT);
   

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    //Enter name and select connection
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
    await io.exportsPage.fill(selectors.importPagePO.NAME, 'FA Save test');
    await io.exportsPage.loadingTime();

    await io.exportsPage.waitForElementAttached(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "FTP CONNECTION");
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

    //select EDI file
    await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
    await io.exportsPage.clickByTextByIndex('AA_EDI_AUTOMATION_DND', 0);

     //Select Parsing def
     await io.exportsPage.fill(selectors.exportsPagePO.PARSING_DEF_SEARCHBOX, 'Generic-005010-997-Functional Acknowledgment');
     await io.exportsPage.loadingTime();
     await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);
     await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
     await io.exportsPage.loadingTime();

     //Open parser helper
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSER_HELPER);
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSER_HELPER, 1);
    await io.homePage.loadingTime();

    // Locate the textarea
    const textarea = await page.$(selectors.flowBuilderPagePO.RULE);

    if (textarea) {
      // Click the textarea to focus on it
      await textarea.click();

      // Select all text and delete it
      await io.homePage.loadingTime();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
    }
    //Add new FDR
    await io.homePage.loadingTime();
    await io.exportsPage.fill(selectors.flowBuilderPagePO.FDR_TEXTAREA, JSON.stringify(FDR));
    await io.homePage.loadingTime();

    //Fill sample data
    await io.exportsPage.fill(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA, '{"TestSampleData"}');
    await io.exportsPage.clickByTextByIndex('Save & close', 1);

    //  // Parser helper
    // await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSER_HELPER, 1);
    // await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA);
    // await io.exportsPage.fill(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA, '{"TestSampleData"}');

    // await io.exportsPage.clickByTextByIndex('Save & close', 1);

    await io.exportsPage.waitForElementAttached(selectors.basePagePO.FTP_DIRECTORY_PATH);
    await io.exportsPage.fill(selectors.basePagePO.FTP_DIRECTORY_PATH, '/test');
    await io.exportsPage.loadingTime();
    //Save
    await io.exportsPage.clickByTextByIndex('Save & close', 0);

    await io.exportsPage.loadingTime();
    //reopen in edit mode
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);

    // Parser helper
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSER_HELPER);
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSER_HELPER, 1);

    //Get sample data
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA);
    let sampleData =  (await io.exportsPage.getText(selectors.exportsPagePO.SAMPLE_DATA_CONTENTS)).toString();
    await io.assert.expectToContainValue(sampleData, '<SampleData·to·be·uploaded·here>{\"TestSampleData\"}¶', 'Sample data is not saved');

  });
});