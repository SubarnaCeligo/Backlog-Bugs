import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that search results honor the selected date range flilter on the EDI dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-85710 @Priority-P2 @Zephyr-IO-T38154 Verify that search results honor the selected date range flilter on the EDI dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Wait for EDI activity tab to be visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

     //Click on EDI Activity
     await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
     await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)
 
     //Click on date filter
     await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
     await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
 
     //Filter last 180 days
     await io.homePage.clickByText('Last 180 days');
     await io.homePage.clickByText('Apply');
     await io.homePage.loadingTime();

    //Form the search term
     const daysAgo = 180;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - (daysAgo * millisecondsInDay));

    // Get the epoch time (in milliseconds)
    const epochTime = Math.floor(pastDate.getTime() / 1000);

    //get all EDI transacttions in the account
    const payload = {
      "sandbox": false,
      "startDate": epochTime, // This is the epoch time in milliseconds
      "limit": 1000
    };
    let response = await io.api.postCall('v1/ediTransactions/query', payload);
    let randomDocumentNumber,regexDocumentNumber;

    if(Array.isArray(response.ediTransactions) && response.ediTransactions.length > 0){
    const documentNumbers = response.ediTransactions.map(transaction => transaction.documentNumber);
    // Get a random index from the array
    const randomIndex = Math.floor(Math.random() * documentNumbers.length);

    // Get the random document number
    randomDocumentNumber = documentNumbers[randomIndex];
    regexDocumentNumber = randomDocumentNumber.substring(0, 4) + "*"
    }

    //Enter the search term
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX);
    await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, regexDocumentNumber);
    await page.keyboard.press('Enter');
    await io.homePage.loadingTime();

    //Store the Search results
    let searchResult = (await io.homePage.getText(selectors.dashboardPagePO.DOC_NO_COLUMN)).toString();
    let searchResultArray: string[] = searchResult.split(',');

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Change the date range filter
    await io.homePage.clickByText('Last 24 hours');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();
    let searchResultArray2: string[] = [];

    // Store the results
    if (await io.homePage.isVisible(selectors.dashboardPagePO.DOC_NO_COLUMN)) {
      let searchResult2 = (await io.homePage.getText(selectors.dashboardPagePO.DOC_NO_COLUMN)).toString();
    
      // If the retrieved text is comma-separated
      searchResultArray2 = searchResult2.includes(',') ? searchResult2.split(',') : [searchResult2];
    }

    await io.assert.expectToBeTrue((searchResultArray.length != searchResultArray2.length), 'Search results not updated as per date range filter');
  
  });
});