import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53149 Verify import mappings for IA's with monitor permissions", () => {
  test("@Env-All @Zephyr-IO-T22569 C53149 Verify import mappings for IA's with monitor permissions", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION_WDIO, "HTTP_DND_UIUX")
    await io.homePage.clickByText('HTTP_DND_UIUX');
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.homePagePO.ADD_MAPPING);
    await io.homePage.loadingTime()
    await io.assert.verifyElementIsDisplayed(selectors.mappings.MAPPER2DOT0PO.ADD, 'Add button is not displayed');
  });
});