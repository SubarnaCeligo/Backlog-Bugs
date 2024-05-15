import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51637 from '@testData/EM2.0/C51637.json';

test.describe("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", () => {
  let errorFlowId
  test.afterEach(async ({ io }) => {
      await io.api.deleteFlowsWithId(errorFlowId)
  }); 
  test("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", async ({io, page}) => {
        errorFlowId = await io.createResourceFromAPI(C51637, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51637', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 360000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FLOWS_LIST,1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU_RESOLVE_ERROR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
        await page.getByText('Refresh errors').click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ERROR_DETAILS_TAB_LIST)
        const errorDetailsTabs = page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.ERROR_DETAILS_TAB_LIST).nth(1);
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