import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify Existing Git hub listener user is not able see in 'Your existing flow steps'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-96378 @Priority-P2 @Env-QA @Zephyr-IO-T37530'", async ({ io, page }) => {
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
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, "Listener is not displaying in 'Your existing flow steps'")
    });
});