
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C51553", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18894 @Env-All TC_C51553", async ({io,page}, testInfo) => {
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
    await io.homePage.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    expect(await io.homePage.isVisible(selectors.basePagePO.NAME_WDIO)).toBeTruthy();
    expect(await io.homePage.isVisible(selectors.connectionsPagePO.TOKEN1)).toBeTruthy();
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Selected Orderful as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle1 = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    const simpleToggle1State = await simpleToggle1.getAttribute("data-state");
    if (simpleToggle1State) {
      expect(await simpleToggle1.getAttribute("data-state")).toBe("on");
    } else {
      expect(await simpleToggle1.getAttribute("aria-pressed")).toBe("true");
    }
    test.step("Verifying if Simple tab is selected", async ()=>{});
    expect(await io.homePage.isVisible(selectors.basePagePO.NAME_WDIO)).toBeTruthy();
    expect(await io.homePage.isVisible(selectors.connectionsPagePO.DESCRIPTIONNAME)).toBeTruthy();
    expect(await io.homePage.isVisible(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE)).toBeTruthy();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    test.step("*** Clicked on Pageprocessor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Selected Orderful as the adaptor ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.IMPORT_RECORDS
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    expect(await io.homePage.isVisible(selectors.basePagePO.NAME_WDIO)).toBeTruthy();
    expect(await io.homePage.isVisible(selectors.connectionsPagePO.DESCRIPTIONNAME)).toBeTruthy();
    expect(await io.homePage.isVisible(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE)).toBeTruthy();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
await test.step(
      "Verified simple form should have only a minimal set of information presented"
, async ()=>{});
  });
});
