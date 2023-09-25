import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C59668 Verify Click to view label should be named to View in Audit log`, () => {
  test(`C59668 Verify Click to view label should be named to View in Audit log`, async ({
    io,
    page
  }) => {
    await io.fillFormUI(testData, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
    let label = (await io.flowBuilder.getText(
      selectors.flowBuilderPagePO.AUDIT_LOG_CHANGES
    )) as string;
    await io.assert.expectToBeValue(label, "View", "Label is not 'View'");
    await io.homePage.navigateTo(
      process.env.IO_UI_CONNECTOR_URL + "myAccount/audit"
    );
    label = (await io.flowBuilder.getText(
      selectors.flowBuilderPagePO.AUDIT_LOG_CHANGES
    )) as string;
    await io.assert.expectToBeValue(label, "View", "Label is not 'View'");
  });
});
