import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that clicking on the 'Rejected' FA status shows the details of the document.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29013 Verify that clicking on the 'Rejected' FA status shows the details of the document.", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Get all available filter values
    await io.homePage.clickByText('Last 30 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FA_FILTER_BUTTON);
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_BUTTON, 2);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    let filters = (await io.homePage.getText(selectors.dashboardPagePO.FA_FILTER_VALUES)).toString();
    let filtersArray: string[] = filters.split(',');
    let index = filtersArray.indexOf('Rejected');

    //Apply filter
    await io.homePage.clickByIndex(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, index);
    await io.homePage.clickByTextByIndex('Apply', 0);
    await io.homePage.loadingTime();
    await io.homePage.clickByTextByIndex('Rejected', 0);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);

    //Validate Rejected popup
    let header = (await io.homePage.getText(selectors.dashboardPagePO.REJECTED_POPUP_HEADER)).toString();
    await io.assert.expectNotToBeValue('FA status', header, 'Heder is not displayed');
    
    let dialogContents = (await io.homePage.getText(selectors.dashboardPagePO.REJECTED_POPUP_CONTENTS)).toString();
    await io.assert.expectToContainValue('Rejected', dialogContents, 'Incorrect dialog contents');
    await io.assert.expectToContainValue('Document:', dialogContents, 'Incorrect dialog contents');
   
  });
});