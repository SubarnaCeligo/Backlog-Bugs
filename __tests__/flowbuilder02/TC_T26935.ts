import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T26935_Test to verify layout toggle with 3 options is not added for form builder (Script view) at AFE fields and also at playground", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T26935 @Zephyr-T26935 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Playground");
        await io.homePage.addStep("*** Navigated back to playground page ***");
        await io.homePage.clickByText('Form builder');
        await io.homePage.addStep("*** Clicked on Form builder editor ***");
        await io.homePage.clickByText('Simple form');
        await io.homePage.addStep("*** Navigated to Simple form section ***");
        await io.flowBuilder.click(selectors.flowGroupingPagePO.SCRIPTTOGGLEBUTTON);
        await io.homePage.addStep("*** Switched to script view from json view  ***");
        const togglevisible1 = await io.flowBuilder.isVisible(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.assert.expectToBeFalse(togglevisible1, 'toggle is still visible');
        await io.homePage.clickByText('Field containers');
        await io.homePage.addStep("*** Navigated to Field containers section ***");
        await io.flowBuilder.click(selectors.flowGroupingPagePO.SCRIPTTOGGLEBUTTON);
        await io.homePage.addStep("*** Switched to script view from json view  ***");
        const togglevisible = await io.flowBuilder.isVisible(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.assert.expectToBeFalse(togglevisible, 'toggle is still visible');
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});