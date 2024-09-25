import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify all the elements of EDI Dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P1 @Zephyr-IO-T28999 @Zephyr-IO-T29000 @Zephyr-IO-T29004 @Zephyr-IO-T29029 Verify all the elements of EDI Dashboard", async ({ io, page }) => {

    await io.homePage.addStep("IO-T28999 - Verify that 'EDI activity' tab is added to IO Dashboard");
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.EDI_ACTIVITY_TAB, 'EDI activity tab is not displayed.');

    //Click on EDI Activity
    await io.homePage.addStep("Verify that users with EDI licence can access EDI Dashboard");
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.addStep("IO-T29004 - Verify that Documents view is the default view when EDI activity dashboard is opened")
    await io.assert.verifyElementIsDisplayed('[value="Documents"]', 'EDI dashboard did not load')

    await io.homePage.addStep("IO-T29000 - Verify all the elements of EDI Dashboard");
    //1. Upper left corner of the activity dashboard should have a dropdown to select Flows or Documents
    await io.homePage.clickByTextByIndex('Documents', 0);
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.DOCUMENTS, "Dropdown not displayed");
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.FLOWS, "Dropdown not displayed");

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    // 2. Should have a date range filter(Default 24 hours), available filters are Today, Last 24 hours, Last 36 hours, Last 7 daya, Last 15 days, Last 30 days and Custom
    let dateFilterVisible = await io.homePage.isVisible(selectors.myAccountPagePO.DATEFILTER);
    await io.assert.expectToBeTrue(dateFilterVisible, 'Date filter is not visible');
    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Get all available filter values
    let buttons = (await io.homePage.getText(selectors.dashboardPagePO.DATE_FILTER_POPUP)).toString();
    //Verify values of buttons
    await io.homePage.addStep("T29029 - Verify that the date range filter on EDI dashboard is as per the account's data retention period.")
    await io.assert.expectToBeValue('Today,Last 24 hours,Last 36 hours,Last 7 days,Last 15 days,Last 30 days,Last 60 days,Last 90 days,Last 180 days,Custom', buttons, 'Date filters are not displayed');
    await io.homePage.clickByText("Cancel");

    // 3. A dropdown for pagination should be displayed.
    let paginationTextVisible = await io.homePage.isVisible("text='Results per page:'");
    await io.assert.expectToBeTrue(paginationTextVisible, 'Pagination text is not visible');

    //Click chevron
    await io.homePage.clickByIndex(selectors.dashboardPagePO.PAGINATION_CHEVRON, 2);
    await io.homePage.waitForElementAttached(selectors.basePagePO.LIST_BOX);

    await io.assert.verifyElementIsDisplayed('[value="100"]','Default pagination is not displayed');//Default records per page

    //Verify recordsPerPageOptions
    let recordsPerPageOptions = (await io.homePage.getText(selectors.basePagePO.LIST_BOX)).toString();
    await io.assert.expectToBeValue(recordsPerPageOptions, "102550100", 'Records per page options not displayed');

    // 4. Next amnd prev page buttons should be displayed
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.PREV_PAGE, 'Pagination is not added');
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.NEXT_PAGE, 'Pagination is not added');

    // 5. A refresh button should be displayed."
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.REFRESH, 'Refresh button is not added');


  });
});