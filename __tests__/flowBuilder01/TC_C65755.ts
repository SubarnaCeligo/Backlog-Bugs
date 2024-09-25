import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C27545 from '../../testData/inputData/Flows/C27545.json'

test.describe("C65755 Verify that the Delta Preview window is closed when user clicks on Cancel Button", () => {
  test("C65755 Verify that the Delta Preview window is closed when user clicks on Cancel Button @Env-All @Priority-P3 @Zephyr-IO-T24329", async ({io, page}) => {
      await io.createResourceFromAPI(C27545, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.START_DATE_AUTOMATIC, 'Pop up did not open');
      await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
      const isPopUpNotVisible = !await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.START_DATE_AUTOMATIC);
      await io.assert.expectToBeTrue(isPopUpNotVisible, 'The pop is still visible after clicking cancel')
  });
});