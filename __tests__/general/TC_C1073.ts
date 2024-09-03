import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C1073", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***", () => { });
  });
  test("@Zephyr-IO-T2228 @Env-All TC_C1073 Verify the text of the subscription based on the license and the addon packs", async ({ io, page }, testInfo) => {
    await test.step("*** Navigating to profile page ***", () => { });
    await io.homePage.click(
      selectors.basePagePO.ACCOUNT_BUTTON
    );
    await test.step("*** Clicked on Profile Menu ***", () => { });
    await io.homePage.click(
      selectors.myAccountPagePO.SUBSCRIPTION
    );
    await test.step("*** Clicked on subscription tab ***", () => { });

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.SUBSCRIPTION_DATA);


    let details = await io.homePage.getText(selectors.myAccountPagePO.SUBCRIPTION_DETAILS)

    
    await expect(details[0]).toEqual("Status:");
    await expect(details[1]).toEqual(" Expires on:");
    await expect(details[3]).toEqual(" Customer success plan:");
    await expect(details[4]).toEqual("Sandbox");
    await expect(details[5]).toEqual("Single sign-on (SSO)");
    await expect(details[6]).toEqual("Data retention up to 180 days");

     

    
    await test.step("*** Verified the subscription details ***", () => { });
  });
});
