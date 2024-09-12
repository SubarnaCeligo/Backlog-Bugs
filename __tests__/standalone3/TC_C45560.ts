import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45560", () => {
  test("@Zephyr-IO-T18706 @Env-All TC_C45560", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});

    await io.homePage.loadingTime();
    test.step("*** Clicked on security page ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.SECURITY);
    await io.homePage.loadingTime();
    test.step("*** validating SSO in security page ***", async ()=>{});

    await io.assert.verifyElementDisplayedByText(
      "Enable OIDC-based SSO",
      "SSO not enabled"
    );

    test.step("*** Navigated to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
