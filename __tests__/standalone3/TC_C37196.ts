import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/TC_C37196.json";

test.describe("TC_C37196_Title_HelpText_MappingAssistan", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5888 @Env-QA @Env-P5 TC_C37196_Title_HelpText_MappingAssistant", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(NS, "FLOWS");
    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT)
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** Clicking on import mapping ***", async ()=>{});

    await io.homePage.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    test.step("*** Clicking on toggle_layout ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.TOGGLELAYOUT);
    
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(5).click();
    test.step("*** Validate the help text***", async ()=>{});
    var data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("The NetSuite mapping assistant emulates your NetSuite account, displaying a standard form with only the visible fields",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)
  });
});
