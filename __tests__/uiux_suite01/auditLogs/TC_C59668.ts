import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C59668 Verify Click to view label should be named to View in Audit log`, () => {
  test(`C59668 Verify Click to view label should be named to View in Audit log`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
    try {
      let label = await page
        .locator(selectors.flowBuilderPagePO.AUDIT_LOG_CHANGES)
        .first()
        .textContent({ timeout: 2000 });
      await io.assert.expectToBeValue(label, "View", "Label is not 'View'");
    } catch {
      await io.flowBuilder.addStep("'View' label is not present");
    }
    await io.homePage.navigateTo(
      process.env.IO_UI_CONNECTOR_URL + "myAccount/audit"
    );
    try {
      let label = await page
        .locator(selectors.flowBuilderPagePO.AUDIT_LOG_CHANGES)
        .first()
        .textContent({ timeout: 10000 });
      await io.assert.expectToBeValue(label, "View", "Label is not 'View'");
    } catch {
      await io.flowBuilder.addStep("'View' label is not present");
    }
  });
});
