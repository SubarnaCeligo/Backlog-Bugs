import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C23879 from "@testData/EM2.0/TC_C23879.json";

test.describe("TC_C33287", () => {
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
  });
  test("@Zephyr-IO-T1468 @Env-All TC_C33287_verifying_if_checkbox_is checked", async ({io,page}, testInfo) => {
    var checkBox1;
    var lastUpdatedArray1;
    var lastUpdatedArray2;
    var getid;
    var lastUpdatedArray3;
    var lastUpdatedArray5;
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.loadingTime();
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

       checkBox1 = await (
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
    await io.homePage.isPageLoaded();
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime();
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
      await io.homePage.loadingTime();
      let lastUpdated1 = await page.$$(
        selectors.myAccountPagePO.LOCAL_DATE_TIME
      );
      lastUpdatedArray1 = [];
      for (let i of lastUpdated1) {
        let text = await i.textContent();
        if (text != "") {
          lastUpdatedArray1.push(text);
        }
      }
      if(lastUpdatedArray1[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray1[0],"");
      }
     
      await io.homePage.loadingTime();
await io.goToFlowsPage();
await io.homePage.isPageLoaded();
await io.homePage.loadingTime();
await io.homePage.click(
  selectors.flowBuilderPagePO.SEARCHBUTTON
);
await io.homePage.fillWebPage(
  selectors.flowBuilderPagePO.SEARCHBUTTON,
  "TC_C23879"
);
await io.homePage.loadingTime();
await test.step("*** Navigating to   Flows page ***",()=>{});
getid = await io.api.getFlowId("TC_C23879");
await io.homePage.loadingTime();
await io.flowBuilder.navigateToTheFlow( getid);
await io.homePage.loadingTime();
await io.homePage.isPageLoaded();
await io.homePage.isPageReady();
let lastUpdated3 = await page.$$(
  selectors.myAccountPagePO.LOCAL_DATE_TIME
);
lastUpdatedArray3 = [];
for (let i of lastUpdated3) {
  let text = await i.textContent();
  if (text != "") {
    lastUpdatedArray3.push(text);
  }
}
if(lastUpdatedArray3[0].includes(" ago")) {
  await io.assert.expectToContainValue("ago",lastUpdatedArray3[0],"");
  }
if(lastUpdatedArray3[0].includes("now")) {
  await io.assert.expectToContainValue("now",lastUpdatedArray3[0],"");
  }
  
await test.step(
  "*** Verified the Timestamp on Run console page  ***"
, async ()=>{});
var checkBox2;
var lastUpdatedArray4;
var lastUpdatedArray5;
var getid2;
var lastUpdatedArray6;

await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
await io.homePage.loadingTime();
await io.homePage.selectTabInProfileMenu("Profile")
await io.homePage.loadingTime();
await test.step("*** Navigate to My Profile ***",()=>{});
await io.homePage.isPageLoaded();
await io.homePage.isPageReady();

  checkBox2 = await (
    await page.locator(
       selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    )
  ).getAttribute("value");

  if(checkBox2 === "true") {
    await io.homePage.click(
      selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    );
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
  }

  checkBox2 = await (
    await page.locator(
       selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    )
  ).getAttribute("value");
 
  await io.assert.expectToBeValue(checkBox2, "false", "");
await test.step(
    "*** Verified Show timestamps as relative is unchecked below the Time format dropdown  ***"
, async ()=>{});
await io.homePage.loadingTime();
  await io.homePage.goToMenu("Resources","Connections");
  await io.homePage.loadingTime();
  await io.homePage.isPageLoaded();
  await io.homePage.click(
    selectors.flowBuilderPagePO.SEARCHBUTTON
  );
  await io.homePage.fillWebPage(
    selectors.flowBuilderPagePO.SEARCHBUTTON,
    "FTP CONNECTION"
  );
  await io.homePage.loadingTime();
  await io.homePage.isPageLoaded();
  await io.homePage.isPageReady();
  let lastUpdated6 = await page.$$(
    selectors.myAccountPagePO.RELATIVE_DATE_TIME
  );
  lastUpdatedArray4 = [];
  for (let i of lastUpdated6) {
    let text = await i.textContent();
    if (text != "") {
      lastUpdatedArray4.push(text);
    }
  }
  if(lastUpdatedArray4[0].includes("am")) {
  await io.assert.expectToContainValue("am",lastUpdatedArray4[0],"");
  }
  if(lastUpdatedArray4[0].includes("pm")) {
  await io.assert.expectToContainValue("pm",lastUpdatedArray4[0], "");
  }
await test.step(
    "*** Verified the Timestamp on Connections page  ***"
, async ()=>{});
  await io.homePage.isPageReady();
  await io.homePage.goToMenu("Resources","API tokens");
  await io.homePage.loadingTime();
  await io.homePage.isPageLoaded();
  await io.homePage.isPageReady();
  await io.homePage.click(
    selectors.flowBuilderPagePO.SEARCHBUTTON
  );
  await io.homePage.fillWebPage(
    selectors.flowBuilderPagePO.SEARCHBUTTON,
    "IO API TOKEN"
  );
  await io.homePage.loadingTime();
  await io.homePage.isPageLoaded();
  await io.homePage.isPageReady();
  let lastUpdated4 = await page.$$(
    selectors.myAccountPagePO.RELATIVE_DATE_TIME
  );
  lastUpdatedArray5 = [];
  for (let i of lastUpdated4) {
    let text = await i.textContent();
    if (text != "") {
      lastUpdatedArray5.push(text);
    }
  }
  if(lastUpdatedArray5[0].includes("am")) {
    await io.assert.expectToContainValue("am",lastUpdatedArray5[0],"");
    }
    if(lastUpdatedArray5[0].includes("pm")) {
    await io.assert.expectToContainValue("pm",lastUpdatedArray5[0], "");
    }
await test.step(
    "*** Verified the Timestamp on Api tokens page  ***"
, async ()=>{});
await io.homePage.loadingTime();
  await io.goToFlowsPage();
  await io.homePage.isPageLoaded();
  await io.homePage.loadingTime();
  await io.homePage.click(
    selectors.flowBuilderPagePO.SEARCHBUTTON
  );
  await io.homePage.fillWebPage(
    selectors.flowBuilderPagePO.SEARCHBUTTON,
    "TC_C23879"
  );
  await io.homePage.loadingTime();
  await test.step("*** Navigating to   Flows page ***",()=>{});
  getid2 = await io.api.getFlowId("TC_C23879");
  await io.flowBuilder.navigateToTheFlow( getid2);
  await io.homePage.loadingTime();
  await io.homePage.isPageLoaded();
  await io.homePage.isPageReady();
  let lastUpdated5 = await page.$$(
    selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1
  );
  lastUpdatedArray6 = [];
  for (let i of lastUpdated5) {
    let text = await i.textContent();
    if (text != "") {
      lastUpdatedArray6.push(text);
    }
  }
  if(lastUpdatedArray6[0].includes("am")) {
    await io.assert.expectToContainValue("am",lastUpdatedArray6[0],"");
    }
    if(lastUpdatedArray6[0].includes("pm")) {
    await io.assert.expectToContainValue("pm",lastUpdatedArray6[0], "");
    }

await test.step(
    "*** Verified the Timestamp on Run console page  ***"
, async ()=>{});

    
  });
});
