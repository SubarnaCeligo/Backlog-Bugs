
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22730", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C22730_Verify_Sort_Flows_Connections_Users", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.isPageReady();

    //Flows
    const namehead = await page.locator(selectors.basePagePO.TIME);
    const nameList = selectors.basePagePO.FLOWNAME;
    let order =
      (await namehead.getAttribute("aria-sort")) === "ascending" ? true : false;
    let result = await io.homePage.checkColumnSortedByLocator(nameList, order, "string");
    expect(result).toEqual(true);
    test.step("*** Verified the Flow Name should be sorted alphabetically by default ***", async ()=>{});

    //Connections
    await io.homePage.isPageReady();
    await io.homePage.click("[datatest='Connections']");
    const namehead1 = await page.locator(selectors.basePagePO.TIME);
    const nameList1 = selectors.basePagePO.FLOWNAME;
    let order1 =
      (await namehead1.getAttribute("aria-sort")) === "ascending"
        ? true
        : false;
    let result1 = await io.homePage.checkColumnSortedByLocator(nameList1, order1, "string");
    expect(result1).toEqual(true);
    test.step("*** Verified the Connection Name should be sorted alphabetically by default ***", async ()=>{});

    //Users
    await io.homePage.isPageReady();
    await io.homePage.click("[datatest='Users']");
    const namehead2 = await page.locator(selectors.basePagePO.USERNAME);
    const nameList2 = selectors.basePagePO.FLOWNAME;
    let order2 =
      (await namehead2.getAttribute("aria-sort")) === "ascending"
        ? true
        : false;
    let result2 = await io.homePage.checkColumnSortedByLocator(nameList2, order2, "string");
    expect(result2).toEqual(true);
    test.step("*** Verified the Users Name should be sorted alphabetically by default ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
