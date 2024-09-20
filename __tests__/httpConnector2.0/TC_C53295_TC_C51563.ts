
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("TC_C53295,TC_C51563 Verify the connection form of HTTP toggle and verify the fields after switching to Simple", () => {
  const connectionName = "TC_C53295 HTTP Orderful Connection";

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting the connection ***", async () => {});
    await io.connections.deleteConnection(connectionName);
  });
  test("@Zephyr-IO-T17054 @Zephyr-IO-T17048 @Env-All TC_C53295 TC_C51563 Verify the connection form of HTTP toggle and verify the fields after switching to Simple", async ({io,page}, testInfo) => {
    // TC_C53295
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Select orderful connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    expect(await simpleToggle.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is selected", async ()=>{});
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("Move to HTTP tab", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      connectionName
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      await decrypt(process.env["ORDERFUL_Token"])
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await test.step("*** Saving and closing the connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      connectionName
    );
    test.step("*** Searching for the created connection ***", async ()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    test.step("*** Click on the created connection ***", async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.SELECTSTACKLIST
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const httpToggle = await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    expect(await httpToggle.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("*** Verifying if HTTP tab is selected ***", async ()=>{});

    // TC_C51563
    await simpleToggle.click();
    test.step("*** Moving to Simple tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const name = await page.locator(selectors.basePagePO.NAME).inputValue();
    expect(name).toBe(connectionName);
    test.step("*** Verifying the Connection name ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Closing the Connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await test.step(
      "Verified the connection form of HTTP toggle and verify the fields after switching to Simple",
      async ()=>{}
    );
  });
});
