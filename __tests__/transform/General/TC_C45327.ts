
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C45327 | Golden", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C45327", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.selectTabInHelperMenu("Product Portal");
    await test.step("*** Navigating to product portal ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonBasedOnLabelName(
      "[href='/wcpkv3awtdpkze4x7wwbpog7/tabs/10-planned']",
      "Planned"
    );
    await test.step("*** Switch to Planned tab ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.clickButtonBasedOnLabelName(
      "[href='/wcpkv3awtdpkze4x7wwbpog7/tabs/8-in-progress']",
      "In progress"
    );
    await test.step("*** Switch to Inprogress tab ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.clickButtonBasedOnLabelName(
      "[href='/wcpkv3awtdpkze4x7wwbpog7/tabs/9-released']",
      "Released"
    );
    await test.step("*** Switch to Released tab ***",()=>{});
await test.step(
      "*** Verified User should be able to switch between the tabs in product portal ***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
