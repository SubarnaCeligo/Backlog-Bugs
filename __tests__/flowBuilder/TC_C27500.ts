
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C27500", () => {
  test.beforeEach(async ({io},) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2831|To sort the resources using the column headers i.e Last updated column", async ({io}) => {
    await io.homePage.loadingTime();
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    var connectionNameBeforeSorting = await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW);
    await io.homePage.clickByIndex(selectors.dashboardPagePO.DOWNWARD_ARROW, 1);
    test.step("*** clicked on Last updated***", async ()=>{});
    var connectionNameAfterSorting = await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW);
    expect(connectionNameBeforeSorting).not.toEqual(connectionNameAfterSorting);

    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    var connectionNameBeforeSortingInIntegration = await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW);
    await io.homePage.clickByIndex(selectors.dashboardPagePO.DOWNWARD_ARROW, 1);
    test.step("*** clicked on Last updated***", async ()=>{});
    var connectionNameAfterSortingInIntegration = await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW);
    test.step("*** Sorting is working properly in Connection page***", async ()=>{});
    expect(connectionNameBeforeSortingInIntegration).not.toEqual(connectionNameAfterSortingInIntegration);
    test.step("*** Sorting is working properly for Connection page inside an integration.***", async ()=>{});
  });
});
