import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../../testData/inputData/FlowBuilder/T28445.json';

test.describe("IO-T28445", () => {
    test("@Bug-IO-66814  @Priority-P2  @Zephyr-T28445 @Env-All", async ({ io, page, context}) => {
        await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        //Clicking on mapping
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.flowBuilder.loadingTime();
        const currentURL = page.url();
        // Open a new tab
        const newPage = await context.newPage();
        await newPage.goto(currentURL);
        await io.flowBuilder.loadingTime();
        await newPage.hover(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE);
        await io.flowBuilder.loadingTime();
        await newPage.evaluate(() => {
            const element = document.querySelector(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_REMOVE);
            element.setAttribute('style', 'display: inline-block;');
        });
        const a = await newPage.$(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_REMOVE);
        await a.click();
        await io.flowBuilder.loadingTime();
        await newPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await newPage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")
    });
});