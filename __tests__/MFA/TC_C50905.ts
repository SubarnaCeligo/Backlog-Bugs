import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C50905 Verify that only the owner/admin should be able to define the number of days for a trusted device.", () => {
  test("@Env-All @Zephyr-IO-T19639 C50905 Verify that only the owner/admin should be able to define the number of days for a trusted device.", async ({io, page}) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, "");
    await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, "5");
    await io.myAccountPage.loadingTime()
    await page.locator(selectors.basePagePO.MFA_SAVE_CLICK).last().click()
    expect(await page.locator(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT).getAttribute('value')).toBe("5");
  });
});