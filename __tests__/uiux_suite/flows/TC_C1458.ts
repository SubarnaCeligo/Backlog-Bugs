import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C1458 Verify Notify me when job has errors field contains all the flows of that integration and "All flows" option`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
  });

  test(`C1458 Verify Notify me when job has errors field contains all the flows of that integration and "All flows" option`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Automation Flows");
    const url = new URL(page.url());
    await io.flowBuilder.click(selectors.integrationPagePO.NOTIFICATIONS_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_FLOWS);
    const path = url.pathname;
    const flows = await io.api.getCall(`v1${path}`);
    await expect(page.getByRole("option")).toHaveCount(flows.length + 1);
    const allFlowsCheckbox = page
      .getByRole("option")
      .filter({ has: page.getByText("All flows") });
    await expect(allFlowsCheckbox).toBeVisible();
  });
});
