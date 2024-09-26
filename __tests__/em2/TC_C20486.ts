
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C20486", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.isPageReady();
  });

  test("@Env-All @Zephyr-IO-T7185 |Clicking on the error count in the homepage and naviagting to Flowtab", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    const tile = page.locator(selectors.homePagePO.INTEGRATION_TILES).filter({
      has: page.getByText("Automation Flows"),
    });
    await tile.getByText("errors").click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var data = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.CREATEFLOW
    );
    await io.assert.expectToBeTrue(data, "");
  });
});
