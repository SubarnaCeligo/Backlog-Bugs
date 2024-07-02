import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe.skip(`TC_IOT26988 Test to validate that field "First record contains headers" is optional not mandatory google sheets export/lookup`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("IOT26988 @Env-All @Priority-P2", async ({ io, page}) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.loadingTime();
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated to Exports page ***");
        await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on Create new Export ***");
        await io.homePage.loadingTime();
        const googleSheetSelectors = selectors.exportsPagePO.GOOGLE_SHEETS
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH,"Google Sheets");
        await io.exportsPage.click(googleSheetSelectors);
        await io.homePage.addStep("*** Select the Google Sheets Export Option from Applications ***");
        await io.homePage.loadingTime();
        await io.exportsPage.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN,"test - Offline");
        await io.homePage.addStep("*** Clicked on connection Dropdown ***");
        await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
        await io.homePage.loadingTime();
        await io.homePage.addStep("*** Select first option from connection Dropdown  ***");
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "GOOGLE_SHEETS_EXPORT_NEW");
        await io.homePage.addStep("*** Enter or fill the Export Name ***");
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Clicked on Save button ***");
        
        await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.homePage.addStep("*** Wait For What would you like to Export  accordian to be in document  ***");

         await io.exportsPage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
         await io.homePage.addStep("*** Clicked on Resource Selector Dropdown ***");
         await io.exportsPage.clickByText('Spreadsheets.values')
         await io.homePage.addStep("*** Selecting Spreadsheets.values as an option from Resource Dropdown  ***");
         await io.homePage.loadingTime();
         await io.exportsPage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION); 
         await io.homePage.addStep("*** Clicked on Api Endpoint Dropdown ***");
         await io.exportsPage.clickByText('Batchget')
         await io.homePage.addStep("*** Selecting Batchget as an option from  Api Endpoint Dropdown ***");
         await io.homePage.loadingTime();
        await io.assert.verifyElementDisplayedByText(
            "First record contains headers",
            "First record contains headers is not present"
          );
        const spreadSheetIdSelector=  selectors.exportsPagePO.SPREAD_SHEETS_ID
        await io.exportsPage.fill(spreadSheetIdSelector, "spreadsheet_id_123");
        await io.homePage.addStep("*** Filling up spreadsheet id ***");
        await io.exportsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.addStep("*** Clicked on Save and Close button to show it is not mandatory to***");
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.ADD_NEW_RESOURCE, "Element is not displayed properly");
        await io.homePage.addStep("*** Verified the Create Export  is displayed properly ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Going back to homepage ***");
    })
});
