import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T795 from "@testData/FlowBuilder/T795.json";

test.describe("TC_T23334 Verified insert , update, insert/update operations for product and pricebookentry records in Composite type.", () => {
    let id;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
    });

    test("@Zephyr-IO-T23334 @Env-All C108586 Verified insert , update, insert/update operations for product and pricebookentry records in Composite type.", async ({
        io,
        page
    }) => {
        id = await io.createResourceFromAPI(T795, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.loadingTime()
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({ state: 'visible', timeout: 300000 });
        const error = await page.$("text='error'");
        expect(error).toBe(null);
    });
});