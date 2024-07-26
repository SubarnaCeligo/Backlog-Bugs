import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T17224 Verify if the accounts are listed in the primary account dropdown to which the user has access to.", () => {
  test("@Env-All @Zephyr-IO-T17224 Verify if the accounts are listed in the primary account dropdown to which the user has access to.", async ({io, page}) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.ALLOW_RESET_BY_USERID);
    const listOfUsers=await page.locator(`${selectors.basePagePO.LIST_BOX} li`).count();
    expect(listOfUsers).toBeGreaterThan(1);
  });
});