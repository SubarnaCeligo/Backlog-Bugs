import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C44983.json";

test.describe(`TC_C44983  Verify by adding the duplicate mappings for ""destination record"" and enter the different ""Source record field"" values in Mapper2.0`, () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test(`@Env-All @Zephyr-IO-T2443  Verify by adding the duplicate mappings for ""destination record"" and enter the different ""Source record field"" values in Mapper2.0`, async ({
    io,
  }) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();

    let errortext = (await io.homePage.getText("#error > div.ace_scroller > div"))
      .toString()
      .replace(/[·]/g, " ");

    let expectedError = "Mapper 2.0: Duplicate destination field(s): name¶";
    expect(errortext).toEqual(expectedError);
    await test.step("** Verified For Duplicate Mapping Error Is Thrown. **", async () => {});
  });
});
