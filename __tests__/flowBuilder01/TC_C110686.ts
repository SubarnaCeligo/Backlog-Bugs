import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110682 from '../../testData/inputData/FlowBuilder/C110682.json';


test.describe("Verify that the hide map(X) icon appears upon hovering over the map and validate the hovertext", () => {
  test("Verify that the hide map(X) icon appears upon hovering over the map and validate the hovertext @Zephyr-IO-T13322 @Env-All @Priority-P2", async ({ io, page }) => {
    //Create a flow
    await io.createResourceFromAPI(C110682, "FLOWS");

    //Wait for the mini map controld to load 
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

    //Click on Show Map
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SHOW_HIDE_MAP);

    //Hover on the map
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.MINI_MAP, 0, false);

    //Wait for X icon to appear and hover on it
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HIDE_MAP_X_ICON);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.HIDE_MAP_X_ICON,'X icon is not displayed on map upon hovering');

    //Hover on X icon
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.HIDE_MAP_X_ICON, 0, false);

    //Get the hover text
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
    const hoverText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP)).toString();

    //Validate the hover text
    await io.assert.expectToContainValue('Hide map', hoverText, 'Incorrect/No hover text')

   
  });
});