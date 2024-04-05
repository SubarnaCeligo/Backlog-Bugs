import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C1583 Verify Transfer Ownership notification shows the integration name", () => {
  test("@Env-All C1583 Verify Transfer Ownership notification shows the integration name", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime()
    await io.myAccountPage.click(selectors.basePagePO.NOTIFICATION_ARIA_LABEL)
    await io.myAccountPage.loadingTime()
    await io.homePage.addStep("Clicked on notifications icon");
    await expect(page.getByText("AA Transfer 1")).toBeVisible();
    await io.homePage.addStep("Verified the integration name");
  });
});
