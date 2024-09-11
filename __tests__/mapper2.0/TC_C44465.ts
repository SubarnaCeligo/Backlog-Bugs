
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C44465 from "@testData/Mapper2.0/TC_C44465.json";

test.describe("TC_C44465 & TC_C44464 & TC_C44448", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2370 @Zephyr-IO-T2369 @Zephyr-IO-T2359 TC_C44465 & TC_C44464 & TC_C44448", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C44465, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();

    test.step("*** Open import mapping***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();

    test.step("*** Clicked on Preview Button ***", async ()=>{});
    var result = await io.homePage.copyResourceData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT
    );
    result = result.replace(/[\r\n ]+/g, "");

    await io.assert.expectToContainValue('{"via":{"channel":"sample_ticket"}', result, "");
    await test.step("*** Output data is visible with subchild records. ***", async ()=>{});
  });
});
