import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../../testData/EM2.0/TC_C51661.json';

test.describe("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", () => {
    test("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51661, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        const options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
        options[1].click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_RESOLVE_ERROR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVED_ERRORS_TAB);
        await page.getByText('Refresh errors').click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_DETAILS_TAB_LIST)
        const errorDetailsTabs = page.locator(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_DETAILS_TAB_LIST).nth(1);
        expect(errorDetailsTabs.locator('text="Edit retry data"')).toBeVisible();
        expect(errorDetailsTabs.locator('text="HTTP request"')).toBeVisible();
        expect(errorDetailsTabs.locator('text="HTTP response"')).toBeVisible();
        expect(errorDetailsTabs.locator('text="Error fields"')).toBeVisible();

        const firstTabInTablist = errorDetailsTabs.locator("button:nth-of-type(1)");
        const firstTabButton = page.getByRole("tab", { name: "Edit retry data" });
        expect(await firstTabButton.textContent()).toEqual(
          await firstTabInTablist.textContent()
        );

        const secondTabInTablist = errorDetailsTabs.locator("button:nth-of-type(2)");
        const secondTabButton = page.getByRole("tab", { name: "HTTP request" });
        expect(await secondTabButton.textContent()).toEqual(
          await secondTabInTablist.textContent()
        );

        const thirdTabInTablist = errorDetailsTabs.locator("button:nth-of-type(3)");
        const thirdTabButton = page.getByRole("tab", { name: "HTTP response" });
        expect(await thirdTabButton.textContent()).toEqual(
          await thirdTabInTablist.textContent()
        );

        const fourthTabInTablist = errorDetailsTabs.locator("button:nth-of-type(4)");
        const fourthTabButton = page.getByRole("tab", { name: "Error fields" });
        expect(await fourthTabButton.textContent()).toEqual(
          await fourthTabInTablist.textContent()
        );
    });
  });