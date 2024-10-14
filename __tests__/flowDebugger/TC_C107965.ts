import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107965 from '../../testData/inputData/FlowDebugger/C107965.json';


test.describe("Validate the hover text for disabled Test Run button (On top and in the run console)", () => {
  test("@Env-All @Zephyr-IO-T24092 Validate the hover text for disabled Test Run button (On top and in the run console)", async ({ io, page }) => {
    //Create a flow with offline connections
    await io.createResourceFromAPI(C107965, "FLOWS");

    //Disable the flow
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

    //Wait for the flow to be disabled completely
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON);

    //Hover on the disabled Run Test button on top
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0, true);
   
    //Get the hover text
    await io.flowBuilder.waitForElementAttached(selectors.mappings.TOOLTIP);
    const hoverText = (await io.flowBuilder.getText(selectors.mappings.TOOLTIP)).toString();

    //Validate the hover text
    await io.assert.expectToContainValue('You can\'t use the currently selected source for a test run unless you either bring it online or enter mock output data. Any lookup steps present in the flow must also either be online or have mock output data.', hoverText, 'Hover text did not appear');
    
    //Hover on the disabled Run Test button on run console
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 1, true);

    //Get the hover text
    await io.flowBuilder.waitForElementAttached(selectors.mappings.TOOLTIP);
    const hoverTextConsole = (await io.flowBuilder.getText(selectors.mappings.TOOLTIP)).toString();
    
    //Validate the hover text
    await io.assert.expectToContainValue('You can\'t use the currently selected source for a test run unless you either bring it online or enter mock output data. Any lookup steps present in the flow must also either be online or have mock output data.', hoverTextConsole, 'Hover text did not appear');
    

  });

});