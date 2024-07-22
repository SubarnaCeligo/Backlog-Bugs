import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C59674 from "@testData/FlowDebugger/C59674.json";


test.describe("C59674 To Verify that the Mock Response are working as expected", () => {
    let flowId;
    test("@Env-All @Zephyr-IO-T14540 C59674 To Verify that the Mock Response are working as expected", async ({ io, page }) => {
       
    flowId = await io.createResourceFromAPI(C59674, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.addStep("Running the flow");
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    expect(lastRun).toBeVisible();
    });

});
