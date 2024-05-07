import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108160 - Error message should not contain 'Learn More' when mock output is in invalid format", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T24099 TC_C108160 - Error message should not contain 'Learn More' when mock output is in invalid format", async ({ io, page }) => {
        //Click on Create Import, select FTP
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
        await io.homePage.clickByText('Create import');
        await io.importsPage.click(selectors.importPagePO.FTP_IMPORT);

        //Select an FTP Connection
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.homePage.selectConnectionDropDown(page,'FTP CONNECTION');
        
        // Provide a name for the import and click Next
        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "Test TC108160");
        await io.importsPage.clickByText("Next")

        //Expand Mock Respose
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);

        //Enter an invalid mock output without 'statusCode' key
        await io.importsPage.fill(selectors.importPagePO.INPUT_MOCK_RESPONSE_XPATH, '[{"statusCode1":200}]');

        //Check if error message contains 'Learn More'
        await io.assert.verifyElementDisplayedByText('Mock response must include a statusCode value.', 'Expected error message is not displayed.')
    
    });

});
