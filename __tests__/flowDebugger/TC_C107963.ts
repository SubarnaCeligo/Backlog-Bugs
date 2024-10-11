import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107963 from '../../testData/inputData/FlowDebugger/C107963.json';


test.describe("Verify the hover text for disabled source in dropdown.", () => {
  test("@Env-All @Zephyr-IO-T24091 Verify the hover text for disabled source in dropdown.", async ({ io, page }) => {
    //Create a flow with multiple exports and offline connections
    await io.createResourceFromAPI(C107963, "FLOWS");

    //Disable the flow
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

    //Wait for the flow to be disabled completely
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    
    //Click on the Run Test chevron icon
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);

    //Hover on the disabled button on Source Selection dropdown
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 2, true);

    //Get the hover text
    const hoverText = (await io.flowBuilder.getText(selectors.mappings.TOOLTIP)).toString();
    
    //Validate the hover text
    await io.assert.expectToContainValue('You can\'t select this source for a test run unless your source is either online or has mock output data. Any lookup steps present in the flow must also either be online or have mock output data.', hoverText, 'Hover Text did not appear' );
  
  });
});