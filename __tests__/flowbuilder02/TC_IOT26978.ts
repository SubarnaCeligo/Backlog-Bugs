import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe(`TC_IOT26978 Test to validate that new field "First record contains headers" of type checkbox is added just below "Path to records in HTTP response body" field in http export/lookup`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("IOT26978 @Env-All @Priority-P2", async ({ io ,page}) => {
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
        await io.assert.verifyElementDisplayedByText(
            "First record contains headers",
            "First record contains headers is not present"
          );
        await io.homePage.addStep("*** Verify Element BY Text First record contains headers present inside accordian  ***");
        const firstRecordContainsHeaders =  page.getByRole('checkbox', { name: 'First record contains headers' });
        await io.homePage.addStep("*** Getting the element of Type checkbox and name First record contains headers ***");
        const elementType = await firstRecordContainsHeaders.evaluate(element => element.getAttribute('type'));
        await io.homePage.addStep("*** Getting the type of the element ***");
        expect(elementType).toBe('checkbox');
        await io.homePage.addStep("*** Validating it is of type checkbox ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Going back to homepage ***");
    })
});
