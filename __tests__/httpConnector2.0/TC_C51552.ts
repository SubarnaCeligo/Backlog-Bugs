
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51552", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18893 @Env-All TC_C51552", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Select orderful connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    expect(await simpleToggle.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle.click();
    test.step("Selecting Http tab", async ()=>{});
    expect(await simpleToggle.getAttribute("class")).not.toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is not selected", async ()=>{});
    expect(await httpToggle.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Http tab is not selected", async ()=>{});
    await simpleToggle.click();
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Selected Orderful as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle1 = await page.locator( selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    expect(await simpleToggle1.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle1 = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle1.click();
    test.step("Selecting Http tab", async ()=>{});
    expect(await simpleToggle1.getAttribute("class")).not.toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is not selected", async ()=>{});
    expect(await httpToggle1.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Http tab is not selected", async ()=>{});
    await simpleToggle1.click();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    test.step("*** Clicked on Pageprocessor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Selected Orderful as the adaptor ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.IMPORT_RECORDS
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle2 = await page.locator( selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    expect(await simpleToggle2.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle2 = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle2.click();
    test.step("Selecting Http tab", async ()=>{});
    expect(await simpleToggle2.getAttribute("class")).not.toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is not selected", async ()=>{});
    expect(await httpToggle2.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Http tab is not selected", async ()=>{});
    await simpleToggle2.click();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TYPE);
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle3 = await page.locator( selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    expect(await simpleToggle3.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle3 = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle3.click();
    test.step("Selecting Http tab", async ()=>{});
    expect(await simpleToggle3.getAttribute("class")).not.toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is not selected", async ()=>{});
    expect(await httpToggle3.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Http tab is not selected", async ()=>{});
    await simpleToggle3.click();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await test.step(
      "Verified Toggle button is present and by default test will be in Simple option and user can toggle between Simple and http",
      async () => {}
    );
  });
});
