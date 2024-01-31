
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C33305.json";

test.describe("TC_C33287", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C33287", async ({io,page}, testInfo) => {
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
    await io.homePage.isPageLoaded();
    await io.goToFlowsPage();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(selectors.basePagePO.SEARCH_RECYCLEBIN, FTP.name);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowGroupingPagePO.CLICKONFLOWGROUP, FTP.name);
    
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var result1 = await page.$$(
      selectors.myAccountPagePO.LOCAL_DATE_TIME
    )[2].getText();
    await io.assert.expectToBeValue(result1, "days ago", "");
    await io.assert.expectToBeValue(result1, "hours ago", "");

    await test.step(" Verified started column time is displayed in Relative in run history tab ***",()=>{});

    var result2 = await page.$$(
      selectors.myAccountPagePO.LOCAL_DATE_TIME
    )[3].getText();
    await io.assert.expectToBeValue(result2, "days ago", "");
    await io.assert.expectToBeValue(result2, "hours ago", "");
    await test.step(" Verified completed column time is displayed in Relative in run history tab ***",()=>{});

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
    await io.homePage.isPageLoaded();
    await io.goToFlowsPage();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(selectors.basePagePO.SEARCH_RECYCLEBIN, FTP.name);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowGroupingPagePO.CLICKONFLOWGROUP, FTP.name);
    
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    var result3 = await page.$$(
      selectors.myAccountPagePO.RELATIVE_DATE_TIME
    )[2].getText();
    await io.assert.expectToBeValue(result3, "am", "");
    await io.assert.expectToBeValue(result3, "pm", "");

    await test.step(" Verified started column time is displayed in Exact date and time format in Run history tab ***",()=>{});
    var result4 = await page.$$(
      selectors.myAccountPagePO.RELATIVE_DATE_TIME
    )[3].getText();
    await io.assert.expectToBeValue(result4, "am", "");
    await io.assert.expectToBeValue(result4, "pm", "");
    await test.step(" Verified completed columns time is displayed in Exact date and time format in Run history tab***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
