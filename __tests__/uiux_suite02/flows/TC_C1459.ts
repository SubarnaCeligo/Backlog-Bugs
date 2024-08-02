import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C1459 Verify User should not select multiple flows and also "All flows" from Notify me when job has error field`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`@Env-All C1459 Verify User should not select multiple flows and also "All flows" from Notify me when job has error field`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("TC_C1459_DND");
    await io.flowBuilder.click(selectors.integrationPagePO.NOTIFICATIONS_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_FLOWS);
    const flowsList = await page.$$(selectors.flowBuilderPagePO.FLOWS_LIST);
    for (const flow of flowsList) {
      await flow.click();
    }
    await io.flowBuilder.addStep("Clicked on all flows");
    const allFlowsCheckbox = page
      .getByRole("option")
      .filter({ has: page.getByText("All flows") });
    await expect(allFlowsCheckbox).toHaveAttribute("aria-selected", "false");
    await io.flowBuilder.addStep("Verified 'All flows' checkbox is disabled");
  });
});
