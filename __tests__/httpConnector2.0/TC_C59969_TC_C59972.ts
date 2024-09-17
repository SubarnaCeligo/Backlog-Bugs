
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C59969_TC_C59972 Verify query parameters in Confluence cloud export when hardcoded", () => {
  const relativeURI = "/content?type=page&start={{{export.http.paging.skip}}}&test=1";
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T23466 @Env-All TC_C59969 Verify query parameters in Confluence cloud export when hardcoded in http view", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.CONFLUENCE_CLOUD_CONNECTION
    );
    await test.step(
      "*** Selected confluencecloud as the adaptor ***",
      async () => { }
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Content"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Get Content"
    );
    test.step("*** Selecting Resource and Endpoint ***", async () => { });
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.HTTP_RELATIVEURI,
      relativeURI
    );
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const testParam = await page.locator(selectors.connectionsPagePO.APPLICATION_NAME1).inputValue();
    await io.assert.expectToBeValue(testParam, "test", "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
    await test.step(
      "Veriied query parameters in Confluence cloud export when hardcoded in http view",
      async () => {}
    );
  });
  test("@Zephyr-IO-T23467 @Env-All TC_C59972 Verify query parameters in Confluence cloud export when hardcoded in simple view", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.CONFLUENCE_CLOUD_CONNECTION
    );
    await test.step(
      "*** Selected confluencecloud as the adaptor ***",
      async () => { }
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Content"
    );
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Get Content"
    );
    test.step("*** Selecting Resource and Endpoint ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(
      selectors.connectionsPagePO.APPLICATION_NAME0,
      "test"
    );
    await io.homePage.fill(
      selectors.connectionsPagePO.APPLICATION_VALUE0,
      "1"
    );
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const relativeURIValue = await page.locator(selectors.exportsPagePO.HTTP_RELATIVE_URI).inputValue();
    expect(relativeURIValue).toEqual(relativeURI);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    await test.step(
      "Veriied query parameters in Confluence cloud export when hardcoded in simple view",
      async () => {}
    );
  });
});
