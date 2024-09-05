
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C52208 from "@testData/Mapper2.0/TC_C52208.json";

test.describe("TC_C52208", () => {
  test("@Env-All @Zephyr-IO-T22521 TC_C52208", async ({io,page}, testInfo) => {
    test.step(" *** CREATED FLOW VIA API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C52208, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets/${TC_C52208.pageGenerators[0].qa__export.qa__path}`);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    await io.homePage.loadingTime();
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );

    await io.homePage.loadingTime();
    test.step("*** Click on the import mappings***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on the settings icon***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      1
    );
    await io.homePage.loadingTime();
    test.step("*** Select mapping type as lookup-static***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE,
      "lookup"
    );

    await test.step("*** Enter dastination and source field values ***", async ()=>{});
    await io.homePage.fillWebPage(
      "[data-test='lookup.mapList'] [data-test='row-0'] [data-test='col-0']",
      "test"
    );
    await io.homePage.fillWebPage(
      "[data-test='lookup.mapList'] [data-test='row-0'] [data-test='col-1']",
      "@field1,@field2"
    );

    test.step("*** Enter look up name ***", async ()=>{});
    await io.homePage.fillWebPage(
      "[data-test='lookup.name']",
      "test"
    );

    test.step("*** Save and close the import mappings***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    test.step("*** Get the import ID ***", async ()=>{});
    let flowData = await io.api.getFlowById(flowID);
    let importId = flowData.pageProcessors[0]._importId;

    await test.step("*** Getting the response from the import doc ***", async ()=>{});
    let response = await io.api.getCall(
      "v1/imports/" + importId
    );
    test.step("*** Validate the response for mappings***", async ()=>{});
    await expect(response.lookups[0].map).hasOwnProperty("@field1");
    await expect(response.lookups[0].map).hasOwnProperty("@field2");
    response = JSON.stringify(response);

    test.step("*** Validate the response for mappings***", async ()=>{});
    await io.assert.expectToContainValue("@field1", response, "");
    await io.assert.expectToContainValue("@field2", response, "");

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
