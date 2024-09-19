
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C27729", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5130 @Env-All TC_C27729 Verify Enable OIDC based SSO should be changed to Enable OIDC-based SSO in the security page.", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();

    const securitytab = io.data.links.MY_ACCOUNT_PAGE_URL.replace('profile', 'security');
    await io.homePage.navigateTo(securitytab);

    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText('body', 'Enable OIDC-based SSO')
  });
});
