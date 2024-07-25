import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C112351 from '@testData/FlowDebugger/C112351.json';

test.describe("TC_T24938 Verify The results of the flow run (success, ignore, error, resolve) is shown in the console, just like for regular flow runs", () => {
    test("@Env-All @Zephyr-IO-T24938 C24938 Verify The results of the flow run (success, ignore, error, resolve) is shown in the console, just like for regular flow runs", async ({ io, page }) => {
        await io.createResourceFromAPI(C112351, "FLOWS");
        await io.homePage.loadingTime()

        await io.homePage.addStep("*** Disable the flow ***")
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    
        await io.homePage.addStep("*** Run the flow in test mode ***")
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.homePage.loadingTime()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        const tableHeaders = await page.locator(selectors.basePagePO.TEMPLATETABLEHEADING);
        expect(tableHeaders).toHaveCount(9);

        const headerTexts = [];
        for (let i = 0; i < 9; i++) {
            const headerText = await tableHeaders.nth(i).textContent();
            headerTexts.push(headerText);
        }

        await io.homePage.addStep("*** Verifying we have all the columns of Production mode in test mode ***")
        expect(headerTexts).toEqual(["Step", "Status", "Success", "Ignored", "Errors", "Auto-resolved", "Pages", "Duration", "Completed"]);

    });
});