import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107965 from '../../../testData/inputData/FlowDebugger/C107965.json';


test.describe("Validate the hover text for disabled Test Run button (On top and in the run console)", () => {
  test("Validate the hover text for disabled Test Run button (On top and in the run console)", async ({ io, page }) => {
    //Create a flow with offline connections
    await io.fillFormUI(C107965, "FLOWS");

    //Disable the flow
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await page.waitForTimeout(5000);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);

    //Run button on top
    // Extract the X and Y coordinates from the handle
    const runTrunTestButtonOnTop = page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);
    const handle = await runTrunTestButtonOnTop.evaluateHandle(element => {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y
      };
    });

    const coordinates_top = await handle.jsonValue();
    console.log('X coordinate:', coordinates_top.x);
    console.log('Y coordinate:', coordinates_top.y);
    await handle.dispose();

    //Move the mouse on the coordinates
    await page.mouse.move(coordinates_top.x, coordinates_top.y);

    //Get the hover text
    const hoverText = await page.locator('[role="tooltip"] div div').first().innerText();
    console.log(hoverText);

    //Validate the hover text
    const isHoverTextVisible = (hoverText.includes('You can\'t use the currently selected source for a test run unless you either bring it online or enter mock output data.') && hoverText.includes('Any lookup steps present in the flow must also either be online or have mock output data.'));
    await io.assert.expectToBeTrue(isHoverTextVisible, "Hover Text did not appear on moving the mouse");
   
    //Run Test button on run console
    const runTrunTestButtonRunConole = page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_RUN_CONSOLE_XPATH);
    const handleConsole = await runTrunTestButtonRunConole.evaluateHandle(element => {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y
      };
    });

    // Extract the X and Y coordinates from the handle
    const coordinates_console = await handleConsole.jsonValue();
    console.log('X coordinate:', coordinates_console.x);
    console.log('Y coordinate:', coordinates_console.y);
    await handleConsole.dispose();


    //Move the mouse on the coordinates
    await page.mouse.move(coordinates_console.x, coordinates_console.y);

    //Get the hover text
    const hoverTextConsole = await page.locator('[role="tooltip"] div div').first().innerText();
    console.log(hoverTextConsole);

    //Validate the hover text
    const isHoverTextVisibleOnConsole = (hoverTextConsole.includes('You can\'t use the currently selected source for a test run unless you either bring it online or enter mock output data.') && hoverTextConsole.includes('Any lookup steps present in the flow must also either be online or have mock output data.'));
    await io.assert.expectToBeTrue(isHoverTextVisibleOnConsole, "Hover Text did not appear on moving the mouse");

  });

});