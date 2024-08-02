import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51599`, () => {
    test(`@Env-All @Zephyr-IO-T18918 C51599`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, "LOOP RETURNS");
        await page.keyboard.press('Enter');
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