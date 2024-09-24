import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('TC_C50869_verify Account settings in MFA page', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });
    test('TC_C50869 @Env-All @Priority-P2 @Zephyr-IO-T19633', async({io, page}) => {
        await io.homePage.addStep("*** Navigated to Accounts page ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY)
        await io.homePage.addStep("*** Opened the the Security Tab ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.homePage.addStep("*** Opened the Multifactor authentication tab ***");
        await io.homePage.clickByText('Account settings');
        await io.homePage.addStep("*** Clicking on Account settings to check whether it is there or not ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    }); 
  })