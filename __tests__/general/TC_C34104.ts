
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C34104", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C34104", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.myAccountPagePO.TIMEZONE, "America/Los_Angeles");

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

    //Connections
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    await test.step("*** clicked on connection button",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    let lastUpdatedArray = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2)
    await io.assert.expectToBeValueInArray(lastUpdatedArray, "days ago", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray, "hours ago", "");
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //Imports
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdatedArray1 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN)
    
    await io.assert.expectToBeValueInArray(lastUpdatedArray1, "days ago", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray1, "hours ago", "");
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //Exports
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();

    let lastUpdatedArray2 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN)
    await io.assert.expectToBeValueInArray(lastUpdatedArray2, "days ago", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray2, "hours ago", "");
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //Dashboard
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await test.step("*** Clicked on dashboard ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    //LAST UPDATED
    let lastUpdatedArray3 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1);
    
    await io.assert.expectToBeValueInArray(lastUpdatedArray3, "days ago", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray3, "hours ago", "");
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //RUN CONSOLE
    let lastUpdatedArray4 =  await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2);
    
    await io.assert.expectToBeValueInArray(lastUpdatedArray4, "days ago", "");
    await io.assert.expectToBeValueInArray(lastUpdatedArray4, "hours ago", "");
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

    //Connections
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    await test.step("*** clicked on connection button",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    let lastUpdatedArray5 =await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2);
    
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray5, "am", "");
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray5, "pm", "");
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //Imports
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdatedArray6 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN);
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray6, "am", "");
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray6, "pm", "");
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //Exports
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdatedArray7 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN);
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray7, "am", "");
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray7, "pm", "");
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //Dashboard
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await test.step("*** Clicked on dashboard ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    //LAST UPDATED
    let lastUpdatedArray8 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1);
    
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray8, "am", "");
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray8, "pm", "");
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //LAST RUN
    let lastUpdatedArray9 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2);
    
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray9, "am", "");
    await io.assert.expectNotToBeValueInArray(lastUpdatedArray9, "pm", "");
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
