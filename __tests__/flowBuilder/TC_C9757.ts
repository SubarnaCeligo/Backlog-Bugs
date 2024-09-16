import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T2754", () => {
  test("@Env-All @Zephyr-IO-T2754", async ({io}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADMINTAB
    );

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.README);
    var imageButtonCheck = await io.homePage.getLengthOfElementArray(
      selectors.flowBuilderPagePO.EDIT_README
    );
    await io.homePage.loadingTime();
    var textExistingButton = await io.homePage.getText(
      selectors.flowBuilderPagePO.EDIT_README
    );
    expect(imageButtonCheck).toEqual(1);
    await io.assert.expectToBeValue(String(textExistingButton), "Edit readme", "");
      "The Image button shouldnot be Shown in the ReadMe toolbar."
  });
});
