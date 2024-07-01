import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all.json";
import Flow from "@testData/monitorSuite/C25997.json";

test.describe("C25999 Verify stop is shown, but should be disabled for the monitor users", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-13447  @Priority-P2  @Zephyr-T4855 @Env-All Verify stop is shown, but should be disabled for the monitor users UI_Backlog", async ({ io }) => {
        const res = await io.api.putCall( `v1/ashares/${process.env.IO_Ashare_ID}`,testData);
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.loadingTime()
      await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Webhook_ListenerLogs_DND');
      await io.homePage.loadingTime()
      await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
      await io.flowBuilder.clickByText('Webhook_ListenerLogs_DND');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
       // Validating Stop button should be shown but disabled for monitor users
      await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.REFRESH_LOG, 'class', "Mui-disabled");
    });
});
