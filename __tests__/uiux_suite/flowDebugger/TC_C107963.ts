import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107963 from '../../../testData/inputData/FlowDebugger/C107963.json';


test.describe("Verify the hover text for disabled source in dropdown.", () => {
  test("Verify the hover text for disabled source in dropdown.", async ({ io, page }) => {
    //Create a flow with multiple exports and offline connections
    await io.fillFormUI(C107963, "FLOWS");

    //Disable the flow
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

    //Click on the Run Test chevron icon
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);

    // Extract the X and Y coordinates from the handle
    const runTestDropdownButton = await page.locator('ul> div> li> div > span > button[data-test="runTest"]').first();
    const handle = await runTestDropdownButton.evaluateHandle(element => {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y
      };
    });

    const coordinates = await handle.jsonValue();
    console.log('X coordinate:', coordinates.x);
    console.log('Y coordinate:', coordinates.y);
    await handle.dispose();

    //Move the mouse on disabled button
    await page.mouse.move(coordinates.x, coordinates.y);
    await page.waitForTimeout(2000);

    //Get the hover text
    const hoverText = await page.locator('[role="tooltip"] div div').allTextContents();

    //Validate the hover text
    const isHoverTextVisible = hoverText.includes('You can\'t select this source for a test run unless your source is either online or has mock output data. Any lookup steps present in the flow must also either be online or have mock output data.');
    await io.assert.expectToBeTrue(isHoverTextVisible, "Hover Text did not appear on moving the mouse");
    
  });
});