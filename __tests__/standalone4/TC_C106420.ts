
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_C106420.json";

test.describe("TC_C106420_C106419_C106423", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({ io, page }, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
    await io.homePage.loadingTime();
    test.step("*** End of Test Suite ***", async () => { });
  });
  test("TC_C106420_C106419_C106423 @Zephyr-IO-T23712 @Zephyr-IO-T23711 @Zephyr-IO-T23712 @Env-All", async ({ io, page }, testInfo) => {
    let exportId;
    let lookupID;
    let importID;
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = flows.get(TC.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flows.get(TC.name)["flowId"]
    );
    exportId = TC.qa__api_tdata[0].createFlow.pageGenerators[0]._exportId;
    lookupID = TC.qa__api_tdata[0].createFlow.pageProcessors[0]._exportId;
    importID = TC.qa__api_tdata[0].createFlow.pageProcessors[1]._importId;
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    //EXPORT:
    //TC_C106419 Verify User is able to see Download OpenAPI spec hyperlink(left aligned)
    //TC_C106420 Verify label for Download OpenAPI spec hyperlink
    //TC_C106423 Verify Invoke url is updated to /_id/invoke endpoint
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async ()=>{});

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on advance ***", async ()=>{});
    await io.homePage.loadingTime();
    var link = await page.locator(selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT);
    await link.focus();
    await link.hover();
    await io.homePage.loadingTime();
    var downloadApiSpecExport = await io.homePage.isVisible(selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT);
    await io.assert.expectToBeTrue(downloadApiSpecExport, "User is not able to see Download OpenAPI spec hyperlink on export page");
    test.step("*** Verified User is able to see Download OpenAPI spec hyperlink on export page ***", async ()=>{});
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT, "Download OpenAPI spec");
    test.step("*** Verified Label : 'Download OpenAPI spec' ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.COPYBUTTON);
    var actualJSON: any = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    var invokeURL =
      process.env["IO_API_URL"] + "v1/exports/" + exportId + "/invoke";
    await io.assert.expectToBeValue(String(actualJSON), invokeURL, "");
    test.step("*** Verified Invoke URL should be updated to '/_id/invoke' endpoint ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async ()=>{});
    await io.homePage.loadingTime();

    //LOOKUP:
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on advance ***", async ()=>{});
    await io.homePage.loadingTime();
    var link1 = await page.locator(
      selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT
    );
    await link1.focus();
    await link1.hover();
    await io.homePage.loadingTime();
    var downloadApiSpecLookup = await io.homePage.isVisible(selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT);
    await io.assert.expectToBeTrue(downloadApiSpecLookup, "User is not able to see Download OpenAPI spec hyperlink on lookup page");
    test.step("*** Verified User is able to see Download OpenAPI spec hyperlink on lookup page ***", async () => { });
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT, "Download OpenAPI spec");
    test.step("*** Verified Label : 'Download OpenAPI spec' ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.COPYBUTTON);
    var actualJSON1: any = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    var invokeURL1 =
      process.env["IO_API_URL"] + "v1/exports/" + lookupID + "/invoke";
    await io.assert.expectToBeValue(String(actualJSON1), invokeURL1, "");
    test.step("*** Verified Invoke URL should be updated to '/_id/invoke' endpoint ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async ()=>{});
    await io.homePage.loadingTime();

    //import
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on advance ***", async ()=>{});
    await io.homePage.loadingTime();
    var link2 = await page.locator(
      selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT
    );
    await link2.focus();
    await link2.hover();
    await io.homePage.loadingTime();
    var downloadApiSpecImport = await io.homePage.isVisible(selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT);
    await io.assert.expectToBeTrue(downloadApiSpecImport, "User is not able to see Download OpenAPI spec hyperlink on import page");
    test.step("*** Verified User is able to see Download OpenAPI spec hyperlink on import page ***", async () => { });
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.INVOKE_API_BUTTON_TEXT, "Download OpenAPI spec");
    test.step("*** Verified Label : 'Download OpenAPI spec' ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.COPYBUTTON);
    var actualJSON2: any = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    var invokeURL2 =
      process.env["IO_API_URL"] + "v1/imports/" + importID + "/invoke";
    await io.assert.expectToBeValue(String(actualJSON2), invokeURL2, "");
    test.step("*** Verified Invoke URL should be updated to '/_id/invoke' endpoint ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
