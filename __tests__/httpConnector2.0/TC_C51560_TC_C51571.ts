
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51560_TC_C51571", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17052 @Zephyr-IO-T17050 @Env-All TC_C51560_TC_C51571", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    await test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    await test.step("*** Selected orderful as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    let simpleToggleState = await simpleToggle.getAttribute("data-state");
    if (simpleToggleState) {
      expect(await simpleToggle.getAttribute("data-state")).toBe("on");
    } else {
      expect(await simpleToggle.getAttribute("aria-pressed")).toBe("true");
    }
    await test.step("Verifying if Simple tab is selected", async ()=>{});
    const httpToggle = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle.click();
    await test.step("Move to HTTP tab", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let httpToggleState = await httpToggle.getAttribute("data-state");
    if (httpToggleState) {
      expect(await httpToggle.getAttribute("data-state")).toBe("on");
      expect(await simpleToggle.getAttribute("data-state")).toBe("off");
    } else {
      expect(await httpToggle.getAttribute("aria-pressed")).toBe("true");
      expect(await simpleToggle.getAttribute("aria-pressed")).toBe("false");
    }
    test.step("Verifying if Simple is not selected but HTTP is selected", async ()=>{});
    await test.step("TC_C51571-Verified toggle button is at HTTP for export", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.NAME,
      "Orderful Export"
    );
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "ORDERFUL CONNECTION");
    await test.step("*** Choosing the desired orderful connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.homePage.click(
      selectors.exportsPagePO.HTTP_METHOD_GET
    );
    await io.homePage.fill(
      selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL,
      "/relationships"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN
    );
    await io.homePage.click(selectors.flowBuilderPagePO.LIMITTYPE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await test.step("TC_C51560 - Verify the exports when toggle button is at HTTP", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    await test.step("*** Clicking on Import records ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await test.step("*** Selected orderful as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    simpleToggleState = await simpleToggle.getAttribute("data-state");
    if (simpleToggleState) {
      expect(await simpleToggle.getAttribute("data-state")).toBe("on");
    } else {
      expect(await simpleToggle.getAttribute("aria-pressed")).toBe("true");
    }
    await test.step("Verifying if Simple tab is selected", async ()=>{});
    httpToggle.click();
    await test.step("Move to HTTP tab", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    httpToggleState = await httpToggle.getAttribute("data-state");
    if (httpToggleState) {
      expect(await httpToggle.getAttribute("data-state")).toBe("on");
      expect(await simpleToggle.getAttribute("data-state")).toBe("off");
    } else {
      expect(await httpToggle.getAttribute("aria-pressed")).toBe("true");
      expect(await simpleToggle.getAttribute("aria-pressed")).toBe("false");
    }
    await test.step("Verifying if HTTP tab is selected", async ()=>{});
    await test.step("TC_C51571-Verified toggle button is at HTTP for import", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.NAME,
      "Orderful Import"
    );
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "ORDERFUL CONNECTION");
    await test.step("*** Choosing the desired orderful connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.homePage.fill(
      selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL,
      "/transactions/confirm-delivery"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await test.step("TC_C51560 - Verify the imports when toggle button is at HTTP", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.homePage.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
  });
});
