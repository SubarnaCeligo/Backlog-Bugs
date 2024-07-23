import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T19797 from '@testData/EM2.0/T19797.json';

test.describe("T19797 Verify the message in the Error dashboard open errors tab when there is no Errors in the flow", () => {
    test("@Zephyr-IO-T19797 @Env-All @Priority-P2 T19797 Verify the message in the Error dashboard open errors tab when there is no Errors in the flow UI_Backlog", async ({ io, page }) => {
        await io.createResourceFromAPI(T19797, "FLOWS");

        await io.flowBuilder.addStep('*** Running the flow ***');
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.addStep('*** Opening the errors drawer ***');
        await io.flowBuilder.clickByTextByIndex('Success', 2);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText('Open errors', { exact: false });

        await io.flowBuilder.addStep('*** Verifying the message ***');
        expect(await page.getByText("You don't have any open errors.").isVisible()).toBeTruthy();
        expect(await page.getByText("If Refresh errors is enabled, you can click it to retrieve additional errors.").isVisible()).toBeTruthy();
    });
});
