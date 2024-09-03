import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C33285", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1466 @Env-All TC_C33285 Verify if the user unchecked the checkbox, on all the dashboards it is displayed in exact date and time format as mentioned in the profile.", async ({io,page}, testInfo) => {
    var checkBox1;
    var lastUpdatedArray1;
    var lastUpdatedArray2;
    var getid;
    var lastUpdatedArray3;
    let lastUpdated4;
    var lastUpdatedArray5;
    let lastUpdated6;
    await io.homePage.click(
      selectors.basePagePO.ACCOUNT_BUTTON
    );
    await test.step("*** Navigate to My Account ***",()=>{});
    await io.homePage.click(
        selectors.myAccountPagePO.PROFILE
    );
    await test.step("*** Navigate to My Profile ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
   
      checkBox1 = await (
        await page.locator(
           selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
        )
      ).getAttribute("value");

      console.log(checkBox1, 'checkBox1');
      if(checkBox1 === "true") {
        await io.homePage.click(
          selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
        );
      }

      checkBox1 = await (
        await page.locator(
           selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
        )
      ).getAttribute("value");
     
      await io.assert.expectToBeValue(checkBox1, "false", "");
await test.step(
        "*** Verified Show timestamps as relative is unchecked below the Time format dropdown  ***"
, async ()=>{});

      await io.homePage.goToMenu("Resources","Connections");
      await io.homePage.isPageLoaded();
      await io.homePage.click(
        selectors.flowBuilderPagePO.SEARCHBUTTON
      );
      await io.homePage.fillWebPage(
        selectors.flowBuilderPagePO.SEARCHBUTTON,
        "FTP CONNECTION"
      );
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      let lastUpdated1 = await page.$$(
        selectors.myAccountPagePO.RELATIVE_DATE_TIME
      );
      lastUpdatedArray1 = [];
      for (let i of lastUpdated1) {
        let text = await i.textContent();
        if (text != "") {
          lastUpdatedArray1.push(text);
        }
      }
      if(lastUpdatedArray1[0].includes("am")) {
      await io.assert.expectToContainValue("am",lastUpdatedArray1[0],"");
      }
      if(lastUpdatedArray1[0].includes("pm")) {
      await io.assert.expectToContainValue("pm",lastUpdatedArray1[0], "");
      }
await test.step(
        "*** Verified the Timestamp on Connections page  ***"
, async ()=>{});
      await io.homePage.isPageReady();
      await io.homePage.goToMenu("Resources","API tokens");
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.flowBuilderPagePO.SEARCHBUTTON
      );
      await io.homePage.fillWebPage(
        selectors.flowBuilderPagePO.SEARCHBUTTON,
        "IO API TOKEN"
      );
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      let lastUpdated2 = await page.$$(
        selectors.myAccountPagePO.RELATIVE_DATE_TIME
      );
      lastUpdatedArray2 = [];
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
        await io.assert.expectToContainValue("pm",lastUpdatedArray2[0], "");
        }
await test.step(
        "*** Verified the Timestamp on Api tokens page  ***"
, async ()=>{});
      await io.goToFlowsPage();
      await io.homePage.isPageLoaded();
      await io.homePage.click(
        selectors.flowBuilderPagePO.SEARCHBUTTON
      );
      await io.homePage.fillWebPage(
        selectors.flowBuilderPagePO.SEARCHBUTTON,
        "TC_C22324_DND"
      );
      await test.step("*** Navigating to   Flows page ***",()=>{});
      getid = await io.api.getFlowId("TC_C22324_DND");
      await io.flowBuilder.navigateToTheFlow( getid);
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      let lastUpdated3 = await page.$$(
        selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1
      );
      lastUpdatedArray3 = [];
      for (let i of lastUpdated3) {
        let text = await i.textContent();
        if (text != "") {
          lastUpdatedArray3.push(text);
        }
      }
      if(lastUpdatedArray2[0].includes("days ago")) {
        await io.assert.expectToContainValue("days ago",lastUpdatedArray2[0],"");
        }
        if(lastUpdatedArray2[0].includes("hours ago")) {
        await io.assert.expectToContainValue("hours ago",lastUpdatedArray2[0], "");
        }

await test.step(
        "*** Verified the Timestamp on Run console page  ***"
, async ()=>{});
  });
});
