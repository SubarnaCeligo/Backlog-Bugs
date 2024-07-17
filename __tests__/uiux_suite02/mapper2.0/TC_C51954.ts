import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51954 Verify monitor user should be able to collapse and expand the mappings", () => {
  test("@Env-All @Zephyr-IO-T22459 C51954 Verify monitor user should be able to collapse and expand the mappings", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "Mapping_DND")
    await io.flowBuilder.clickByText('Mapping_DND');
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.click(selectors.basePagePO.EXPAND_ALL);
    let rowNumber = (await page.locator('.rc-tree-treenode.rc-tree-treenode-switcher-open').all()).length;
    await io.assert.expectToBeValue("7", rowNumber.toString(), "All the rows are not expanded initially");
    await io.flowBuilder.click(selectors.basePagePO.COLLAPSE_ALL);
    rowNumber = (await page.locator('.rc-tree-treenode.rc-tree-treenode-switcher-close').all()).length;
    await io.assert.expectToBeValue("1", rowNumber.toString(), "All the rows are not expanded initially");
  });
});