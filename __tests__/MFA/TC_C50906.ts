import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C50906 Verify the message shown when the account settings are saved", () => {
    test("@Env-All @Zephyr-IO-T19640 C50906 Verify the message shown when the account settings are saved", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '1');
        await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '2');
        await io.myAccountPage.loadingTime()
        await page.locator(selectors.basePagePO.MFA_SAVE_CLICK).last().click()
        await page.locator(selectors.basePagePO.NOTIFICATION_ID).waitFor({state: "visible"});
        await expect(page.locator(selectors.basePagePO.NOTIFICATION_ID)).toBeVisible();
    });
});
