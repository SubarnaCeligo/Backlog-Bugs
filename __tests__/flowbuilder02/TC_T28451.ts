import {expect, test} from "@celigo/ui-core-automation";
import testData from "../../testData/inputData/FlowBuilder/T28451.json";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_T28451_Verify message when when user tries to drag the import step within a branched flow", () => {
    test("@Bug-IO-70825 @Env-All @Priority-P2 @Zephyr-IO-T28451 Verify message when when user tries to drag the import step within a branched flow", async ({io, page}) => {
        let flowID = await io.flowbranching.createFlowBranchFromAPI(testData);
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]+"flowBuilder/"+flowID);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
    });
  });