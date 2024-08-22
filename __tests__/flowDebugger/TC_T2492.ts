import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T2492 from '../../testData/inputData/FlowBuilder/T2492.json';


test.describe("T2492 Verify that run button is disabled when flow is disabled", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T2492 Verify that run button is disabled when flow is disabled ", async ({ io, page }) => {
    //Create a flow 
    flowId = await io.createResourceFromAPI(T2492, "FLOWS");

    //Wait for the flow to load
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

    //disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);

    //Navigate to Integration page
    io.flowBuilder.clickByText('Automation Flows');

    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'T2492 Flow');
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);


    //Run flow should be disabled
    await io.assert.verifyElementAttributeContainsText(
      selectors.basePagePO.RUNFLOW,
      "class",
      "Mui-disabled"
    );
  });
});