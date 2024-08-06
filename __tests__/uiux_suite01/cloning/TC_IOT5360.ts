import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe(`TC_IOT5360 Breadcrumb should work fine in the cloning page.`, () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test(`@Env-All @Zephyr-IO-T5360 C42976 Breadcrumb should work fine in the cloning page.`, async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C45341, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );

    //Clone the flow
    await io.homePage.waitForElementAttached(
      selectors.flowBuilderPagePO.CLONEFLOW
    );
    await io.homePage.click(selectors.flowBuilderPagePO.CLONEFLOW);
    await io.homePage.loadingTime();

    await page.getByRole("link", { name: "TC_C45341" }).click();
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Flow builder",
      "Flow builder page is not displayed"
    );
  });
});
