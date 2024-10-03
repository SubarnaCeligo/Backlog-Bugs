import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30843_T30829_T30825_T30831", () => {
  test("@Env-All  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30843 @Zephyr-IO-T30829 @Zephyr-IO-T30825 @Zephyr-IO-T30831 TC_T30843_T30829_T30825_T30831", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");

    //T30843 T30829 T30825
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.WIZARD_NEXT,
      "Next button is not displayed"
    );

    //T30831
    await io.assert.verifyElementToBeClickable(
      selectors.syncPagePO.EDIT_CONNECTION_ICON
    );
  });
});
