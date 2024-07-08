import {expect, test} from "@celigo/ui-core-automation";
import testData from "../../testData/inputData/FlowBuilder/T28451.json";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_T28451_Verify message when when user tries to drag the import step within a branched flow", () => {
    test("@Bug-IO-70825 @Env-All @Priority-P2 @Zephyr-IO-T28451 Verify message when when user tries to drag the import step within a branched flow", async ({io, page}) => {
        let flowID = await io.flowbranching.createFlowBranchFromAPI(testData);
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]+"flowBuilder/"+flowID);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.dragAndDrop(selectors.flowBuilderPagePO.IMPORT_DRAG_DROP, selectors.flowBuilderPagePO.EXPORT_DRAG_DROP);
        await io.flowBuilder.waitForElementAttached(selectors.flowGroupingPagePO.ALERT_MESSAGE);
        let message = (await io.flowBuilder.getText(selectors.basePagePO.NOTIFICTION_BAR)).toString();
        await io.assert.expectToBeValue(
            "You can’t drag and drop to reorder a step in a branched flow. To reorder, remove the flow step and add it at the preferred location.",
            message,
            "Message is not displayed");
        await io.api.deleteFlowViaAPI(flowID);    
    });
  });