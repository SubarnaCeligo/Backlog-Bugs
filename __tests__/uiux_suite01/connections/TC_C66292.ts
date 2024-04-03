import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C66292 Verify the Canceled by dropdown will auto adjust to display the full character length of the username field`, () => {
  test(`C66292 Verify the Canceled by dropdown will auto adjust to display the full character length of the username field`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await page.getByLabel("Cancel flow run").click();
    await io.flowBuilder.addStep("Clicked on Cancel flow run");
    await io.flowBuilder.clickByText("Cancel run");
    await io.flowBuilder.clickByText("Run history");
    // clickByIndex is not working here
    await page.locator(selectors.basePagePO.TOOLTIP).first().click();
    await io.flowBuilder.addStep("Clicked on Canceled Info icon");
    await io.assert.verifyElementDisplayedByText(
      `Canceled by Automation Account`,
      "Canceled by username not found"
    );
  });
});
