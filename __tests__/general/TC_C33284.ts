import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C33284", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1465 @Env-All TC_C33284 Verify user is able to select or deselect the checkbox and save the changes.", async ({io,page}, testInfo) => {
    await io.homePage.selectTabInProfileMenu("Profile")
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step("*** Validating check box ***",()=>{});

    var val = await page.getByText('Show timestamps as relative').isChecked();
    await io.homePage.isPageLoaded();
    if(val === true) {
      await test.step("*** Clicking on check box is true ***",()=>{});
    } else {
      await page.getByText('Show timestamps as relative').click();
      await test.step("*** Clicking On check box ***",()=>{});
      await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      await test.step("*** Clicked on Save Button ***",()=>{});
    }
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
