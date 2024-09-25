import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('TC_C1518_Checking request upgrade in Profile page', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });
    test('C1518 @Env-All @Priority-P2 @Zephyr-IO-T783', async({io, page}) => {
        await io.homePage.addStep("*** Navigated to Accounts page ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY)
        await io.homePage.addStep("*** Opened the the Security Tab ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.homePage.addStep("*** Opened the Multifactor authentication tab ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.SSO);
        await io.homePage.addStep("*** Opened the SSO tab ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.PROFILE)
        await io.homePage.addStep("*** Opened the the PROFILE Tab ***");
        await io.homePage.addStep("*** Clicking on request upgrade to check whether it is there or not ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    }); 
  })