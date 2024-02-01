
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/GENERAL/TC_C2016_resourcesPageSize.json";

test.describe("TC_C2016_resourcesPageSize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C2016_resourcesPageSize", async ({io,page}, testInfo) => {
    // *Create Page Generators
    await test.step("*** Creating PageGenerator ***",()=>{});
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    await test.step("*** clicked on connection button ***",()=>{});
    await io.homePage.loadingTime();
    await test.step("*** Navigated to list of exports ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

await test.step(
      "*** Deleteing the flow from list of exports ***"
, async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    await test.step("*** Clicking on action menu ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);

    await test.step("*** Clicking on delete flow ***",()=>{});
    await io.homePage.click(selectors.basePagePO.DELETE);

    await test.step("*** Confirm delete ***",()=>{});

    var eleText = await(await page.$(selectors.myAccountPagePO.PARAGRAPH_BOX)).textContent()
    let text = eleText.split(" ")
    await expect(text[2]).toContain("100");

await test.step(
      "*** Verified the page size remaining the same even if an export is deleted. ***"
, async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to HomePage ***",()=>{});
  });
});
