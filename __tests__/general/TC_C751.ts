import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C751", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(`@Zephyr-IO-T1400 @Env-All  TC_C751_Verify ""Change"" link on beside password opens pop up with twio fields ""Current password"" and "" New password""`, async ({io,page}, testInfo) => {
    await io.homePage.loadingTime()
    await io.homePage.isPageLoaded()
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    await io.homePage.click(selectors.myAccountPagePO.EDIT_PASSWORD);

    var current = await io.homePage.isVisible(selectors.myAccountPagePO.CURRENT_PWD);
    await io.assert.expectToBeTrue(current, "");
    await test.step("Verified The fields Current password should be displayed",()=>{});

    var current1 = (await io.homePage.getText(selectors.myAccountPagePO.CURRENT_PWD1)).toString()
    await io.assert.expectToBeValue("Current password *", current1, "");
    await test.step("Verified The spelling for Current password field",()=>{});

    var newPass = await io.homePage.isVisible(selectors.myAccountPagePO.NEW_PWD);
    await io.assert.expectToBeTrue(newPass, "");
    await test.step("Verified The fields New password should be displayed",()=>{});
    var newPass1 = (await io.homePage.getText(selectors.myAccountPagePO.NEWPASSWORD1)).toString()
    await io.assert.expectToBeValue("New password *", newPass1, "");
    await test.step("Verified The Spelling for New password field",()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSEDRAWER);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
