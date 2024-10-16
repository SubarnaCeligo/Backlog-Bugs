import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/T39127.json";

test.describe("@Author_MaheshNivruttiSutar Verify User is able to save lookup/import after Unchecking One-to-Many with “Override Child Record Trace Key Template” Set'", () => {
    let id;
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-97060 @Priority-P2 @Env-QA @Zephyr-IO-T39127'", async ({ io, page, context }) => {
        id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.loadingTime();
        await page.getByText("DESTINATIONS & LOOKUPS").waitFor({ state: "visible", timeout: 360000 });

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.isPageLoaded();
        await io.flowBuilder.click(selectors.basePagePO.FALSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")

        //Import
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.isPageLoaded();
        await io.flowBuilder.click(selectors.basePagePO.FALSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly");

    });
});