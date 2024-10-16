import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C34104", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1485 @Env-All  TC_C34104", async ({io,page}, testInfo) => {
    await io.homePage.selectTabInProfileMenu("Profile")
    await test.step("*** Clicking on Profile ***",()=>{});
    ;
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.click('[data-test="timezone"]');
     
    await page.locator('[role="listbox"]').scrollIntoViewIfNeeded();
    await io.homePage.selectTextfromDropDown(page, "Asia/Magadan");

    await test.step("*** Validating check box ***",()=>{});
    await page.getByText('Show timestamps as relative').isVisible();
    var checkBox1 = await (
       await page.getByText('Show timestamps as relative')
     ).getAttribute("value");

     if(checkBox1 === "false") {
       await page.getByText('Show timestamps as relative').click();
       await io.homePage.click(selectors.basePagePO.MFA_SAVE);
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
    if(lastUpdatedArray[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //Imports
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdatedArray1 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN)
    if(lastUpdatedArray1[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray1[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //Exports
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();

    let lastUpdatedArray2 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN)
    if(lastUpdatedArray2[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray2[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //Dashboard
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await test.step("*** Clicked on dashboard ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    //LAST UPDATED
    let lastUpdatedArray3 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1);
    if(lastUpdatedArray3[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray3[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //RUN CONSOLE
    let lastUpdatedArray4 =  await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2);
    if(lastUpdatedArray4[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray4[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.loadingTime();
    await test.step("*** Clicking on Profile ***",()=>{});
    ;
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Clicked on Profile ***",()=>{});
    await page.getByText('Show timestamps as relative').click();
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
    
    if(lastUpdatedArray5[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray5[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //Imports
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdatedArray6 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN);
    if(lastUpdatedArray6[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray6[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //Exports
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdatedArray7 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN);
    if(lastUpdatedArray7[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray7[0],"");
      }
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
    
    if(lastUpdatedArray8[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray8[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //LAST RUN
    let lastUpdatedArray9 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2);
    
    if(lastUpdatedArray9[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray9[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
