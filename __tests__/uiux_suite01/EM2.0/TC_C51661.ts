import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '@testData/EM2.0/TC_C51661.json';

test.describe("C51661 Verify the 'Error details' header fields displayed in the New View", () => {
    test("C51661 Verify the 'Error details' header fields displayed in the New View", async ({io, page}) => {
        const errorFlowId = await io.createResourceFromAPI(C51661, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.homePage.reloadPage()
        await io.homePage.loadingTime()
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ERROR_DETAILS_TAB_LIST)
        const errorDetailsTabs = page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.ERROR_DETAILS_TAB_LIST);
        expect(errorDetailsTabs.locator('text="Edit retry data"')).toBeVisible();
        expect(errorDetailsTabs.locator('text="HTTP request"')).toBeVisible();
        expect(errorDetailsTabs.locator('text="HTTP response"')).toBeVisible();
        expect(errorDetailsTabs.locator('text="Error fields"')).toBeVisible();

        const firstTabInTablist = errorDetailsTabs.locator("button:nth-of-type(1)");
        const firstTabButton = page.getByRole("tab", { name: "Edit retry data" });
        expect(await firstTabButton.textContent()).toEqual(
          await firstTabInTablist.nth(1).textContent()
        );

        const secondTabInTablist = errorDetailsTabs.locator("button:nth-of-type(2)");
        const secondTabButton = page.getByRole("tab", { name: "HTTP request" });
        expect(await secondTabButton.textContent()).toEqual(
          await secondTabInTablist.nth(1).textContent()
        );

        const thirdTabInTablist = errorDetailsTabs.locator("button:nth-of-type(3)");
        const thirdTabButton = page.getByRole("tab", { name: "HTTP response" });
        expect(await thirdTabButton.textContent()).toEqual(
          await thirdTabInTablist.nth(1).textContent()
        );

        const fourthTabInTablist = errorDetailsTabs.locator("button:nth-of-type(4)");
        const fourthTabButton = page.getByRole("tab", { name: "Error fields" });
        expect(await fourthTabButton.textContent()).toEqual(
          await fourthTabInTablist.nth(1).textContent()
        );
    });
});
