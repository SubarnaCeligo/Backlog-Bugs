import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T7029 Verify List hyperlinks on the subscription page", () => {
  test("@Zephyr-IO-T7029 @Env-All C24852 Verify List hyperlinks on the subscription page", async ({
    io,
    page
  }) => {

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SUBSCRIPTION);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    await io.homePage.loadingTime();
    const viewButton = page.locator(selectors.connectionsPagePO.FIX_CONNECTION).filter({ hasNot: page.locator('[disabled]') });
    viewButton.nth(0).click();
    await io.myAccountPage.loadingTime();
    expect(await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).isVisible()).toBeTruthy();
  });
});
