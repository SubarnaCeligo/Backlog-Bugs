import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95467_TC_C95468_TC_C95469_TC_C110227_TC_C110228", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21497 @Zephyr-IO-T1663 @Env-All TC_C95467 TC_C110227 Verify Walmart connection guide and application list", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    //TC_C110227-Verify the parent application is listed when any of its APIs is typed in the application connection list menu.
    await page.keyboard.type("Walmart US");
    test.step("*** Entered API type in the list menu ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const walmartApp = await page.locator(selectors.flowBuilderPagePO.WALMART);
    await expect(walmartApp).toBeVisible();
    await test.step(
      "*** Verified the parent application is listed when any of its APIs is typed in the application connection list menu ***",
      async ()=>{}
    );
    await walmartApp.click();
    test.step("*** Selected Walmart as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await (await io.homePage.findElementByDataTest("Walmart US")).click();
    test.step("*** Selected Walmart US as the API type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const guideHref = "[href='https://docs.celigo.com/hc/en-us/articles/360061620931-Set-up-a-connection-to-Walmart-US']";
    const connGuide = await page.locator(guideHref);
    expect(connGuide).toBeVisible();
    expect(connGuide).toHaveText("Connection guide");
    await test.step(
      " *** Verified if the connection form with respective connection guide link is shown *** ",
      async ()=>{}
    );
    expect(connGuide).toBeEnabled();
    await test.step(
      "*** Verifying clicking on the link is redirecting to the respective connection guide page in KB ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21498 @Env-All TC_C95468 Verify Walmart connection guide help URL for Walmart Canada", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    //TC_C110227-Verify the parent application is listed when any of its APIs is typed in the application connection list menu.
    await page.keyboard.type("Walmart Canada");
    test.step("*** Entered API type in the list menu ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const walmartApp = await page.locator(selectors.flowBuilderPagePO.WALMART);
    await expect(walmartApp).toBeVisible();
    await test.step(
      "*** Verified the parent application is listed when any of its APIs is typed in the application connection list menu ***",
      async ()=>{}
    );
    await walmartApp.click();
    test.step("*** Selected Walmart as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await (await io.homePage.findElementByDataTest("Walmart Canada")).click();
    test.step("*** Selected Walmart Canada as the API type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const guideHref = "[href='https://docs.celigo.com/hc/en-us/articles/360061297871-Set-up-a-connection-to-Walmart-Canada']";
    const connGuide = await page.locator(guideHref);
    expect(connGuide).toBeVisible();
    expect(connGuide).toHaveText("Connection guide");
    await test.step(
      " *** Verified if the connection form with respective connection guide link is shown *** ",
      async ()=>{}
    );
    expect(connGuide).toBeEnabled();
    await test.step(
      "*** Verifying clicking on the link is redirecting to the respective connection guide page in KB ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21499 @Env-All TC_C95469 Verify API field should not be shown in connection form for the applications where api doesn't support", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.LOOP_RETURN_CONNECTION
    );
    await test.step(
      "*** Selected loop returns as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiType = await page.locator(
      selectors.connectionsPagePO.HTTP_CONNECTOR_API_ID
    );
    expect(apiType).not.toBeVisible();
    await test.step(
      "*** Verifying API field should not be shown in connection form for the applications where api doesn't support  ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T1664 @Env-All TC_C110228 Verify the parent application is listed when any of its APIs is typed in the application export and import list menu", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.ADD_SOURCE_BUTTON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.keyboard.type("Walmart US");
    test.step("*** Entered API type in the application list menu ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const expWalmartApp = await page.locator(selectors.flowBuilderPagePO.WALMART);
    await expect(expWalmartApp).toBeVisible();
    await test.step(
      "*** Verified the parent application is listed when any of its APIs is typed in the application list menu ***",
      async ()=>{}
    );
    await expWalmartApp.click();
    test.step("*** Selected Walmart as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSINGDRAWER
    );
    test.step("*** Closed the export form ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.keyboard.type("Walmart Canada");
    test.step("*** Entered API type in the application list menu ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const impWalmartApp = await page.locator(selectors.flowBuilderPagePO.WALMART);
    await expect(impWalmartApp).toBeVisible();
    await test.step(
      "*** Verified the parent application is listed when any of its APIs is typed in the application list menu ***",
      async ()=>{}
    );
    await impWalmartApp.click();
    test.step("*** Selected Walmart as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSINGDRAWER
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
