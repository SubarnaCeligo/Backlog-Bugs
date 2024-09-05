
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51537", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18885 @Env-All TC_C51537", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Click on Add source button ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.ADD_SOURCE_BUTTON
    );
    test.step("*** Selecting application ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Selecting orderful Connection***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "ORDERFUL CONNECTION");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Relationship"
    );
    test.step("Selecting resource type", async ()=>{});
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "List"
    );
    test.step("Selecting API Endpoint", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.SCRIPTS_LIST,
      "limit"
    );
    test.step("Selecting Query parameter", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
await test.step(
      "Verified Users should be able to select which query parameter can be applied"
, async ()=>{});
  });
});
