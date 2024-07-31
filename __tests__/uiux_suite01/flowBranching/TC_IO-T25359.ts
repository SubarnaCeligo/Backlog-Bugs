import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T25359 from '../../../testData/inputData/flowbranching/T25359.json';

test.describe("IO-T25359 Verify for input/output filter, Branching router when there is only one rule, AND/OR should be disabled", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("Navigated to home page");
    });
    test("@Env-All @Zephyr-IO-T25359 Verify for input/output filter, Branching router when there is only one rule, AND/OR should be disabled", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(T25359, "FLOWS");
        await io.flowBuilder.loadingTime();
        //Click on Output filter
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 0);
        await io.flowBuilder.click(selectors.basePagePO.OUTPUTFILTER);
        await io.flowBuilder.loadingTime();
        const andLabel = await page.getByText("AND", { exact: true });
        const orLabel = await page.getByText("OR", { exact: true });
        await io.assert.expectToBeTrue(await (andLabel).isDisabled(), "AND Label is not disabled");
        await io.assert.expectToBeTrue(await (orLabel).isDisabled(), "OR Label is not disabled");
    });
});