import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe(`TC_IO-T26982 Test to validate that user is able to see correct Field path below the help text after clicking on the icon http export/lookup`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("IOT26982 @Env-All @Priority-P2 @Zephyr-IO-T26982", async ({ io ,page}) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.loadingTime();
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated to Exports page ***");
        await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on Create new Export ***");
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH,"HTTP");
        await io.exportsPage.click(selectors.importPagePO.HTTP_IMPORT);
        await io.homePage.addStep("*** Select the Http Export Option from Applications ***");
        await io.homePage.loadingTime();
        await io.exportsPage.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN,"AMAZON SP API CONNECTION");
        await io.homePage.addStep("*** Clicked on connection Dropdown ***");
        await io.homePage.clickByText('AMAZON SP API CONNECTION');
        await io.homePage.loadingTime();
        await io.homePage.addStep("*** Select first option from connection Dropdown  ***");
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "HTTP_EXPORT_NEW");
        await io.homePage.addStep("*** Enter or fill the Export Name ***");
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Clicked on Save button ***");
        await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.NON_STANDARD_API_TAB);
        await io.homePage.addStep("*** Wait For Non Standard API RESPONSE patterns accordian to be in document  ***");
        await io.exportsPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
        await io.homePage.addStep("*** Click on  Non Standard API RESPONSE patterns accordian  ***");

        const helpIconSelector = selectors.exportsPagePO.HELP_ICON_EXPORT;
        
        await io.exportsPage.waitForElementAttached(helpIconSelector)
        await io.homePage.addStep("*** Wait for Help Icon Button to be in document   ***");

        await io.exportsPage.click(helpIconSelector);
        await io.homePage.addStep("*** Click on Help Icon  ***");

        await io.assert.verifyElementDisplayedByText('Field path: export.http.response.twoDArray.hasHeader','Help text is incorrect');
        await io.homePage.addStep("*** Verified the Help Text  ***");

        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Going back to homepage ***");

    })
});
