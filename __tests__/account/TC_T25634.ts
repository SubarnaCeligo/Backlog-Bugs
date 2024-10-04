import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T25634", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Priority-P2 @Zephyr-IO-T25634", async ({ io, page }) => {

    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources", "Exports");
    //Go to invalid URL
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "exports" + "2323425bjhdbfs2");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
  });
});