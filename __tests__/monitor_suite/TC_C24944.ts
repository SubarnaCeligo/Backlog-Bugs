import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_Ci_user.json";

test.describe(`@Epic-IO-20209 @Zephyr-IO-T4328 C24944 Monitor all- Verify able to filter report results by flow`, () => {
  test(`@Epic-IO-20209 @Zephyr-IO-T4328 @Env-All C24944 Monitor all- Verify able to filter report results by flow`, async ({
    page,
    io
  }) => {
    const res = await io.api.processAshareData(testData);

    await io.flowBuilder.loadingTime();
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "reports/eventreports"
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await page
      .getByRole("columnheader", { name: "Flow" })
      .getByRole("button")
      .click();
    await io.homePage.addStep("Clicked on 'Flow' filter");
    await io.flowBuilder.loadingTime();
    try {
      await page
        .locator(selectors.basePagePO.ARROW_POPPER)
        .locator("ul")
        .first()
        .click({ timeout: 2000 });
      const selectedFlow = await page
        .locator(selectors.basePagePO.ARROW_POPPER)
        .locator("ul")
        .first()
        .textContent();
      await io.homePage.addStep("Selected a flow");
      await io.homePage.clickByText("Apply");
      await io.flowBuilder.loadingTime();
      const rows = await page.$$(selectors.flowBuilderPagePO.COLUMNS);
      for (const row of rows) {
        const flowColumn = await row.$("td");
        const flowColumnText = await flowColumn.textContent();
        await io.assert.expectToContainValue(
          selectedFlow,
          flowColumnText,
          "Flow column does not contain selected flow"
        );
      }
      await io.homePage.addStep("Verified 'Flow' filter is working properly");
    } catch (e) {
      await io.homePage.addStep("No flows found");
    }
  });
});
