import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("@Author_sagna123 TC_T28428_T28434_T28436_Test to validate checkbox is not visible in HTTP export/lookups if we have exportSuccessMediaType value other than json or do not override", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-37655 @Priority-P2 @Sanity @Zephyr-IO-T28428 @Zephyr-IO-T28434 @Zephyr-IO-T28436 @Env-All", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated back to export page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create export***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "Google Sheets");
        await io.homePage.addStep("*** Searched for Google Sheets application ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.exportsPagePO.GOOGLE_SHEETS);
        await io.homePage.addStep("*** Selected Google Sheets application ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "Sheet Parser Google Sheet connection");
        await io.homePage.addStep("*** Searched for Sheet Parser Google Sheet connection CONNECTION ***");
        await io.homePage.clickByText('Sheet Parser Google Sheet connection');
        await io.homePage.addStep("*** Selected Sheet Parser Google Sheet connection ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the import ***");
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.homePage.addStep("*** Clicked on Resource field ***");
        await io.homePage.clickByText('Spreadsheets.values');
        await io.homePage.addStep("*** Selected Spreadsheets.values ***");
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.addStep("*** Clicked on operation field ***");
        await io.homePage.clickByText('Get');
        await io.homePage.addStep("*** Clicked on GET method ***");
        await io.homePage.fill(selectors.exportsPagePO.SPREAD_SHEETS_ID, "1J8z5D49IVgyB3RAz5jgu-HfzFX1yU-9B3MKPhmWxyJA");
        await io.homePage.addStep("*** Filled the spreadsheet ID ***");
        await io.homePage.click(selectors.exportsPagePO.RANGE);
        await io.homePage.keyboard('A');
        await io.homePage.keyboard('1');
        await io.homePage.keyboard(':');
        await io.homePage.keyboard('R');
        await io.homePage.keyboard('4');
        await io.homePage.keyboard('4');
        await io.homePage.addStep("*** Filled the range field ***");
        await io.homePage.click(selectors.importPagePO.HTTP_IMPORT);
        await io.homePage.addStep("*** Clciked on HTTP view ***");
        await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
        await io.homePage.addStep("*** Opened Non-standard API response patterns tab ***");
        await io.homePage.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
        await io.homePage.clickByText('CSV');
        await io.homePage.addStep("*** Selected media type as CSV (other than json and do not override) ***");
        const checkboxVisible = await io.flowBuilder.isVisible(selectors.exportsPagePO.HEADERCHECKBOX);
        await io.assert.expectToBeFalse(checkboxVisible, 'New Checkbox is visible');
        await io.homePage.addStep("*** Checked the visibility of checkbox and it is not visible ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});