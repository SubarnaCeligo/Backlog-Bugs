
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
    const simpleToggleState = await simpleToggle.getAttribute("data-state");
    if (simpleToggleState) {
      expect(await simpleToggle.getAttribute("data-state")).toBe("on");
    } else {
      expect(await simpleToggle.getAttribute("aria-pressed")).toBe("true");
    }
    test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle.click();
    test.step("Selecting Http tab", async ()=>{});
    await io.homePage.loadingTime();
    const httpToggleState = await httpToggle.getAttribute("data-state");
    if (httpToggleState) {
      expect(await httpToggle.getAttribute("data-state")).toBe("on");
      expect(await simpleToggle.getAttribute("data-state")).toBe("off");
    } else {
      expect(await httpToggle.getAttribute("aria-pressed")).toBe("true");
      expect(await simpleToggle.getAttribute("aria-pressed")).toBe("false");
    }
    test.step("Verifying if Simple is not selected but HTTP is selected", async ()=>{});
    await simpleToggle.click();
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
    const httpToggle1 = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle1.click();
    test.step("Selecting Http tab", async ()=>{});
    await io.homePage.loadingTime();
    const httpToggle1State = await httpToggle1.getAttribute("data-state");
    if (httpToggle1State) {
      expect(await httpToggle1.getAttribute("data-state")).toBe("on");
      expect(await simpleToggle1.getAttribute("data-state")).toBe("off");
    } else {
      expect(await httpToggle1.getAttribute("aria-pressed")).toBe("true");
      expect(await simpleToggle1.getAttribute("aria-pressed")).toBe("false");
    }
    test.step("Verifying if Simple is not selected but HTTP is selected", async ()=>{});
    await simpleToggle1.click();
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
    const simpleToggle2 = await page.locator( selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    const simpleToggle2State = await simpleToggle2.getAttribute("data-state");
    if (simpleToggle2State) {
      expect(await simpleToggle2.getAttribute("data-state")).toBe("on");
    } else {
      expect(await simpleToggle2.getAttribute("aria-pressed")).toBe("true");
    }
    test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle2 = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle2.click();
    test.step("Selecting Http tab", async ()=>{});
    await io.homePage.loadingTime();
    const httpToggle2State = await httpToggle2.getAttribute("data-state");
    if (httpToggle2State) {
      expect(await httpToggle2.getAttribute("data-state")).toBe("on");
      expect(await simpleToggle2.getAttribute("data-state")).toBe("off");
    } else {
      expect(await httpToggle2.getAttribute("aria-pressed")).toBe("true");
      expect(await simpleToggle2.getAttribute("aria-pressed")).toBe("false");
    }
    test.step("Verifying if Simple is not selected but HTTP is selected", async ()=>{});
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
    const simpleToggle3State = await simpleToggle3.getAttribute("data-state");
    if (simpleToggle3State) {
      expect(await simpleToggle3.getAttribute("data-state")).toBe("on");
    } else {
      expect(await simpleToggle3.getAttribute("aria-pressed")).toBe("true");
    }
    test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle3 = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle3.click();
    test.step("Selecting Http tab", async ()=>{});
    await io.homePage.loadingTime();
    const httpToggle3State = await httpToggle3.getAttribute("data-state");
    if (httpToggle3State) {
      expect(await httpToggle3.getAttribute("data-state")).toBe("on");
      expect(await simpleToggle3.getAttribute("data-state")).toBe("off");
    } else {
      expect(await httpToggle3.getAttribute("aria-pressed")).toBe("true");
      expect(await simpleToggle3.getAttribute("aria-pressed")).toBe("false");
    }
    test.step("Verifying if Simple is not selected but HTTP is selected", async ()=>{});
    await simpleToggle3.click();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await test.step(
      "Verified Toggle button is present and by default test will be in Simple option and user can toggle between Simple and http",
      async () => {}
    );
  });
});
