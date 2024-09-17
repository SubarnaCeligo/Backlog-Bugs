
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C53411_TC_C533412 Verify the handlebar for custom setting in export and lookup", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([flowId])
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17121 @Zephyr-IO-T17122 @Env-All TC_C53411 TC_C53412 Verify the handlebar for custom setting in export and lookup", async ({io,page}, testInfo) => {
    // TC_C53411
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "3PL CENTRAL CONNECTION"
    );
    await test.step(
      "*** Choosing the desired 3pl central connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_NAME,
      "3pl central export"
    );
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Inventory"
    );
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Purchaseorders : get purchaseorders"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    flowId = (await io.homePage.getCurrentUrl()).split("/").at(-1);
    await io.homePage.click(
      selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CUSTOM
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CUSTOMSETTINGS_EDITOR
    );
    await page.keyboard.type('{"test":"customer"}');
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const handlebarButton = await page.locator(
      selectors.exportsPagePO.QUERY_PARAMETERS_ROW + " " +
      selectors.basePagePO.HANDLEBAR_EDITOR + " " +
      selectors.connectionsPagePO.TEXTCONTENT
    );
    await handlebarButton.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY,
      "{{settings.flow.test}}"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var txt = await io.homePage.getTextFromElement(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWOUTPUT,
      "customer"
    );
    await io.assert.expectToBeTrue(txt, "");
    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "Verified handlebar is working for custom setting in export",
      async ()=>{}
    );

    // TC_C53411
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.LOOKUP_RECORD
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "3PL CENTRAL CONNECTION"
    );
    await test.step(
      "*** Choosing the desired 3pl central connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_NAME,
      "3pl central export"
    );
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Inventory"
    );
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Purchaseorders : get purchaseorders"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    await handlebarButton.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY,
      "{{settings.flow.test}}"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var txt = await io.homePage.getTextFromElement(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWOUTPUT,
      "customer"
    );
    await io.assert.expectToBeTrue(txt, "");
    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified handlebar is working for custom setting in lookup",
      async ()=>{}
    );
  });
});
