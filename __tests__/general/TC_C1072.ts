
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1072", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C1072", async ({io,page}, testInfo) => {
    let actualFlowsCount = await io.api.getAllEnabledFlowsCount();
    await test.step("*** Navigating to profile page ***",()=>{});
    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await test.step("*** Clicked on Profile Menu ***",()=>{});

    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await io.homePage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await test.step("*** Clicked on subscription tab ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    let flowsCount = "//span[contains(text(),'Integration flows:')]/following-sibling::span/span"
    let expectedflowsCount = Number(flowsCount);
    expect(expectedflowsCount).toEqual(actualFlowsCount);
  });
});
