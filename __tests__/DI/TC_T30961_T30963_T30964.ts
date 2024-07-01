import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30961_T30963_T30964", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30961 @Zephyr-IO-T30963 @Zephyr-IO-T30964 TC_T30961_T30963_T30964", async ({
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
    await io.sync.clickOnNext();

    //T30961
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESCRIBE_SYNC,
      "Header not displayed"
    );

    //T30963
    await io.assert.verifyElementAttributeContainsText(
      selectors.syncPagePO.SAVE_AND_CLOSE,
      "class",
      "Mui-disabled"
    );

    //T30964
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SYNC_NAME_PLACEHOLDER,
      "Placeholder not displayed"
    );

  });
});
