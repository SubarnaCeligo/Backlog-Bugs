import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C1458 Verify Notify me when job has errors field contains all the flows of that integration and "All flows" option`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`@Env-All C1458 Verify Notify me when job has errors field contains all the flows of that integration and "All flows" option`, async ({
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
    await io.flowBuilder.addStep(
      "Verified all flows are displayed in the dropdown"
    );
    const allFlowsCheckbox = page
      .getByRole("option")
      .filter({ has: page.getByText("All flows") });
    await expect(allFlowsCheckbox).toBeVisible();
    await io.flowBuilder.addStep("Verified 'All flows' checkbox is displayed");
  });
});
