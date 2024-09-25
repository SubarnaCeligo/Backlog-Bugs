import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that EDI documents can be searched using Document number/Interchange sender ID/ Interchange receiver ID using exact search keyword", () => {
  test.beforeEach(async ({ io }) => {


  });
  test("@Env-All @Epic-IO-85710 @Priority-P2 @Zephyr-IO-T38139 Verify that EDI documents can be searched using Document number/Interchange sender ID/ Interchange receiver ID using exact search keyword", async ({ io, page }) => {

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
    let randomDocumentNumber, randomInterchangeSenderID, randomInterchangeReceiverID;

    if (Array.isArray(response.ediTransactions) && response.ediTransactions.length > 0) {
      const documentNumbers = response.ediTransactions.map(transaction => transaction.documentNumber);
      const interchangeSenderIDs = response.ediTransactions
        .filter(transaction => transaction.isaSenderId && typeof transaction.isaSenderId === 'string' && transaction.isaSenderId.length > 3)  // Check for valid strings and length > 3
        .map(transaction => transaction.isaSenderId);
      const interchangeReceiverIDs = response.ediTransactions
        .filter(transaction => transaction.isaReceiverId && typeof transaction.isaReceiverId === 'string' && transaction.isaReceiverId.length > 3)  // Check for valid strings and length > 3
        .map(transaction => transaction.isaReceiverId);

      // Get a random index from the array
      const randomIndex = Math.floor(Math.random() * documentNumbers.length);

      // Get the random document number
      randomDocumentNumber = documentNumbers[randomIndex];
      randomInterchangeSenderID = interchangeSenderIDs[randomIndex];
      randomInterchangeReceiverID = interchangeReceiverIDs[randomIndex];
    }
    if (randomDocumentNumber != undefined) {
      //Search by document number
      await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX);
      await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, randomDocumentNumber);
      await page.keyboard.press('Enter');
      await io.homePage.loadingTime();

      //Validate Search results
      let searchResult = (await io.homePage.getText(selectors.dashboardPagePO.DOC_NO_COLUMN)).toString();
      let searchResultArray: string[] = searchResult.split(',');

      // Check if all records match the condition
      let allMatch = searchResultArray.every((documentNumber) => {
        const startsWithSearchString = documentNumber.trim().startsWith(randomDocumentNumber);
        return startsWithSearchString;
      });

      await io.assert.expectToBeTrue(allMatch, 'Document number search is not working');
    }
    if (randomInterchangeSenderID != undefined) {
      //Clear search
      await io.homePage.loadingTime();
      await io.homePage.clickByIndex(selectors.dashboardPagePO.FILTER_BUTTONS, 2);
      await io.homePage.loadingTime();

      //Change search term to sender ID
      //Open pulldown menu
      await io.homePage.click(selectors.dashboardPagePO.SEARCH_PULLDOWN_MENU);
      await io.homePage.waitForElementAttached(selectors.basePagePO.LIST_BOX);

      await io.homePage.waitForElementAttached(selectors.dashboardPagePO.PULLDOWN_SENDER_ID);
      await io.homePage.click(selectors.dashboardPagePO.PULLDOWN_SENDER_ID);
      await io.homePage.loadingTime();

      //Search by ISA Sender ID
      await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX)
      await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, randomInterchangeSenderID);
      await page.keyboard.press('Enter');
      await io.homePage.loadingTime();

      //Validate Search results
      let searchResultSenderID = (await io.homePage.getText(selectors.dashboardPagePO.ISA_SENDERID_COLUMN)).toString();
      let searchResultArraySenderID: string[] = searchResultSenderID.split(',');

      // Check if all el match the condition
      let allMatch = searchResultArraySenderID.every((senderID) => {
        const startsWithSearchString = senderID.trim().startsWith(randomInterchangeSenderID);
        return startsWithSearchString;
      });

      await io.assert.expectToBeTrue(allMatch, 'ISA Sender search is not working');
    }
    if (randomInterchangeReceiverID != undefined) {
      //Clear search
      await io.homePage.loadingTime();
      await io.homePage.clickByIndex(selectors.dashboardPagePO.FILTER_BUTTONS, 2);
      await io.homePage.loadingTime();

      //Change search term to receiver ID
      //Open pulldown menu
      await io.homePage.click(selectors.dashboardPagePO.SEARCH_PULLDOWN_MENU);
      await io.homePage.waitForElementAttached(selectors.basePagePO.LIST_BOX);

      await io.homePage.waitForElementAttached(selectors.dashboardPagePO.PULLDOWN_RECEIVER_ID);
      await io.homePage.click(selectors.dashboardPagePO.PULLDOWN_RECEIVER_ID);
      await io.homePage.loadingTime();

      //Search by ISA Sender ID
      await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_SEARCH_BOX)
      await io.homePage.fill(selectors.dashboardPagePO.EDI_SEARCH_BOX, randomInterchangeSenderID);
      await page.keyboard.press('Enter');
      await io.homePage.loadingTime();

      //Validate Search results
      let searchResultReceiverID = (await io.homePage.getText(selectors.dashboardPagePO.ISA_RECEIVERID_COLUMN)).toString();
      let searchResultArrayReceiverID: string[] = searchResultReceiverID.split(',');

      // Check if all el match the condition
      let allMatch = searchResultArrayReceiverID.every((receiverID) => {
        const startsWithSearchString = receiverID.trim().startsWith(randomInterchangeReceiverID);
        return startsWithSearchString;
      });

      await io.assert.expectToBeTrue(allMatch, 'ISA Receiver search is not working');
    }

  });
});