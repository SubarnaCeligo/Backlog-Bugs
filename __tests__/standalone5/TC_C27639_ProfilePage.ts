
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C27639_ProfilePage", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Go to HomePage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2521 @Env-All TC_C27639_ProfilePage Verify Multiple error alerts are not displayed when we click on Save with invalid details", async ({io,page}, testInfo) => {
    test.step("*** Navigating to profile page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.EDITEMAIL);
    await io.homePage.clearTextValue(selectors.myAccountPagePO.EMAILINPUT);
    await io.homePage.fillWebPage(selectors.myAccountPagePO.EMAILINPUT, "io.auto.qa@gmail.com");
    test.step("*** entered invalid email ***", async ()=>{});
    await io.homePage.clearTextValue(selectors.myAccountPagePO.PASSWORDINPUT);
    await io.homePage.fillWebPage(selectors.myAccountPagePO.PASSWORDINPUT, decrypt("SU9zdGFuZGFsb25lMkAxMjM=")
    );
    test.step("*** entered valid password ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.CHANGEEMAILBUTTON);
    await io.homePage.click(selectors.myAccountPagePO.CHANGEEMAILBUTTON);
    await io.homePage.click(selectors.myAccountPagePO.CHANGEEMAILBUTTON);
    test.step("*** clicked on save button multiple times ***", async ()=>{});
    const errorMsg = await page.locator(
      selectors.basePagePO.NOTIFICATION_ID
    ).textContent();
    await io.assert.expectToBeValue(String(errorMsg), "Current password failed to authenticate.  Please try again.", "");
    
    const errorLen= await io.homePage.getLengthOfElementArray(selectors.basePagePO.NOTIFICATION_ID)

    await io.assert.expectToBeValue( "1",String(errorLen), "");
  });
});
