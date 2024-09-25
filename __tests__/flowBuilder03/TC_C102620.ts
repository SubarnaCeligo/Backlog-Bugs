import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FlowBuilder/C102620.json";

test.describe("TC_C102620 Verify hover text is not showing when we have 'Source dropdown' is opened", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T23483 @Env-All @Priority-P2 C102620 Verify hover text is not showing when we have 'Source dropdown' is opened", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
    await io.assert.checkElementState(selectors.importPagePO.TOOL_TIP_ROLE, "isHidden");
  });
});
