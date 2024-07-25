import {  test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98691 from '@testData/FlowDebugger/C98691.json';

test.describe("TC_IOT18015 Verify the default output selection must be rows for CSV", () => {
    let flowId;
    test.afterEach(async ({ io }) => {
      await io.api.deleteFlowViaAPI(flowId);
    });
  
    test("@Env-All @Zephyr-IO-T18015 C46904 Verify the default output selection must be rows for CSV", async ({
      io,
    }) => {
      flowId = await io.createResourceFromAPI(C98691, "FLOWS");
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
      await io.flowBuilder.click(
        selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON
      );
      await io.flowBuilder.loadingTime();

      await io.assert.verifyElementDisplayedByText("Create destination rows [ ] from source record { }",
        "Create destination rows [ ] from source record { } is not displayed"
      );
    });
  });