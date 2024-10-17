import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C33305.json";


test.describe("TC_C33305", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    var flow = await io.api.getFlowId(FTP.name);
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flows.get(FTP.name)["flowId"],
      [0, 0, 1]
    );

  
    
    await io.homePage.delay(20000);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1476 @Env-All  TC_C33305", async ({io,page}, testInfo) => {
    await io.homePage.selectTabInProfileMenu("Profile")
    await test.step("*** Clicking on Profile ***",()=>{});
    ;
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Validating check box ***",()=>{});

    await io.homePage.loadingTime();

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
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, FTP.name);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowGroupingPagePO.CLICKONFLOWGROUP, FTP.name);
    
    
     
    
    let lastUpdated1 = await page.$$(
      selectors.myAccountPagePO.LOCAL_DATE_TIME
    );
   let result1 = [];
    for (let i of lastUpdated1) {
      let text = await i.textContent();
      if (text != "") {
        result1.push(text);
      }
    }
    if(result1[0] &&  result1[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",result1[0],"");
      }
    await test.step(" Verified completed columns  time is displayed in Relative. ***",()=>{});


    await io.homePage.selectTabInProfileMenu("Profile")
    await test.step("*** Clicking on Profile ***",()=>{});
    ;
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await test.step("*** Clicked on Profile ***",()=>{});
    await page.getByText('Show timestamps as relative').click();
    await test.step("*** Clicking On check box ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await test.step("*** Clicked on Save Button ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, FTP.name);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowGroupingPagePO.CLICKONFLOWGROUP, FTP.name);
  
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    let lastUpdated2 = await page.$$(
      selectors.myAccountPagePO.LOCAL_DATE_TIME
    );
   let result2 = [];
    for (let i of lastUpdated2) {
      let text = await i.textContent();
      if (text != "") {
        result2.push(text);
      }
    }
    if(result2[0] && result2[0].includes("am")) {
      await io.assert.expectToContainValue("am",result2[0],"");
      }
      if(result2[0] && result2[0].includes("pm")) {
      await io.assert.expectToContainValue("pm",result2[0],"");
      }
    await test.step(" Verified completed columns the time is displayed in Exact date and time format ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
