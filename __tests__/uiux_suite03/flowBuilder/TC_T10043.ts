import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T10043 from '../../../testData/inputData/flowBuilder/TC_T10043.json';

test.describe(`T10043 Verify Retry is working as expected for imports with asynchelper Orchestration flow(Multiple PPs) UI_Backlog`, () => {
  test(`T10043 Verify Retry is working as expected for imports with asynchelper Orchestration flow(Multiple PPs) UI_Backlog`, async ({ io, page }) => {
    await io.flowBuilder.addStep("Creating and running the flow");
    const id = await io.createResourceFromAPI(T10043, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 600000 });


    await io.connectionPage.addStep("Verifying that the flow ran successfully");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(1) td:nth-child(5)', "Success");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(2) td:nth-child(5)', "Success");
  });
});