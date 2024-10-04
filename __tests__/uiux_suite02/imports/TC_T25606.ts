import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T25606", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T25606 @Env-All @Priority-P2 @Zephyr-IO-T25606", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated back to import page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create import***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "FTP");
        await io.homePage.addStep("*** Searched for FTP application ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.homePage.addStep("*** Selected FTP application ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "FTP CONNECTION");
        await io.homePage.addStep("*** Searched for FTP CONNECTION ***");
        await io.homePage.clickByText('FTP CONNECTION');
        await io.homePage.addStep("*** Selected FTP CONNECTION ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the export ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE)
        await io.flowBuilder.clickByText("CSV (or any delimited text file)")
        await io.assert.verifyElementAttribute(`${selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_AND_STRIP_ENCLOSING_QUOTES} input`, 'value', 'false');
        await io.homePage.addStep("*** checking whether checkbox is unchecked by default ***");
        await io.flowBuilder.click(selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_AND_STRIP_ENCLOSING_QUOTES);
        await io.assert.verifyElementAttribute(`${selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_AND_STRIP_ENCLOSING_QUOTES} input`, 'value', 'true');
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});