import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30882_T30879_T30883_T30884", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30882 @Zephyr-IO-T30879 @Zephyr-IO-T30883 @Zephyr-IO-T30884 TC_T30882_T30879_T30883_T30884", async ({
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

    //T30882
    await io.sync.specifySchema("test");
    await io.sync.clickOnNext();
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Schema already in use. Please enter a new schema name",
      "Error is not displayed"
    );
    //casing
    await io.sync.specifySchema("Test");
    await io.sync.clickOnNext();
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Schema already in use. Please enter a new schema name",
      "Error is not displayed"
    );

    //T30879
    const schemaName = await io.sync.generateRandomName("Schema");
    await io.sync.specifySchema(schemaName);

    //T30883 T30884
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.WIZARD_NEXT,
      "Next button is not enabled"
    );
  });
});
