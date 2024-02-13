import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C111350_3", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C111350_3", async ({ io, page }) => {
        
    //    await page.pause();
        await io.homePage.addStep("*** Navigated back to home page ***");
        await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
        await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "Maria_DB");
        await io.homePage.clickByText("Maria_DB");
        await io.homePage.clickByText("Maria_DB_Flow");
        await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,2);
      
       await io.assert.verifyElementDisplayedByText('Auto-populate destination fields',"Field is not displayed properly");
       await io.flowBuilder.clickByText("Auto-populate destination fields");
    
       await page.getByRole('tree').getByRole('button').first().click();
       await page.pause();
       await io.flowBuilder.clickByIndex("[aria-label='settings']",3);
       await io.flowBuilder.clickByText("Standard");
       await io.flowBuilder.clickByText("Handlebars expression");
       await io.flowBuilder.loadingTime();
       await page.getByLabel('Please select').click();
       //await io.flowBuilder.clickByText("Please select");
       expect(await io.assert.verifyElementDisplayedByText("Do nothing","Notdisplaying")).toBeFalsy

    });
});