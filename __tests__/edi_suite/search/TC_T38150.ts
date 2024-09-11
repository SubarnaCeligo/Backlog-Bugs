import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that search on EDI dashboard is case insensitive", () => {
  test.beforeEach(async ({ io }) => {


  });
  test("@Env-QA @Env-IAQA @Epic-IO-85710 @Priority-P2 @Zephyr-IO-T38150 Verify that search on EDI dashboard is case insensitive", async ({ io, page }) => {

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
    let randomDocumentNumber;

    if(Array.isArray(response.ediTransactions) && response.ediTransactions.length > 0){
    const documentNumbers = response.ediTransactions.map(transaction => transaction.documentNumber);
    // Get a random index from the array
    const randomIndex = Math.floor(Math.random() * documentNumbers.length);

    // Get the random document number
    randomDocumentNumber = documentNumbers[randomIndex];
    }

    //Enter the search term
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX);
    await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, randomDocumentNumber.toLowerCase());
    await page.keyboard.press('Enter');
    await io.homePage.loadingTime();


    //Validate Search results
    let searchResult = (await io.homePage.getText(selectors.dashboardPagePO.DOC_NO_COLUMN)).toString();
    let searchResultArray: string[] = searchResult.split(',');

    const allMatch = searchResultArray.every(documentNumber => documentNumber === randomDocumentNumber);
    await io.assert.expectToBeTrue(allMatch, 'Case insensitive search is not working');

  });
});