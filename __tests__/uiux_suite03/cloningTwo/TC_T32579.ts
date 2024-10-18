import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { HomePage } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/HomePage";

test.describe('Verify cloning or uploading zip with snowflake imports with "Use optimized bulk load" option selected', () => {

    test('@Env-All @Zephyr-IO-T32579 Verify cloning or uploading zip with snowflake imports with "Use optimized bulk load" option selected', async ({
        io,
        page
    }) => {
        // Navigate to the home page
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

        // Navigate to "Snowflake Bulk LoadDND" flow
        await io.flowBuilder.clickByText('Snowflake Bulk LoadDND');
        await io.flowBuilder.loadingTime();
        // Open actions menu and clone the flow
        await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 0);
        await io.flowBuilder.clickByText('Clone flow');
        
        // Open the "Please select" dropdown
        await io.flowBuilder.clickByText('Please select');
        await io.flowBuilder.clickByText('Alias_Test');


        // Clone the flow
        await io.flowBuilder.click('[data-test="Clone flow"]');

        // Configure the cloned flow
        await io.homePage.click(selectors.templatePagePO.CONFIGURE);
        await io.homePage.clickByText('Use existing connection');
        await io.homePage.clickByText('Please select');
        await page.locator('li >> text=SNOWFLAKE').nth(2).click();
        //await io.homePage.clickByTextByIndex('SNOWFLAKE', 1);
        await io.homePage.clickByText('Done');
        await io.homePage.loadingTime();

        // Assert that the cloned flow is displayed
        await io.assert.verifyElementDisplayedByText('Clone - Snowflake Bulk LoadDND', 'Not displayed');
        // Delete the cloned flow
        await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 1);
        await io.flowBuilder.clickByText('Delete flow');
        await io.flowBuilder.clickByText('Delete');
        await io.homePage.loadingTime();
    });
});
