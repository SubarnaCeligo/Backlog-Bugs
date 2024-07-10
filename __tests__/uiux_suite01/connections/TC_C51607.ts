import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51607`, () => {
    test(`@Env-All @Zephyr-IO-T18926 C51607`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, "LOOP RETURNS");
        await page.keyboard.press('Enter');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            1
          );
          const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const helpText = await helpTextPopup.textContent();
          expect(helpText).toContain('Enter a unique name for your connection so that you can easily reference it from other parts of the application.');
          


    });
});