import {expect, test} from "@celigo/ui-core-automation";
import testData from "@testData/Flows/TC_T10748.json";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Adarsh Verify pfx content is masked in debug connection logs, HTTP import and Export when flow is executed", () => {
    test("@Bug-IO-62618 @Priority-P1 @Zephyr-IO-T10748 @Env-All Verify pfx content is masked in debug connection logs, HTTP import and Export when flow is executed", async ({io, page}) => {

        //Create a flow with export imports
        await io.flowBuilder.addStep("Creating the flow");
        let flowId = await io.createResourceFromAPI(testData, 'FLOWS');

        await io.flowBuilder.click(selectors.flowBuilderPagePO.CONNECTIONS_TAB);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
        await io.flowBuilder.addStep("Running the flow");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({ state: 'visible', timeout: 600000 });

        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE, 1);
        await io.flowBuilder.loadingTime();
        const content = await io.flowBuilder.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT);

        const pfxContent = '"agentOptions":{"pfx":"********"}'
        expect(content).toContain(pfxContent);

        // //Delete the flow after execution
        await io.api.deleteFlowViaAPI(flowId);

    });
  });