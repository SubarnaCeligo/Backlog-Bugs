import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C29010 Account Dashboard - Completed flows - When there is no completed flow, the user sees the message “You don’t have any completed flows in the selected date range.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T6388 @Env-All C29010 Account Dashboard - Completed flows - When there is no completed flow, the user sees the message “You don’t have any completed flows in the selected date range.", async ({
    io,
    page
  }) => {
    await io.flowBuilder.click(selectors.basePagePO.DASHBOARD);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.assert.textFromElement(
      selectors.myAccountPagePO.DASHBOARDTEXT,
      "You don't have any completed flows in the selected date range."
    );
  });
});
