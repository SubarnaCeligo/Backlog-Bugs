import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53141 Verify the guide link in import mappings for IA's", () => {
  test("@Env-All @Zephyr-IO-T9429 C53141 Verify the guide link in import mappings for IA's", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION_WDIO, "HTTP_DND_UIUX")
    await io.homePage.clickByText('HTTP_DND_UIUX');
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.homePagePO.ADD_MAPPING);
    await io.assert.verifyElementAttributeContainsText(selectors.mappings.MAPPER2DOT0PO.MAPPER2GUIDE, 'href', 'https://docs.celigo.com/hc/en-us/articles/4536629083035-Mapper-2-0');
  });
});