import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C44502 from "@testData/Mapper2.0/TC_C44502.json";
import { allure } from "allure-playwright";

test.describe("TC_C44502", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2373 TC_C44502", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C44502, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Opened mappings ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    test.step("*** Clicked on preview button ***", async ()=>{});
    var paste = await io.homePage.copyResourceData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULTOUTPUT
    );

    test.step("*** Get the preview result ***", async ()=>{});
    var received = (JSON.stringify(paste)).replace(/\s+/g, '').replace(/\\n/g, '').replace(/\\/g, '');
    console.log('received', received);

    expect(received).toEqual(TC_C44502.expectedPreviewData);
  });
});
