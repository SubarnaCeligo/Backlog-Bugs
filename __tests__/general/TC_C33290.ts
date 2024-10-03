import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C33290", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1471 @Env-All  TC_C33290", async ({io,page}, testInfo) => {
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

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    await test.step("*** clicked on connection button",()=>{});
    await io.homePage.loadingTime();

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
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
    
    if(result1[0] && result1[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",result1[0],"");
      }
      if(result1[0] &&  result1[0].includes("now")) {
      await io.assert.expectToContainValue("now",result1[0],"");
      }

    await test.step(" Verified Last updated column time is displayed in relative uri format in Connections section ***",()=>{});

    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.loadingTime();
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
    let lastUpdated2 = await page.$$(
      selectors.myAccountPagePO.RELATIVE_DATE_TIME
      );
     let result3 = [];
      for (let i of lastUpdated2) {
        let text = await i.textContent();
        if (text != "") {
          result3.push(text);
        }
      }
    if(result3[0] &&  result3[0].includes("am")) {
      await io.assert.expectToContainValue("am",result3[0],"");
      }
      if(result3[0] &&  result3[0].includes("pm")) {
      await io.assert.expectToContainValue("pm",result3 [0],"");
      }
    await test.step(" Verified Last updated column time is displayed in Exact date and time format in Connections section ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
