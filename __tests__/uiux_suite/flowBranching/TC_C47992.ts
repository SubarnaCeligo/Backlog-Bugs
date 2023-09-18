import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C47992 Verify the merging and add branch functionality for monitor access", () => {
    test("C47992 Verify the merging and add branch functionality for monitor access", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await page.locator(`${selectors.basePagePO.TAB_PANEL} table tbody tr`).nth(0).locator('th div').click();
        const addBranching = await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).all();
        expect(addBranching.length).toBe(0);
    });
  });