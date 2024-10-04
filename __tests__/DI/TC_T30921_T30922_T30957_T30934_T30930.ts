import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30921_T30922_T30957_T30934_T30930", () => {
  test("@Env-All  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30921 @Zephyr-IO-T30922 @Zephyr-IO-T30957 @Zephyr-IO-T30934 @Zephyr-IO-T30930 TC_T30921_T30922_T30957_T30934_T30930", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.viewFieldsOfObject("Accepted Event Relation");

    //T30921 T30922
    const maskButtons = await page.$$(selectors.syncPagePO.MASK_BUTTON);
    const flag = await maskButtons[1].isDisabled();
    expect(flag).toBeFalsy();

    //T30957
    await io.assert.verifyElementDisplayedByText(
      "BOOLEAN",
      "String is not displayed"
    );

    //T30934
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.FIELDS_CLOSE,
      "Close button not displayed"
    );
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_CLOSE);

  });
});
