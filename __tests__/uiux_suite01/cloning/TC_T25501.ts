import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { HomePage } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/HomePage";
test.describe('IO-T18708 Verify whether ""Request Upgrade"" button available in Security tab if SSO flag is false from endpoint type license', () => {

    test('@Env-All @Zephyr-IO-T18708 IO-T18708 Verify whether ""Request Upgrade"" button available in Security tab if SSO flag is false from endpoint type license', async ({
        io,
        page
    }) => {
        // Navigate to the home page
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

        // Click the 'Upload' button
        await page.getByRole('button', { name: 'Upload' }).click();

        // Click the "installZip" button
        await page.locator(selectors.homePagePO.INSTALL_ZIP).click();

        // Locate the "selectFile" button and click it
        // await page.locator('[data-test="selectFile"]').click();

        // Find the actual <input type="file"> element (use its "data-test" attribute)
        const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);

        // Path to the ZIP file you want to upload
        const filePath = 'testData/ZipFiles/670f9765c97f4568376b18fb.zip'; 

        // Set the file without opening the native file picker window
        if (fileInput) {
            await fileInput.setInputFiles(filePath);  // This line uploads the file programmatically
        } else {
            console.error("File input element not found");
        }

        // Click "Install integration" button
        await page.getByRole('button', { name: 'Install integration' }).click();

        // Proceed with the rest of your flow...
        await page.locator(selectors.basePagePO.DIALOG_PROCEED_BUTTON).click();
        await io.homePage.loadingTime();
        await io.homePage.clickByIndex(selectors.templatePagePO.CONFIGURE, 0);
        await io.homePage.clickByText('Use existing connection');
        await io.homePage.clickByText('Please select');
        await io.homePage.clickByTextByIndex('FTP CONNECTION', 1);
        await io.homePage.clickByText('Done');
        await io.homePage.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.templatePagePO.CONFIGURE, 0);
        await io.homePage.clickByTextByIndex('Please select', 1);
        await page.getByRole('menuitem', { name: 'Platform 2' }).locator('span').first().click();
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.USERNAME, 'Username not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.PASSWORD, 'Password is not displaying');
    });
});
