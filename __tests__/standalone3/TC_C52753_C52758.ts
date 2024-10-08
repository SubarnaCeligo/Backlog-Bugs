import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C52753_C52758.json";

test.describe("TC_C52753_C52758", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T22561 @Zephyr-IO-T22565 @Env-All TC_C52753_C52758", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    test.step("*** Creating Flow via API ***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step("Created Flow " + flows.get(TC.name)["flowName"],async ()=>{});
    flowId = flows.get(TC.name).flowId;
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    const fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput1.setInputFiles(`testData/assets/FTP_uploads/TC_C52753.json`);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();

    test.step("*** Click on search button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
    await io.homePage.loadingTime();
    test.step("*** Entering the search value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.integrationPagePO.HOME_SEARCH, "test");

    await io.homePage.loadingTime();
    test.step("*** Validate the mappings test.afterEach the search ***", async ()=>{});

    const ele1 = page.locator(selectors.flowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT).nth(1);
    const val1 = await ele1.getAttribute('value');
    expect(val1).toBe('test');
    const ele2 = page.locator(selectors.flowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT).nth(2);
    const val2 = await ele2.getAttribute('value');
    expect(val2).toBe('test1');

    const ele3 = page.locator(selectors.flowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT).nth(3);
    const valNotVisible = !(await ele3.isVisible());
    await io.assert.expectToBeTrue(valNotVisible, "Auto field visible");
    
    test.step("*** Validate the mappings count test.afterEach the search ***", async ()=>{});
    await io.assert.verifyElementDisplayedByText("2 matches", "Count not correct");
    await io.assert.verifyElementDisplayedByText("Adding a row closes search mode", "Info text not visible");

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
