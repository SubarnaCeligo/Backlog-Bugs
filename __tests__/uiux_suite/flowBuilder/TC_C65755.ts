import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C27545 from '../../../testData/Flows/C27545.json'

test.describe("C65755 Verify that the Delta Preview window is closed when user clicks on Cancel Button", () => {
  test("C65755 Verify that the Delta Preview window is closed when user clicks on Cancel Button", async ({io, page}) => {
      await io.fillFormUI(C27545, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.assert.verifyElementIsDisplayed('#startDateAutomatic', 'Pop up did not open');
      await io.flowBuilder.click('[data-test="close"]');
      const isPopUpNotVisible = !await io.flowBuilder.isVisible('#startDateAutomatic');
      await io.assert.expectToBeTrue(isPopUpNotVisible, 'The pop is still visible after clicking cancel')
  });
});