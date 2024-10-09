import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C33341_restore_pin_integration", () => {
  let intId;
  const integrationData2 = {
    qa__api_tdata: [
      {
        createIntegrations: {
          name: "C33341_integration",
        },
      },
    ],
  };
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io}) => {
    test.step("*** Deleting Integration ***", async ()=>{});
    await io.api.deleteIntegration(intId);
  });
  test("@Env-All @Zephyr-IO-T2925", async ({io}) => {
    await io.homePage.loadingTime();
    intId = await io.api.createIntegrationThruAPI(integrationData2);
    await io.integrationPage.navigateToIntegrationById(intId);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.fill(
      selectors.integrationPagePO.HOME_SEARCH,
      "C33341"
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    test.step("*** clicking on the listview ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );
    test.step("*** clicking on the action menu ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.PIN_INTEGRATION);
    test.step("*** selecting the pin integration ***", async ()=>{});

    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.click(
      selectors.homePagePO.DELETE_INTEGRATION
    );
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("*** deleting the pinned integration ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Recycle bin");
    test.step("Clicked on recycle bin button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Navigate to recyclebin ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fill(
      selectors.basePagePO.SEARCH_RECYCLEBIN,
      "33341"
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.RESTORE,
      0
    );
await test.step(
      "*** Restoring the deleted pinned integration ***"
, async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    var logPin = await io.homePage.isVisible(
      "table > tbody > tr > th svg"
    );
    await io.assert.expectToBeTrue(logPin, "");
await test.step(
      "pinned integrations are displayed by 'Pin' icon test.beforeEach the Name."
, async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.UNPIN_INTEGRATION
    );
    test.step("unpinned the integration .", async ()=>{});
    await io.homePage.click(
      selectors.homePagePO.TILE_VIEW
    );
    test.step("clicking on the grid view .", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("Navigating to home page", async ()=>{});
  });
});
