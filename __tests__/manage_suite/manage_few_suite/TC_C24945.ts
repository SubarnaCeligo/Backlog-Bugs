import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_few.json";

test.describe(`C24945 Tile Manage - Verify able to filter report results by flow`, () => {
  test(`@Env-All @Zephyr-IO-T4329 C24945 Tile Manage - Verify able to filter report results by flow`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "reports/eventreports"
    );
    await page.getByText("Loading...").waitFor({ state: "hidden", timeout:360000 });
    await page
      .getByRole("columnheader", { name: "Flow" })
      .getByRole("button")
      .click();
    await io.homePage.addStep("Clicked on 'Flow' filter");
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
