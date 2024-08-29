import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30823_T30851_T30854_T30890_T30852", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30823 @Zephyr-IO-T30851 @Zephyr-IO-T30854 @Zephyr-IO-T30890 @Zephyr-IO-T30852 TC_T30823_T30851_T30854_T30890_T30852", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");

    //T30823 T30851 T30854 T30890
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_STEPPER,
      "Source stepper is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Step 1",
      "stepper is not displayed"
    );
    await io.assert.verifyElementAttributeContainsText(
      selectors.syncPagePO.SOURCE_TYPE_CHECKBOX,
      "issubstepcompleted",
      "salesforce"
    );
    await io.assert.verifyElementDisplayedByText(
      "Choose source",
      "Choose source is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_CHECKBOX,
      "SOURCE_CONNECTION stepper is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Connect to source",
      "Connect to source is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_OBJECTS_CHECKBOX,
      "SOURCE_OBJECTS stepper is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Choose objects",
      "Choose objects is not displayed"
    );
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.SOURCE_STEPPER);

    //T30852
    const destinationColor= page.getByText("Step 2");
    await expect(destinationColor).toHaveCSS("color", "rgb(103, 122, 137)");
    const settingsColor= page.getByText("Step 3");
    await expect(settingsColor).toHaveCSS("color", "rgb(103, 122, 137)");


  });
});
