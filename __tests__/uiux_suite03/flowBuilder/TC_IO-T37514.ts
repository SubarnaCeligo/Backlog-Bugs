import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '@testData/FlowBuilder/T37514.json';

test.describe("@Author_MaheshNivruttiSutar ", () => {
    test("@Bug-IO-93745 @Env-All @Priority-P2 @Zephyr-IO-T37514", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.homePage.loadingTime();

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.homePage.loadingTime();
        await io.importsPage.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });
        await io.importsPage.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
        await io.importsPage.clickByText("Apply");
        await io.importsPage.click(selectors.flowBuilderPagePO.CLOSELOGS);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(
            selectors.connectionsPagePO.NAME_INPUT,
            "Http export test"
        );
        await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.exportsPage.clickByText('All - always export all data');
        await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        const changeNot = await io.flowBuilder.isVisible('text="Change Notification"');
        await io.assert.expectToBeFalse(changeNot, "Change Notification is displayed");
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")


        //Import
        await io.importsPage.click(selectors.importPagePO.CLICKIMPORT);
        await io.homePage.loadingTime();
        await io.importsPage.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });
        await io.importsPage.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
        await io.importsPage.clickByText("Apply");
        await io.importsPage.click(selectors.flowBuilderPagePO.CLOSELOGS);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(
            selectors.connectionsPagePO.NAME_INPUT,
            "Http import test"
        );
        await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        const changeNot1 = await io.flowBuilder.isVisible('text="Change Notification"');
        await io.assert.expectToBeFalse(changeNot1, "Change Notification is displayed");
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")
    });
});