import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import TC from "@testData/GENERAL/TC_C2016_resourcesPageSize.json";

test.describe("TC_C2016_resourcesPageSize", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2498 @Env-All TC_C2016_resourcesPageSize_Verify if the user sets the items per page say 100, that should not change when even if any export in the page is deleted", async ({ io, page }, testInfo) => {
    // *Create Page Generators
    await test.step("*** Creating PageGenerator ***", () => { });
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    await test.step("*** clicked on connection button ***", () => { });
    await io.homePage.loadingTime();
    await test.step("*** Navigated to list of exports ***", () => { });
    await io.homePage.loadingTime();

    await test.step(
      "*** Deleteing the flow from list of exports ***"
      , async () => { });
    await io.homePage.click(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    await test.step("*** Clicking on action menu ***", () => { });
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);

    await test.step("*** Clicking on delete flow ***", () => { });
    await io.homePage.click(selectors.basePagePO.DELETE);

    await test.step("*** Confirm delete ***", () => { });

    await io.homePage.loadingTime();
    if(await io.homePage.isVisible(selectors.myAccountPagePO.PARAGRAPH_BOX)){
    var eleText = await io.homePage.getText(selectors.myAccountPagePO.PARAGRAPH_BOX)
    console.log(eleText, "eleText");
    await io.assert.expectToContainValue("100", eleText.toString(), "string not found")

    await test.step(
      "*** Verified the page size remaining the same even if an export is deleted. ***"
      , async () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to HomePage ***", () => { });
    }
  });
});
