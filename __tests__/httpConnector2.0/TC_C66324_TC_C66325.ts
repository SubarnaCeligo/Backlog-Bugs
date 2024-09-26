
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C66324_TC_C66325", async () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T18879 @Env-All TC_C66324 Verify user is able to give the query parameter value directly or through handlebar", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.LITMOS_CONNECTION);
    test.step("*** Selected Litmos as the adaptor ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Teams"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Create team"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.HANDLEBAR_EDITOR,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY,
      "TC_C66324"
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const value = await page.locator(
      selectors.connectionsPagePO.APPLICATION_VALUE0
    );
    expect(await value.inputValue()).toContain("TC_C66324");
    await io.homePage.fill(
      selectors.connectionsPagePO.APPLICATION_VALUE0,
      "test"
    );
    expect(await value.inputValue()).toBe("test");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified user is able to give the query parameter value directly or through handlebar",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T18880 @Env-All TC_C66325 Verify user is able to serach the query parameter", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.LITMOS_CONNECTION);
    test.step("*** Selected Litmos as the adaptor ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Teams"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Create team"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.mappings.DELETEFIRST
    );
    await io.homePage.click(selectors.connectionsPagePO.APPLICATION_NAME0);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "source"
    );
    await io.homePage.fill(
      selectors.connectionsPagePO.APPLICATION_NAME1,
      "test"
    );
    const name1 = await page.locator(selectors.connectionsPagePO.APPLICATION_NAME0);
    const name2 = await page.locator(selectors.connectionsPagePO.APPLICATION_NAME1);
    expect(await name1.inputValue()).toContain("source");
    expect(await name2.inputValue()).toContain("test");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified user is able to serach the query parameter",
      async ()=>{}
    );
  });
});
