
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C60456_TC_C60098_TC_C60097", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T23235 @Env-All TC_C60456 Verify Async helper checkbox", async ({io,page}, testInfo) => {
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
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    var async = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.CONFIGASYNCHELPER
    );
    await io.assert.expectToBeTrue(async, "");
    await io.homePage.click(
      selectors.flowBuilderPagePO.CONFIGASYNCHELPER
    );
    var async1 = await io.homePage.isVisible(
      selectors.exportsPagePO.HTTP_ASYNC_HELPER_ID
    );
    await io.assert.expectToBeTrue(async1, "");
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    var async9 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.CONFIGASYNCHELPER
    );
    await io.assert.expectToBeTrue(async9, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Async helper checkbox is working fine",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T23179 @Env-All TC_C600098 Verify advanced section fields of simple view are displayed in HTTP view as well for the HTTP2.0 import", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    test.step("*** Clicked on Pageprocessors ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Clicking on Import records ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT
    );
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    var help = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.ASYNCHELPER
    );
    await io.assert.expectToBeTrue(help, "");
    var ignore = await io.homePage.isVisible(
      selectors.exportsPagePO.HTTP_IGNORE_EMPTY_NODES
    );
    await io.assert.expectToBeTrue(ignore, "");
    var lock = await io.homePage.isVisible(
      selectors.importPagePO.ID_LOCK_TEMPLATE
    );
    await io.assert.expectToBeTrue(lock, "");
    var uri = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.DATAURITEMPLATE
    );
    await io.assert.expectToBeTrue(uri, "");
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT
    );
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    var help1 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.ASYNCHELPER
    );
    await io.assert.expectToBeTrue(help1, "");
    var ignore1 = await io.homePage.isVisible(
      selectors.exportsPagePO.HTTP_IGNORE_EMPTY_NODES
    );
    await io.assert.expectToBeTrue(ignore1, "");
    var lock1 = await io.homePage.isVisible(
      selectors.importPagePO.ID_LOCK_TEMPLATE
    );
    await io.assert.expectToBeTrue(lock1, "");
    var uri1 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.DATAURITEMPLATE
    );
    await io.assert.expectToBeTrue(uri1, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});

    await test.step(
      "*** Verify advanced section fields of simple view are displayed in HTTP view as well for the HTTP2.0 import ***",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T23178 @Env-All TC_C600097 Verify advanced section fields of simple view are displayed in HTTP view as well for the HTTP2.0 export", async ({io,page}, testInfo) => {
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
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB
    );
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    var help2 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.CONFIGASYNCHELPER
    );
    await io.assert.expectToBeTrue(help2, "");
    var ignore2 = await io.homePage.isVisible(
      selectors.exportsPagePO.PAGE_SIZE
    );
    await io.assert.expectToBeTrue(ignore2, "");

    var uri2 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.DATAURITEMPLATE
    );
    await io.assert.expectToBeTrue(uri2, "");
    var retry = await io.homePage.isVisible(
      selectors.exportsPagePO.SKIP_RETRIES
    );
    await io.assert.expectToBeTrue(retry, "");
    var tracekey = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER
    );
    await io.assert.expectToBeTrue(tracekey, "");
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB
    );
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    var help3 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.CONFIGASYNCHELPER
    );
    await io.assert.expectToBeTrue(help3, "");
    var ignore3 = await io.homePage.isVisible(
      selectors.exportsPagePO.PAGE_SIZE
    );
    await io.assert.expectToBeTrue(ignore3, "");

    var uri3 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.DATAURITEMPLATE
    );
    await io.assert.expectToBeTrue(uri3, "");
    var retry1 = await io.homePage.isVisible(
      selectors.exportsPagePO.SKIP_RETRIES
    );
    await io.assert.expectToBeTrue(retry1, "");
    var tracekey1 = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER
    );
    await io.assert.expectToBeTrue(tracekey1, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "*** Verify advanced section fields of simple view are displayed in HTTP view as well for the HTTP2.0 export ***",
      async ()=>{}
    );
  });
});
