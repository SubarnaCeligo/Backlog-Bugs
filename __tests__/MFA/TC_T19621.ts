import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C50835 Verify if the owner/admin is able to retrieve the response when /api/trustedDevices/settings route is hit`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All @Zephyr-IO-T19621 C50835 Verify if the owner/admin is able to retrieve the response when /api/trustedDevices/settings route is hit`, async ({ page, io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.loadingTime();
    await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, "5");
    await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, "10");
    await page.locator(selectors.basePagePO.MFA_SAVE_CLICK).last().click();
    await io.myAccountPage.loadingTime();
    const preferences = await io.api.getCall(`api/preferences`);
    let defaultAShareId = '';
    if(preferences.defaultAShareId !== 'own'){
      defaultAShareId = preferences.defaultAShareId;
    }

    if(defaultAShareId){
      await page.route('**/api/accountSettings', async (route, request) => {
        // Override headers
        const headers = {
          ...request.headers(),
          'Integrator-AShareId': defaultAShareId,
        };
        await route.continue({ headers });
      });
    }
  
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "api/accountSettings"
    );

    await io.myAccountPage.loadingTime();
    const response  = page.getByText('"trustDeviceForPeriod":10');
    await response.waitFor({ state: 'visible', timeout: 5000 });
  });
});
