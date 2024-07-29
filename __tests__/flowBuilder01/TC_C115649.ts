import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C115649", () => {
    test("TC_C115649 Verify Scroller is visible on the IA install base screen @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.hover(selectors.integrationPagePO.INTEGRATIONAPPS);
        await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATIONAPPS);
        await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.FLOW_NAME_ACCOUNT_DASHBOARD, selectors.integrationPagePO.OPENACTIONSMENU, "IA_DND");
        await io.flowBuilder.click(selectors.integrationPagePO.INSTALL_BASE);
    });
});