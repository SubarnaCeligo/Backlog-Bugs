import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C37210_Verify the flow run dashboard should show connection broken icon if there are any offline connections", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7537 C37210_Verify the flow run dashboard should show connection broken icon if there are any offline connections UI_Backlog", async ({ io, page }) => {
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
        await io.homePage.clickByText("Automation Flows");
        await io.flowBuilder.loadingTime();
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_Broken_Connection_DND');
        await io.integrationPage.clickByText('TC_Broken_Connection_DND')
        await io.flowBuilder.loadingTime();
        await io.integrationPage.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0)
        await io.integrationPage.click(selectors.connectionsPagePO.EDIT_RESOURCE)
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Connection page not opened')
    });
});