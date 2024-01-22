
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C20894.json";

test.describe("TC_C20894", () => {
  var test;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C20894", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.isPageLoaded();
    await test.step("*** Navigating to   Flows page ***",()=>{});
    var getid = await io.api.getFlowId("TC_C20894_DND_1");
    // await io.flowBuilder.navigateToTheFlow( getid);
    await io.navigateToFlowBuilderInFB(getid);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS
    );
    await io.homePage.clickButtonByIndex(
      selectors.flowGroupingPagePO.POSTMAPSTUBCREATESCRIPT,
      1
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var paste = await io.homePage.copyResourceData(
      "[id='data']"
    );
    var response = JSON.stringify(paste);
    if (
      process.env["NODE_ENV"] == "qa" ||
      process.env["NODE_ENV"] == "qaprod"
    ) {
      test = JSON.stringify(FTP.qa__expected);
    } else {
      test = JSON.stringify(FTP.expected);
    }
    expect(response).toBe(test);

await test.step(
      "*** Verified Import PostMap Hook Preview Is as expected when we have preMap data in array of array format***"
, async ()=>{});
    await io.homePage.isPageReady();
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
