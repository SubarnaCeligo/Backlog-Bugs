import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42448_Verify “Request trial extension” and “compare plans” buttons/text is removed from Subscriptions tab for license type=integrator", () => {
    test("@Env-All @Zephyr-IO-T920 C42448_Verify “Request trial extension” and “compare plans” buttons/text is removed from Subscriptions tab for license type=integrator UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
        await io.myAccountPage.loadingTime()
        // Validating Request trial extension and compare plans not showing
        await expect(await page.locator(selectors.myAccountPagePO.SUBSCRIPTION)).not.toHaveCSS("Request trial", "trial");
        await expect(await page.locator(selectors.myAccountPagePO.SUBSCRIPTION)).not.toHaveCSS("compare plans", "plans");
    });
});
