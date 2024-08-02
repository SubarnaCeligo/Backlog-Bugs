import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that the EDI dashboard displays all the applicable EDI columns", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29003 Verify that the EDI dashboard displays all the applicable EDI columns", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Validate if all EDI columns are present
    let ediColumns = (await io.homePage.getText(selectors.dashboardPagePO.EDI_COLUMNS)).toString();
    await io.assert.expectToContainValue('Doc no.', ediColumns, 'Doc no column is not displayed');
    await io.assert.expectToContainValue('Doc type', ediColumns, 'Doc type column is not displayed');
    await io.assert.expectToContainValue('FA status', ediColumns, 'FA status column is not displayed');
    await io.assert.expectToContainValue('File type', ediColumns, 'File type column is not displayed');
    await io.assert.expectToContainValue('Direction', ediColumns, 'Direction column is not displayed');
    await io.assert.expectToContainValue('Processed', ediColumns, 'Processed column is not displayed');
    await io.assert.expectToContainValue('ISA no.', ediColumns, 'Int ctrl no column is not displayed');
    await io.assert.expectToContainValue('GS no.', ediColumns, 'Group ctrl no column is not displayed');
    await io.assert.expectToContainValue('ST no.', ediColumns, 'Trans set ctrl no column is not displayed');
    await io.assert.expectToContainValue('ISA sender', ediColumns, 'Int sender column is not displayed');
    await io.assert.expectToContainValue('ISA receiver', ediColumns, 'Int receiver column is not displayed');
    await io.assert.expectToContainValue('GS sender', ediColumns, 'Group sender column is not displayed');
    await io.assert.expectToContainValue('GS receiver', ediColumns, 'Group receiver column is not displayed');

    
  });
});