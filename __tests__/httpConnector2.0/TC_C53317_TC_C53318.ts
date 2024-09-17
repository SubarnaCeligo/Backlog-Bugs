
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C53317_TC_C53318 Verify user is able to delete the Query Parameter for 3PL Central Export", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17111 @Env-All TC_C53317 Verify user is able to delete the Query Parameter for 3PL Central Export and Resource as Billing", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "3PL CENTRAL CONNECTION"
    );
    await test.step(
      "*** Choosing the desired 3pl central connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Billing"
    );
    test.step("*** Selecting Resource ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Customer itemized charges list"
    );
    test.step("*** Selecting Endpoint ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_NAME2
    );
    await io.homePage.fill(
      selectors.connectionsPagePO.APPLICATION_NAME2,
      "o"
    );

    test.step("*** Selecting Query parameter ***", async ()=>{});
    const button = selectors.mappings.MAPPER2DOT0PO.TRANSFORMRULES;
    await io.assert.verifyElementToBeClickable(button);
    await io.homePage.click(button);
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
  test("@Zephyr-IO-T17112 @Env-All TC_C53318 Verify user is able to delete the Query Parameter for 3PL Central Export and Resource as Customers", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "3PL CENTRAL CONNECTION"
    );
    await test.step(
      "*** Choosing the desired 3pl central connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Customers"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Items : get aliases"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "contains"
    );
    test.step("*** Selecting Query parameter ***", async ()=>{});
    var button1 =
       selectors.mappings.DELETEFIRST
    ;
    await io.assert.verifyElementToBeClickable(button1);
    await io.homePage.click(
       selectors.mappings.DELETEFIRST
    );
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
