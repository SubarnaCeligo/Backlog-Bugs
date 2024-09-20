
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C53307_TC_C53308 Verify user is able to click on handlebar icon", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17102 @Env-All TC_C53307 Verify user is able to click on handlebar icon for Orders Resource", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
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
      "Orders"
    );
    test.step("*** Selecting Resource ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Get all orders"
    );
    test.step("*** Selecting Endpoint ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const handlebarButton = await page.locator(
      selectors.exportsPagePO.QUERY_PARAMETERS_ROW + " " +
      selectors.basePagePO.HANDLEBAR_EDITOR + " " +
      selectors.connectionsPagePO.TEXTCONTENT
    );
    expect(handlebarButton).toBeEnabled();
    await test.step(
      "*** Verified handlebar button is clickable  ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Users should be able to click on handlebar",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17103 @Env-All TC_C53308 Verify user is able to click on handlebar icon for Relationship Resource", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
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
      "Relationship"
    );
    test.step("*** Selecting Resource ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "List"
    );
    test.step("*** Selecting Endpoint ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const handlebarButton = await page.locator(
      selectors.exportsPagePO.QUERY_PARAMETERS_ROW + " " +
      selectors.basePagePO.HANDLEBAR_EDITOR + " " +
      selectors.connectionsPagePO.TEXTCONTENT
    )
    expect(handlebarButton).toBeEnabled();
    await test.step(
      "*** Verified handlebar button is clickable  ***",
      async ()=>{}
    );
    await test.step(
      "*** Verified handlebar button is clickable  ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Users should be able to click on handlebar",
      async ()=>{});
  });
});
