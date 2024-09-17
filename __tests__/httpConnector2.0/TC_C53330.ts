
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C53330 Verify the dropdown support for Query Parameters for Greenhouse Export", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17115 @Env-All TC_C53330 Verify the dropdown support for Query Parameters for Greenhouse Export", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.GREENHOUSE);
    test.step("*** Selected Greenhouse as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Approvals"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Pending"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "type"
    );
    test.step("*** Selecting Query parameter ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_VALUE0
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.MENU_ITEM,
      1
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Users should be able to select the value from dropdown",
      async ()=>{}
    );
  });
});
