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
    await io.homePage.clickByText("Automation Flows");
    await io.flowBuilder.click(selectors.integrationPagePO.NOTIFICATIONS_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_FLOWS);
    // TODO: selector.flowBuilderPagePO.FLOWS_LIST
    const flowsList = await page.$$("[role=listbox] li");
    for (const flow of flowsList) {
      await flow.click();
    }
    const allFlowsCheckbox = page
      .getByRole("option")
      .filter({ has: page.getByText("All flows") });
    // await allFlowsCheckbox.waitFor({ state: "visible", timeout: 10000 });
    await expect(allFlowsCheckbox).toHaveAttribute("aria-selected", "false");
  });
});
