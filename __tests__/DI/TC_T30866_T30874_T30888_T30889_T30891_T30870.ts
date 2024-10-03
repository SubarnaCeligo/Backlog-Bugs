import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30866_T30874_T30888_T30889_T30891_T30870", () => {
  test("@Env-All  @Epic-IO-68565 @Epic-IO-68565 @Priority-P1 @Zephyr-IO-T30866 @Zephyr-IO-T30874 @Zephyr-IO-T30888 @Zephyr-IO-T30889 @Zephyr-IO-T30891 @Zephyr-IO-T30870 TC_T30866_T30874_T30888_T30889_T30891_T30870", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.clickOnNext();
    await io.sync.chooseDestinationApplication("Snowflake");
    await io.sync.selectExistingConnection("SNOWFLAKE CONNECTION");
    await io.sync.selectDatabase("CELIGO_DI");
    const schemaName = await io.sync.generateRandomName("Schema");
    await io.sync.specifySchema(schemaName);

    //T30866 T30874 T30888 T30889
    await io.assert.verifyElementDisplayedByText(
      "Step 2",
      "Step 2 is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Snowflake",
      "Snowflake is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Choose destination",
      "Choose destination is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Connect to destination",
      "Connect to destination is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Name your destination schema",
      "Name your destination schema is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_STEP,
      "Destination step is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_TYPE_COMPLETE,
      "Destination step is not displayed"
    );
    // await io.assert.verifyElementIsDisplayed(
    //   selectors.syncPagePO.DESTINATION_CONNECTION_COMPLETE,
    //   "Destination connection is not displayed"
    // );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_SCHEMA_COMPLETE,
      "Destination schema is not displayed"
    );
    await io.assert.verifyElementToBeClickable(
      selectors.syncPagePO.DESTINATION_STEP
    );

    //T30891 T30870
    const settingsColor = page.getByText("Step 3");
    await expect(settingsColor).toHaveCSS("color", "rgb(103, 122, 137)");
    await io.sync.clickOnNext();
  });
});
