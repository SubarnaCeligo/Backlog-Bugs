import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51600`, () => {
    test(`@Env-All @Zephyr-IO-T18919 C51600`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Loop Returns');
        await page.keyboard.press('Enter');
        await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_NAME, 'Loop Returns connection');
        await io.flowBuilder.fill(selectors.templatePagePO.ORDERFULTOKEN,'12345');
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);
        await io.flowBuilder.loadingTime();
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Loop Returns connection');
        await io.flowBuilder.loadingTime();
        await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE,0);
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