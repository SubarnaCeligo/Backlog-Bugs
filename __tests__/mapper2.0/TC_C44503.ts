import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C44503 from "@testData/Mapper2.0/TC_C44503.json";

test.describe("TC_C44503 verify preview for multiple source with different json notations", () => {
  let flowID;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowID);
  });

  test("@Env-All @Zephyr-IO-T2374  verify preview for multiple source with different json notations", async ({
    io
  }) => {
    test.step("*** Creating PageGenerator ***", async () => {});
    flowID = await io.createResourceFromAPI(TC_C44503, "FLOWS");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.click(selectors.basePagePO.EXPAND_ALL);
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Clicked on preview button ***", async () => {});

    let result: any = await io.homePage.getText(selectors.mappings.RESULTTEXT);

    var received = JSON.parse(result);
    test.step("*** Get the preview result ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Close the mapper drawer ***", async () => {});
    expect(received).toEqual(TC_C44503.expectedJSON);
    await test.step("verified preview for multiple source with different json notations", async () => {});
  });
});
