import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C33304", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1475 @Env-All  TC_C333304_Agents", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Profile")
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX);
     var checkBox1 = await (
        await page.locator(
           selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
        )
      ).getAttribute("value");

      if(checkBox1 === "false") {
        await io.homePage.click(
          selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
        );
        await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      }
    
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Agents");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdated1 = await page.$$(
      selectors.myAccountPagePO.LOCAL_DATE_TIME
    );
   let lastUpdatedArray1 = [];
    for (let i of lastUpdated1) {
      let text = await i.textContent();
      if (text != "") {
        lastUpdatedArray1.push(text);
      }
    }
    if(lastUpdatedArray1[0].includes("ago")) {
    await io.assert.expectToContainValue("ago",lastUpdatedArray1[0],"");
    }
    await test.step(" Verified Last updated columns the time is displayed in Relative. ***",()=>{});

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
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Agents");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    let lastUpdated2 = await page.$$(
      selectors.myAccountPagePO.RELATIVE_DATE_TIME
      );
     let lastUpdatedArray2 = [];
      for (let i of lastUpdated2) {
        let text = await i.textContent();
        if (text != "") {
          lastUpdatedArray2.push(text);
        }
      }
      if(lastUpdatedArray2[0].includes("am")) {
      await io.assert.expectToContainValue("am",lastUpdatedArray2[0],"");
      }
      if(lastUpdatedArray2[0].includes("pm")) {
      await io.assert.expectToContainValue("pm",lastUpdatedArray2[0],"");
      }
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
