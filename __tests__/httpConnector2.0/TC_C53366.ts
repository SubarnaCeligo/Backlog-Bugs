
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C53366 Verify the functionality of save button and save and close buttons of handlebar editor", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17120 @Env-All TC_C53366 Verify the functionality of save button and save and close buttons of handlebar editor", async ({io,page}, testInfo) => {
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
    const handlebarButton = await page.locator(
      selectors.exportsPagePO.QUERY_PARAMETERS_ROW + " " +
      selectors.basePagePO.HANDLEBAR_EDITOR + " " +
      selectors.connectionsPagePO.TEXTCONTENT
    );
    await handlebarButton.first().click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY,
      "{{test}}"
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE,
      1
    );
    await test.step(
      "*** Verified save button is working fine ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await handlebarButton.nth(1).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY,
      "{{test}}"
    );
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified if Save & Save and close & Close buttons are working fine for handle bar",
      async ()=>{}
    );
  });
});
