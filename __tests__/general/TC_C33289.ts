
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C33289", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C33289_dashboard", async ({io,page}, testInfo) => {
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

    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await test.step("*** Clicked on dashboard ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    //LAST UPDATED
    let lastUpdatedArray = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1)
    await io.assert.expectToBeValueInArray(lastUpdatedArray, "days ago", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray, "hours ago", "");
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //RUN CONSOLE
    let lastUpdatedArray2 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2)
    await io.assert.expectToBeValueInArray(lastUpdatedArray2, "days ago", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray2, "hours ago", "");
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

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
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await test.step("*** Clicked on dashboard ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    //LAST UPDATED
    let lastUpdatedArray1 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1)
    await io.assert.expectToBeValueInArray(lastUpdatedArray1, "am", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray1, "pm", "");
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //LAST RUN
    let lastUpdatedArray3 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2)
    await io.assert.expectToBeValueInArray(lastUpdatedArray3, "am", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray3, "pm", "");
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
