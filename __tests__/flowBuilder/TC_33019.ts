import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Zephyr-IO-T3050 @Env-All", () => {

  test("Checking the continue setup tile status", async ({io,page}) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON + " input",
      "T3015_IA_DND"
    );
    await io.homePage.loadingTime();
    await expect(page.getByText('Continue setup >')).toBeVisible;
  });
});

