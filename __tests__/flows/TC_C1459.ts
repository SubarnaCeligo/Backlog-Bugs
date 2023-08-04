import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C1459 Verify User should not select multiple flows and also "All flows" from Notify me when job has error field`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`C1459 Verify User should not select multiple flows and also "All flows" from Notify me when job has error field`, async ({
    io,
    page
  }) => {
    io.homePage.clickByText("Automation Flows");
    // TODO: Change selector once added in aut-selectors (integrationPagePO.NOTIFICATIONS_TAB)
    io.flowBuilder.click("[data-test='Notifications']");
    io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_FLOWS);
    for (const li of await page.getByRole("listbox").all()) {
      await li.click();
    }
    const allFlowsCheckbox = page
      .getByRole("option")
      .filter({ has: page.getByText("All flows") });
    await expect(allFlowsCheckbox).toHaveAttribute("aria-selected", "false");
  });
});
