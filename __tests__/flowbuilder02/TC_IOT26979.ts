import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe(`TC_IOT26979  Test to validate that field "First record contains headers" is optional not mandatory http export/lookup`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("IOT26979 @Env-All @Priority-P2 @Zephyr-IO-T26979", async ({ io }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.addStep("*** Navigated to Exports page ***");
        await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on Create new Export ***");
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH,"HTTP");
        await io.exportsPage.click(selectors.importPagePO.HTTP_IMPORT);
        await io.homePage.addStep("*** Select the Http Export Option from Applications ***");
        await io.homePage.loadingTime();
        await io.exportsPage.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN,"HTTP AMAZON CONNECTION");
        await io.homePage.addStep("*** Clicked on connection Dropdown ***");
        await io.homePage.clickByText('HTTP AMAZON CONNECTION');
        await io.homePage.loadingTime();
        await io.homePage.addStep("*** Select first option from connection Dropdown  ***");
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "HTTP_EXPORT_NEW");
        await io.homePage.addStep("*** Enter or fill the Export Name ***");
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Clicked on Save button ***");
        await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.homePage.addStep("*** Wait For What would you like to export accordian to be in document  ***");
        await io.exportsPage.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.homePage.addStep("*** Clicked on Http Method ***");
        await io.exportsPage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
        await io.homePage.addStep("*** Select the Http Method GET ***");
        await io.exportsPage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, "test_relastive_url");
        await io.homePage.addStep("*** Enter the relative URL ***");
        await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.homePage.addStep("*** Clicked on Export Type Dropdown ***");
        await io.exportsPage.clickByText('All - always export all data');
        await io.homePage.addStep("*** Select the All - always export all data ***");
        await io.exportsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.addStep("*** Clicked on Save and Close button ***");
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.ADD_NEW_RESOURCE, "Element is not displayed properly");
        await io.homePage.addStep("*** Verified the Create Export  is displayed properly ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Going back to homepage ***");
    })
});
