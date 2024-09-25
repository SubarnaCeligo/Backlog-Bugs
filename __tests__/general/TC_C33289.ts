import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C23879 from "@testData/EM2.0/TC_C23879.json";


test.describe("TC_C33289", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C23879);
    await test.step(
          "Created Flow " +
            flows.get(TC_C23879.name)["flowName"] +
            " With ID " +
            flows.get(TC_C23879.name)["flowId"],async () => {
              
            }
        );
    
        await io.api.checkJobStatusFromAPI(
          TC_C23879.name,
          flows.get(TC_C23879.name)["flowId"],
          [1, 0, 1]
        );
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1470 @Env-All  TC_C33289_dashboard", async ({io,page}, testInfo) => {
    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.loadingTime();
    await test.step("*** Clicking on Profile ***",()=>{});
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
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await test.step("*** Clicked on dashboard ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    //LAST UPDATED
    let lastUpdatedArray = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1)
    if(lastUpdatedArray[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray[0],"");
      }
      if(lastUpdatedArray[0].includes("now")) {
      await io.assert.expectToContainValue("now",lastUpdatedArray[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    //RUN CONSOLE
    let lastUpdatedArray2 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2)
    if(lastUpdatedArray2[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray2[0],"");
      }
      if(lastUpdatedArray2[0].includes("now")) {
      await io.assert.expectToContainValue("now",lastUpdatedArray2[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await io.homePage.loadingTime();
    await test.step("*** Clicking on Profile ***",()=>{});
    ;
    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.loadingTime();
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
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.isVisible(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    //LAST UPDATED
    let lastUpdatedArray1 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1)
    if(lastUpdatedArray1[0].includes("am")) {
      await io.assert.expectToContainValue("am",lastUpdatedArray1[0],"");
      }
      if(lastUpdatedArray1[0].includes("pm")) {
      await io.assert.expectToContainValue("pm",lastUpdatedArray1[0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    //LAST RUN
    let lastUpdatedArray3 = await io.homePage.getText(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2)
    if(lastUpdatedArray3[0].includes("am")) {
      await io.assert.expectToContainValue("am",lastUpdatedArray3[0],"");
      }
      if(lastUpdatedArray3[0].includes("pm")) {
      await io.assert.expectToContainValue("pm",lastUpdatedArray3 [0],"");
      }
    await test.step(" Verified Last updated columns the time is displayed in Exact date and time format ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
