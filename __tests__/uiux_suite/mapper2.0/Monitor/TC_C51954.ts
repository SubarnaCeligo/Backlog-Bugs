import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51954 Verify monitor user should be able to collapse and expand the mappings", () => {
  test("C51954 Verify monitor user should be able to collapse and expand the mappings", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('Mapping_DND');
    await io.flowBuilder.click('[data-test="importMapping"]');
    await io.flowBuilder.click('[date-test="expandAll"]');
    let rowNumber = (await page.locator('.rc-tree-treenode.rc-tree-treenode-switcher-open').all()).length;
    await io.assert.expectToBeValue("5", rowNumber.toString(), "All the rows are not expanded initially");
    await io.flowBuilder.click('[date-test="collapseAll"]');
    rowNumber = (await page.locator('.rc-tree-treenode.rc-tree-treenode-switcher-close').all()).length;
    await io.assert.expectToBeValue("1", rowNumber.toString(), "All the rows are not expanded initially");
  });
});