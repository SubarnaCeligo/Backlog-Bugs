import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C108513 In security tab Style is not applied for 'Enable MFA'", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T25364 C108513 Verify check for 'Enable MFA' and 'Connect your mobile device *'", async ({
    io, page
  }) => {
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    const isToggleEnable = await io.myAccountPage.isVisible(selectors.myAccountPagePO.MFA_ON_OFF);
    if(!isToggleEnable) await io.myAccountPage.click(selectors.myAccountPagePO.MFA_TOGGLE);
    await io.assert.verifyElementDisplayedByText('Enable MFA', 'Enable MFA not visible');
    await expect(page.getByText('Enable MFA')).toHaveCSS('font-size','14px');
    await io.assert.verifyElementDisplayedByText('Connect your mobile device  *', 'Connect your mobile device text is improper');
  });
});