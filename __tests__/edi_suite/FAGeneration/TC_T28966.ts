import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S TC_T28966-Verify that 'Send functional acknowledgement' checkbox not shown for file types other than EDI X12.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-36129 @Env-All @Priority-P2 @Zephyr-IO-T28966 Verify that 'Send functional acknowledgement' checkbox not shown for file types other than EDI X12.", async ({ io, page }) => {
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

    //Select File type as JSON
    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.flowBuilderPagePO.JSON);

    let isFACheckboxDisplayed = await io.flowBuilder.isVisible(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT);
    await io.assert.expectToBeFalse(isFACheckboxDisplayed, 'FA checkbox is visible for non-EDIX12 file types');

   
  });
});