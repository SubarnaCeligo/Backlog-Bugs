import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C734", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1385 @Env-All  TC_C734_Verify when user is logged with Email, then Name, Email,Role, Phone field vaules are shown by default ", async ({io,page}, testInfo) => {
    var email;
    var name;
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);

    await test.step("*** Navigate to My Profile ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
      email = await page.$(selectors.homePagePO.EMAIL + " input")
      let text = (await email.getAttribute("value")).toString()
      await io.assert.expectToContainValue( process.env["IO_UserName"], text, "");
      name = await io.homePage.copyResourceData(
        selectors.connectionsPagePO.NAME_INPUT
      );
      await io.assert.expectToContainValue("Automation",name, "");
    var company = (await io.homePage.getText(selectors.homePagePO.COMPANY + " input")).toString();
    await io.assert.expectToContainValue(company, "celigo", "");
await test.step(
      "***  Verified All the fields that were set while signing up are to be shown by default ***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to Home Page   ***",()=>{});
  });
});
