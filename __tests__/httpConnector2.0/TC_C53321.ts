
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C53321 Verify user is able to delete the Query Parameter for Orderful Export and Resource as Transaction", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17114 @Env-All TC_C53321 Verify user is able to delete the Query Parameter for Orderful Export and Resource as Transaction", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Selected orderful as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "ORDERFUL CONNECTION"
    );
    await test.step(
      "*** Choosing the desired orderful connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Transaction"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "List"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "nextCursor"
    );
    test.step("*** Selecting Query parameter ***", async ()=>{});
    var button =
    selectors.mappings.DELETEFIRST
    ;
    await io.assert.verifyElementToBeClickable(button);
    await test.step(
      "*** Verified if delete button is clickable  ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Users should be able to delete the query parameter",
      async ()=>{}
    );
  });
});
