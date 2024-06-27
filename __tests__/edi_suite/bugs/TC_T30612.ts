import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S T30612-[EDI] Verify that error message at file preview step is properly formatted", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Bug-IO-72773 @Env-All @Priority-P2 @Zephyr-IO-30612 [EDI] Verify that error message at file preview step is properly formatted", async ({ io, page }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Bug_IO_72773_DND');
    
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open DND flow
    await io.integrationPage.clickByTextByIndex('Bug_IO_72773_DND', 0);

    //wait for flow to load
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
    await io.exportsPage.loadingTime();

    //Preview
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.CLICKPREVIEW);
    await io.exportsPage.click(selectors.importPagePO.CLICKPREVIEW);
    let previewData = (await io.exportsPage.getText(selectors.basePagePO.ACE_EDITOR_ID)).toString();
    console.log(previewData);

    await io.assert.expectToContainValue(
      'Status: 422 Message: ISA Interchange control number: 000003438  GS Group control number: 1320  Identifier code: IN    ST Transaction set control number: 000000088    Doc type: 850      Segment ID: BEG      Segment Position in Transaction Set: 1        Field position in a segment: BEG01        Error message: Mandatory element "BEG01" is not present.        Field position in a segment: BEG02        Error message: Min. length not met for the field "BEG02"',
      previewData,
      'Incorrect preview data'
    );

  });
});