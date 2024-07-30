import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T25359 from '../../../testData/inputData/flowbranching/T25359.json';

test.describe("IO-T25360 Verify colour when And/Or is enabled for input/output filters, Branching router.", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("Navigated to home page");
    });
    test("@Env-All @Zephyr-IO-T25360 VVerify colour when And/Or is enabled for input/output filters, Branching router.", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(T25359, "FLOWS");
        await io.flowBuilder.loadingTime();
        //Click on Output filter
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 0);
        await io.flowBuilder.click(selectors.basePagePO.OUTPUTFILTER);
        await io.flowBuilder.loadingTime();
        const andLabel = await page.getByText("AND", { exact: true });
        await io.flowBuilder.clickByText("Add rule");
        await expect(andLabel).toHaveCSS("background-color", "rgb(51, 61, 71)");
        await io.integrationPage.click(selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON);
        await io.flowBuilder.addStep("*** Opening branching drawer ***");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS,0);
        await io.flowBuilder.getByRoleClick('menuitem','Add branching');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.flowBranchingPO.GROUP_RULE, 0);
        await io.flowBuilder.clickByIndex(selectors.flowBranchingPO.GROUP_RULE, 0);
        const addCondition = await page.getByText("AND", { exact: true }).first();
        await expect(addCondition).toHaveCSS("background-color", "rgb(51, 61, 71)"); 
    });
});