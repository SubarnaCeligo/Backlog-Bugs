import { test  } from "@celigo/ui-core-automation";
import C102619 from "@testData/Flows/C102619.json"
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT23482 Verify added outline/vertical line to Run button with chevron to make clear that it's a split button`, () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test(`@Zephyr-IO-T23482 @Env-All C102619 Verify added outline/vertical line to Run button with chevron to make clear that it's a split button`, async ({
    io,
  }) => {
    flowId = await io.createResourceFromAPI(C102619, "FLOWS");

    //Wait for flow run to complete
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    const isDividerVisible  = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.RUN_FLOW_DIVIDER);
    await io.assert.expectToBeTrue(isDividerVisible, "Line divinding run button and run specific source dropdown is not visible.")
    

  });
});