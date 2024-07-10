import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/T31943.json';

test.describe("@Author_MaheshNivruttiSutar Verify setting should not wiped out If we just added a rule, don’t save, then change the input json data.", () => {
    test.describe.configure({ retries: 1 })
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("Navigated to home page");
    });
    test("@Bug-IO-77601 @Env-QA @Priority-P2 @Zephyr-IO-T31943", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.loadingTime();
        //Click on Output filter
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 0);
        await io.flowBuilder.click(selectors.basePagePO.OUTPUTFILTER);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RULE_VALUE, "Open");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
        const field = await page.$$(selectors.flowBuilderPagePO.FILTER_CONTAINER);
        await field[1].selectOption("settings.export.pathparam");
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RULE_VALUE, 'test', 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RULE_VALUE, 'Close', 2);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
        const field1 = await page.$$(selectors.flowBuilderPagePO.FILTER_CONTAINER);
        await field1[3].selectOption("settings.export.pathparam");
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RULE_VALUE, 'test2', 3);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.loadingTime();
        await page.keyboard.type('test');
        await io.flowBuilder.loadingTime();
        const buttonDis = await page.$(selectors.flowBuilderPagePO.FILTER_CONTENT);
        expect(await buttonDis.screenshot()).toMatchSnapshot("TC-C1197931-chromium-linux.png");
    });
});