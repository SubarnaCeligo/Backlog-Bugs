import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that search results are cleared when the user clears the search term and hits Enter", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-QA @Epic-IO-95266 @Priority-P2 @Zephyr-IO-T38495 Verify that search results are cleared when the user clears the search term and hits Enter", async ({ io, page }) => {

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

    //Enter the search term with leading/trailing spaces
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX);
    await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, randomDocumentNumber);
    await page.keyboard.press('Enter');
    await io.homePage.loadingTime();


    //Validate Search results
    let searchResult = (await io.homePage.getText(selectors.dashboardPagePO.DOC_NO_COLUMN)).toString();
    let searchResultArray: string[] = searchResult.split(',');

    const allMatch = searchResultArray.every(documentNumber => documentNumber === randomDocumentNumber);
    await io.assert.expectToBeTrue(allMatch, 'Search successfull');

    // Clear the search term and hit enter
    await io.homePage.clearTextValue(selectors.dashboardPagePO.EDI_SEARCH_BOX);
    await page.keyboard.press('Enter');
    await io.homePage.loadingTime();

    //Validate Search results are cleared
    let searchResultAfterCleaing = (await io.homePage.getText(selectors.dashboardPagePO.DOC_NO_COLUMN)).toString();
    let searchResultArraAfterCleaing: string[] = searchResultAfterCleaing.split(',');

    await io.assert.expectToBeTrue(searchResultArray != searchResultArraAfterCleaing, 'Search results are not cleared after clearing the search term and hitting enter');

    });
});