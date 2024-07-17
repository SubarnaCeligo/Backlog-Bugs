import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98433 from '../../../testData/inputData/transformation/C98433.json';

test.describe("C98433-Verify user is able to Drag and drop the fields in Transformation 2.0", () => {
  
  test("@Env-All @Zephyr-IO-T20550 C98433- Drag and drop the fields in Transformation 2.0", async ({ io }) => {

    //Create a flow with transformations
    await io.createResourceFromAPI(C98433, "FLOWS");

    //Open transformation page
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);

    //Verify if the tree node has draggable property set to true
    await io.flowBuilder.waitForElementAttached(selectors.transformationPO.TRANFORMATION_TREE_NODE);
    await io.assert.verifyElementAttribute(selectors.transformationPO.TRANFORMATION_TREE_NODE, 'draggable', 'true');

    //Verify if drag handle is present on the UI element
    await io.flowBuilder.hover(selectors.transformationPO.TRANFORMATION_TREE_NODE);
    await io.flowBuilder.waitForElementAttached(selectors.transformationPO.TRANSFORMATION_DRAG_HANDLE);
    await io.assert.verifyElementIsDisplayed(selectors.transformationPO.TRANSFORMATION_DRAG_HANDLE, 'Drag handle is not visible');


  });

}
)
