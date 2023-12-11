import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1583 Verify Transfer Ownership notification shows the integration name", () => {
  test("C1583 Verify Transfer Ownership notification shows the integration name", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.getByText("1").waitFor({ state: "visible" });
    await page.getByLabel("notifications").click();
    await io.homePage.addStep("Clicked on notifications icon");
    await expect(page.getByText("AA Transfer 1")).toBeVisible();
    await io.homePage.addStep("Verified the integration name");
  });
});
