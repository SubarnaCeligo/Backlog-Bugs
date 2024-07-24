import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51628 from "@testData/EM2.0/C51628.json";

test.describe("C37205 Verify on integration level success should be clickable", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id);
  });
  test("@Zephyr-IO-T7533 @Env-All @Priority-P2 C37205 Verify on integration level success should be clickable", async ({
    io,
    page,
    context
  }) => {
    id = await io.createResourceFromAPI(C51628, "FLOWS");
    await io.api.runBatchFlowViaAPI("TC_C51623", id);

    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();

    //Open errors dashborad
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORS
    );
  });
});
