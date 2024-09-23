
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51968 from "@testData/Mapper2.0/TC_C51968.json";

test.describe(`TC_C51968 Verify when user select source datatype as ""[object]"" then ""Copy an object array from the source as-is?"" option must be enabled in settings page only in multiple source tabs`, () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test(`@Env-All @Zephyr-IO-T22468 Verify when user select source datatype as ""[object]"" then ""Copy an object array from the source as-is?"" option must be enabled in settings page only in multiple source tabs`, async ({io}) => {
    flowId = await io.createResourceFromAPI(TC_C51968, "FLOWS");
    await io.homePage.loadingTime();
    test.step("*** Open import mapping***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    test.step("*** Changing the parent resource ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    );
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText('Copy an object array from the source as-is?','copy an object not displayed');
  });
});
