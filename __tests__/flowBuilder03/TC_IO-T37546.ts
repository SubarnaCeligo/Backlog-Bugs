import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37546'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-93533 @Priority-P2 @Env-All @Zephyr-IO-T37546'", async ({ io, page }) => {
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'git');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GIT_HUB);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Listen for real-time data from source application');
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES,0);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.WEBHOOK_KEY_INPUT, '1234');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")
    });
});