import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C1072", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2227 @Env-All TC_C1072 Verify the remaining and consumed flow numbers", async ({ io, page }, testInfo) => {
    let actualFlowsCount = await io.api.getAllEnabledFlowsCount();
    await test.step("*** Navigating to profile page ***", () => { });
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await test.step("*** Clicked on Profile Menu ***", () => { });
    await io.homePage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await test.step("*** Clicked on subscription tab ***", () => { });

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();


    let flowsCount = (await io.homePage.getText(selectors.myAccountPagePO.SUBSCRIPTION_DATA))
    console.log(flowsCount, actualFlowsCount);
    let expectedflowsCount = Number(flowsCount[2]);
     expect(expectedflowsCount).toEqual(actualFlowsCount);

  });
});
