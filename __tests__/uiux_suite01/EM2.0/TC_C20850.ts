import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51628 from "@testData/EM2.0/C51628.json";

test.describe("C20850 Verify there is no link present on the error in the Run console", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id);
  });
  test("@Zephyr-IO-T19775 @Env-All C20850 Verify there is no link present on the error in the Run console", async ({
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

    await io.flowBuilder.loadingTime();

    const currentUrl = page.url();

    const expectedUrl = "/errors/";
    const func = currentUrl.includes(expectedUrl);
    await io.assert.expectToBeTrue(func, "urls doesn't match");
  });
});