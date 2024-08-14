import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`Zephyr-IO-T19634 C50998`, () => {
  test(`@Env-All @Zephyr-IO-T19634 C50998`, async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.click(selectors.myAccountPagePO.SECURITY);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.myAccountPagePO.MFA);
    await io.homePage.loadingTime()
    const isToggleEnable = await io.myAccountPage.isVisible(selectors.myAccountPagePO.MFA_ON_OFF);
    
    //Check if the MFA is enabled  
    if(isToggleEnable) {
        await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            5
          );
          const trustedDevicesPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const trustedDevicesHelpText = await trustedDevicesPopup.textContent();
          expect(trustedDevicesHelpText).toContain('Do not allow trusted devicesCheck this box to remove the ability for users to add trusted devices. Allowing users to add their own computer/browser to the trusted device list eliminates the need for them to enter their six-digit authentication code every time they sign in from the computer and browser they commonly use. If checked, MFA users can’t add trusted devices and must enter the six-digit code from their authentication device every time they sign in regardless of which device they use.');
          await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
          await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            6
          );
          const daysPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const daysHelpText = await daysPopup.textContent();
          expect(daysHelpText).toContain('Number of days until MFA is required again for trusted devicesIf left blank, MFA users who sign in from trusted devices are only required to enter their six-digit authentication code after 90 days of inactivity from the trusted device. To extend or reduce the default, enter the number of days of inactivity before re-authentication is required.');
          
    }
    else{
    await io.flowBuilder.clickByIndex(
        selectors.flowBuilderPagePO.HELP_TEXT_ICON,
        5
      );
      const trustedDevicesPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
      const trustedDevicesHelpText = await trustedDevicesPopup.textContent();
      expect(trustedDevicesHelpText).toContain('Do not allow trusted devicesCheck this box to remove the ability for users to add trusted devices. Allowing users to add their own computer/browser to the trusted device list eliminates the need for them to enter their six-digit authentication code every time they sign in from the computer and browser they commonly use. If checked, MFA users can’t add trusted devices and must enter the six-digit code from their authentication device every time they sign in regardless of which device they use.');
      await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
      await io.flowBuilder.clickByIndex(
        selectors.flowBuilderPagePO.HELP_TEXT_ICON,
        6
      );
      const daysPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
      const daysHelpText = await daysPopup.textContent();
      expect(daysHelpText).toContain('Number of days until MFA is required again for trusted devicesIf left blank, MFA users who sign in from trusted devices are only required to enter their six-digit authentication code after 90 days of inactivity from the trusted device. To extend or reduce the default, enter the number of days of inactivity before re-authentication is required.');
    }
  });
});
