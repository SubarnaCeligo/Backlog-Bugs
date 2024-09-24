import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C77690_To verify that the error is auto cancel after 6 seconds", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7554 @Priority-P2 C77690_To verify that the error is auto cancel after 6 seconds UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
        await io.flowBuilder.click(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
        await io.flowBuilder.clickByText("Create flow step")
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SALESFORCE CONNECTION');
        await io.flowBuilder.clickByText('SALESFORCE CONNECTION');
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C77690_Export');
        await io.flowBuilder.fillByIndex(`${selectors.flowBuilderPagePO.SF_SOQL_QUERY} textarea`,'""select *', 0)
        await io.flowBuilder.clickByText("Please select")
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, "Notification not showing")
    });
}); 