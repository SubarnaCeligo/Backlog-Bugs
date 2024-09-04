import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/GENERAL/TC_C1089.json";

test.describe("TC_C1089", () => {
  var integrationIds;
  integrationIds = [];
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Creating Required Resources ***", () => { });
    const integrationId = await io.api.createIntegrationThruAPI(
      TC.integrationDetails
    );
    integrationIds.push(integrationId);
    await test.step("Integration created", () => { });
  });

  test("@Zephyr-IO-T6797 @Env-All TC_C1089", async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.fill(
      selectors.integrationPagePO.HOME_SEARCH,
      "TC_C1089"
    );
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await test.step("***Clicked Action Dropdown***", () => { });
    await io.homePage.click(
      selectors.homePagePO.DELETE_INTEGRATION
    );
    await test.step("***Clicked Delete Integration***", () => { });
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await test.step("***Clicked on Confirm Delete Integration***", () => { });
    await io.homePage.isPageLoaded();
    await io.homePage.click(
      selectors.homePagePO.TILE_VIEW
    );
    await io.homePage.navigateTo(
      io.connectorUrl + "recycleBin"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(
      selectors.basePagePO.SEARCH,
      "TC_C1089"
    );
    await io.homePage.loadingTime();
    var name = await io.homePage.getText(selectors.basePagePO.NAME1);
    await io.assert.expectToContainValue("TC_C1089", name.toString(), "string not found");
     
    await test.step(
      " Verified We should be able to see the deleted integrations in the Recyclebin. ***"
      , async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***", () => { });
  });
});
