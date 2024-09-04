import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C29687 from "@testData/FlowBuilder/TC_C29687.json";
  // clearValue,

test.describe("@Env-All @Zephyr-IO-T2884|Verify the preview is working fine for the realtime exports", () => {

  test("@Env-All @Zephyr-IO-T2884|Verify the preview is working fine for the realtime exports ", async ({io}) => {
    // Creating Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.createResourceFromAPI(TC_C29687, "FLOWS");
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.LISTENER
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.FETCH_PREVIEW
    );
    await io.homePage.loadingTime();
    var previewResource = await io.homePage.getText(
      selectors.mappings.PREVIEW_RESULT
    );
    expect(previewResource).toBeTruthy;
  });
});
