import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T26934_Test to verify layout toggle with 3 options is added for form builder (JSON view) at AFE fields and also at playground", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T26934 @Zephyr-T26934 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Playground");
        await io.homePage.addStep("*** Navigated back to playground page ***");
        await io.homePage.clickByText('Form builder');
        await io.homePage.addStep("*** Clicked on Form builder editor ***");
        await io.homePage.clickByText('Simple form');
        await io.homePage.addStep("*** Navigated to Simple form section ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.FORMBUILDER_COMPACTVIEW);
        await io.homePage.addStep("*** Clicked on compact view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.FORMBUILDER_COLUMNVIEW);
        await io.homePage.addStep("*** Clicked on column view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.FORMBUILDER_ROWVIEW);
        await io.homePage.addStep("*** Clicked on row view one of the 3 options which is available  ***");
        await io.homePage.clickByText('Field containers');
        await io.homePage.addStep("*** Navigated to Field containers section ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.FORMBUILDER_COMPACTVIEW);
        await io.homePage.addStep("*** Clicked on compact view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.FORMBUILDER_COLUMNVIEW);
        await io.homePage.addStep("*** Clicked on column view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.FORMBUILDER_ROWVIEW);
        await io.homePage.addStep("*** Clicked on row view one of the 3 options which is available  ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});