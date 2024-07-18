import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`T28864 Verify that API settings (in IO My Profile page) is visible to owner and admin account holder if APIM license is enabled and user can update service account email address there`, () => {
  test(`@Zephyr-IO-T9350 @Env-QA T28864 Verify that API settings (in IO My Profile page) is visible to owner and admin account holder if APIM license is enabled and user can update service account email address there`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.clickByText('API settings');
    const subDomain = await io.flowBuilder.isVisible(`[value="apim-ui"]`);
    await io.assert.expectToBeTrue(subDomain, 'The subdomain value is not available');
    await io. flowBuilder.fill('[data-test="serviceAccountEmail"] input', 'io.auto.qa+apimnotification@celigo.com')
    await io. flowBuilder.click(selectors.basePagePO.MFA_SAVE)
    await io.flowBuilder.addStep("Successfully service mail added and clicked save button"); 
  });
});
