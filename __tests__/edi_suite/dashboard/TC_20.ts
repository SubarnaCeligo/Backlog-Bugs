import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that entries on Flows dashboard are paginated", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that entries on Flows dashboard are paginated", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Click on EDI Activity
    await io.homePage.click("[data-test= 'edi-activity']");

    //Open flows

    //Should have a date range filter(Default 24 hours), available filters are Today, Last 24 hours, Last 36 hours, Last 7 daya, Last 15 days, Last 30 days and Custom
    let dateFilterVisible = await io.homePage.isVisible('button.MuiButton-outlined');
    await io.assert.expectToBeTrue(dateFilterVisible, 'Date filter is not visible');
    //Click on date filter
    await io.homePage.click('button.MuiButton-outlined');
    await io.homePage.waitForElementAttached('#arrow-popper');

    //Get all available filter values
    let buttons = await io.homePage.getText('#arrow-popper [role="button"]');
    console.log(buttons)
    //Verify values of buttons

    // A dropdown for pagination should be displayed.
    let paginatinText = (await io.homePage.getText('.MuiTypography-body2')).toString();
    await io.assert.expectNotToContainValue('Results per page', paginatinText, 'Pagination text is not visible');

    //Click chevron
    await io.homePage.click('.MuiSelect-nativeInput');
    await io.homePage.waitForElementAttached('[role="listbox"]');

    await io.assert.verifyElementText('[role="listbox"] .Mui-selected', '50');//Default records per page

    let recordsPerPageOptions = await io.homePage.getText('[role="listbox"]');
    //Verify recordsPerPageOptions

    // 4. Total number of records should be displayed beside pagination dropdown.
    await io.assert.verifyElementIsDisplayed('[data-testid="prevPage"]', 'Pagination is not added');
    await io.assert.verifyElementIsDisplayed('[data-testid="nextPage"]', 'Pagination is not added');
    
    // 5. A refresh button should be displayed."
    await io.assert.verifyElementIsDisplayed('[data-testid="refresh"]', 'Refresh button is not added');
   
    
  });
});