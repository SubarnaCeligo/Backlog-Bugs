import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45561", () => {
  test("@Zephyr-IO-T18707 @Env-All TC_C46997", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});

    test.step("*** Clicked on subscription page ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await io.homePage.loadingTime();
    test.step("*** validating SSO in subscription page ***", async ()=>{});

    const ssoText = await page.locator(`${selectors.basePagePO.TAB_PANEL} li`).filter({ hasText: "Single sign-on (SSO)" }).textContent();
    await io.assert.expectToContainValue("Single sign-on (SSO)", ssoText, "SSO not found");
    test.step("*** Verified SSO text is visible ***", async ()=>{});

    for (const li of await page.locator(`${selectors.basePagePO.TAB_PANEL} li`).all())
    {
      const text = await li.textContent();
      if(text.indexOf('Single sign-on (SSO)') > -1)
      {
        const svg = await li.locator('svg').isVisible();
        expect(svg).toBeTruthy();
        test.step("*** Verified SSO text has tickmark next to it ***", async ()=>{});
      }
    }

    test.step("*** Navigated to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
