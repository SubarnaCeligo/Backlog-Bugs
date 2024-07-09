import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51600`, () => {
    test(`@Env-All @Zephyr-IO-T18919 C51600`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'LOOP RETURN CONNECTION');
        await io.exportsPage.clickByText("LOOP RETURN CONNECTION");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            0
          );
          const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const helpText = await helpTextPopup.textContent();
          expect(helpText).toContain('• Simple form helps you to quickly configure the resources by displaying only the required minimum fields.• HTTP form allows you to view and/or modify application specific resources at the universal HTTP connector level.');
          


    });
});