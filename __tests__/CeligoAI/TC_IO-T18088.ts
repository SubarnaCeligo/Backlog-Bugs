import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T18088 ", () => {
    test("@Env-All @Zephyr-IO-T18088 Verify the Padlock icon is visible for selected fields in mapper 2.0", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await page.getByPlaceholder('Search…').click();
        await page.getByPlaceholder('Search…').fill('IO-T18088_DND');
        await page.getByRole('link', { name: 'IO-T18088_DND' }).click();
        await io.flowBuilder.waitForElementAttached(
            selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
        );
        await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
            1
        );
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,
            2
        );
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.AUTO_POPULATE_MAPPINGS);
        await io.homePage.loadingTime();

        const lockIcon = page.locator(selectors.basePagePO.PADLOCK_ICON).nth(2);

        // Step 3: Ensure the lock icon is visible
        await expect(lockIcon).toBeVisible();

        // Step 4: Check if the lock icon is disabled by verifying attributes (like `aria-hidden`)
        const ariaHiddenValue = await lockIcon.getAttribute('aria-hidden');
        expect(ariaHiddenValue).toBe('true');

        const focusableValue = await lockIcon.getAttribute('focusable');
        expect(focusableValue).toBe('false');
    });
});
