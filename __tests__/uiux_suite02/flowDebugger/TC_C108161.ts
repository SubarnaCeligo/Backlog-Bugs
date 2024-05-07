import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("When Mock Output is in invalid format, 'Status Code' should be a hyperlink", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T24100 When Mock Output is in invalid format, 'Status Code' should be a hyperlink", async ({ io, page }) => {

        //Click on Create Import, select FTP
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
        await io.homePage.clickByText('Create import');
        await io.importsPage.click(selectors.importPagePO.FTP_IMPORT);

        //Select an FTP Connection
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.homePage.selectConnectionDropDown(page, 'FTP CONNECTION');

        // Provide a name for the import and click Next
        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "Test TC108160");
        await io.importsPage.clickByText("Next")

        //Expand Mock Respose
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
     
        //Enter an invalid mock output without 'statusCode' key
        await io.importsPage.fill(selectors.importPagePO.INPUT_MOCK_RESPONSE_XPATH, '[{"statusCode1":200}]');

        //Check if 'statusCode' is a hyperlink
        const isStatusCodeHyperlink = await page.getByRole('link', { name: 'statusCode' }).isVisible();
        await io.assert.expectToBeTrue(isStatusCodeHyperlink, 'Status code is not a hyperlink');

        const hyperlink = await page.getByRole('link', { name: 'statusCode' }).getAttribute('href');
        await io.assert.expectToContainValue('https://docs.celigo.com/hc/en-us/articles/4473437451163#Canonical-format-for-mock-response-data', hyperlink, 'Invalid hyperlink')
       
    });

});
