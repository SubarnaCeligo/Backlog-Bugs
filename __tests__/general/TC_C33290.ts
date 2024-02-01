
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C33290", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C33290", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Validating check box ***",()=>{});

    var val = await page.locator(
      selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    ).isChecked();
    await io.homePage.isPageLoaded();
    if(val === true) {
      await test.step("*** Clicking on check box is true ***",()=>{});
    } else {
      await io.homePage.click(selectors.myAccountPagePO.SHOWTIMESTAMPRELATIVE);
      await test.step("*** Clicking On check box ***",()=>{});
      await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      await test.step("*** Clicked on Save Button ***",()=>{});
    }

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    await test.step("*** clicked on connection button",()=>{});
    await io.homePage.loadingTime();

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var result1 = await page.$$(
      selectors.myAccountPagePO.LOCAL_DATE_TIME
    )[2].getText();
    await io.assert.expectToBeValue(result1, "days ago", "");
    await io.assert.expectToBeValue(result1, "hours ago", "");

    await test.step(" Verified Last updated column time is displayed in relative uri format in Connections section ***",()=>{});

    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Clicked on Profile ***",()=>{});
    await io.homePage.click(selectors.myAccountPagePO.SHOWTIMESTAMPRELATIVE);
    await test.step("*** Clicking On check box ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await test.step("*** Clicked on Save Button ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    await test.step("*** clicked on connection button",()=>{});
    await io.homePage.loadingTime();

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var result3 = await page.$$(
      selectors.myAccountPagePO.RELATIVE_DATE_TIME
    )[2].getText();
    await io.assert.expectToBeValue(result3, "am", "");
    await io.assert.expectToBeValue(result3, "pm", "");

    await test.step(" Verified Last updated column time is displayed in Exact date and time format in Connections section ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
