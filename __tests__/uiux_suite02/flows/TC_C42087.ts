import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42087 @Epic-IO-19524 @Env-All @Zephyr/IO-T5642 Test to verify that user is able to select a snapshot which is available in 2nd or 3rd page under revisions tab and initiate a revert on it", () => {
  test("C118293 Test to verify that user is able to select a snapshot which is available in 2nd or 3rd page under revisions tab and initiate a revert on it", async ({ io, page }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - C42087-rename_DND');
    await io.flowBuilder.clickByText('Clone - C42087-rename_DND');
    await io.flowBuilder.clickByText("Revisions");
    // await io.flowBuilder.click('[text="Results per page:"] ~ div');
    // await page.waitForTimeout(600000)
    // await io.flowBuilder.clickByIndex(selectors.basePagePO.SEARCH, 3);
    await io.flowBuilder.clickByText("50");
    await io.flowBuilder.clickByText("10");
    await io.flowBuilder.click(selectors.basePagePO.IDNEXTPAGE);
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);
    await io.flowBuilder.clickByText("Revert to this revision");
  });
});