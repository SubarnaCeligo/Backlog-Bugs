import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T26933_Test to verify layout toggle with 3 options is added for XML parser helper at AFE fields and also at playground", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T26933 @Zephyr-IO-T26933 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Playground");
        await io.homePage.addStep("*** Navigated back to playground page ***");
        await io.homePage.clickByText('XML parser helper');
        await io.homePage.addStep("*** Clicked on XML parser editor ***");
        await io.homePage.clickByText('XML parser');
        await io.homePage.addStep("*** Navigated to XML parser section ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COMPACT_VIEW);
        await io.homePage.addStep("*** Clicked on compact view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COLUMN_VIEW);
        await io.homePage.addStep("*** Clicked on column view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.ROW_VIEW);
        await io.homePage.addStep("*** Clicked on row view one of the 3 options which is available  ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});