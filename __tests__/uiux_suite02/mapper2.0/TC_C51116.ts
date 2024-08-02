import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51116 Verify mapper settings page new field 'Source record field' should be added for field mapping type 'standard mapping'", () => {
  test("@Env-All @Zephyr-IO-T22347 C51116 Verify mapper settings page new field 'Source record field' should be added for field mapping type 'standard mapping'", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION_WDIO, "HTTP_DND_UIUX")
    await io.homePage.clickByText('HTTP_DND_UIUX');
    await io.homePage.loadingTime()
    await io.homePage.click('[aria-label="Edit mapping"]');
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
    await io.assert.verifyElementIsDisplayed(selectors.mappings.MAPPER2DOT0PO.SOURCE_FIELD, 'Source record field is not displayed');
  });
});