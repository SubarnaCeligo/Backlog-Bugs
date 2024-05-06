import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C68544 Verify real time call is not made on previewing the look up with POST request (Reported issue-IO-34586)", () => {
  test("@Env-All C68544 Verify real time call is not made on previewing the look up with POST request (Reported issue-IO-34586)  ", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C68544_DND');
    await io.integrationPage.delay(2000); // wait for the search to complete
    await io.homePage.clickByText("TC_C68544_DND")
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR)
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1)
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING)
    await io.homePage.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
    await io.assert.expectNotToBeNull(selectors.basePagePO.RESULT_PREVIEW_CONTENT, "preview doesn't contain text")
  });
});


