import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30878_T30884_T30887", () => {
  test("@Env-All  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30878 @Zephyr-IO-T30884 @Zephyr-IO-T30887 TC_T30878_T30884_T30887", async ({
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

    //T30878
    await io.sync.selectExistingConnection("SNOWFLAKE CONNECTION");
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DATABASE_INPUT,
      "database is not displayed"
    );
    await io.sync.selectDatabase("CELIGO_DI");

    //T30884
    await io.assert.verifyElementAttributeContainsText(
      selectors.syncPagePO.WIZARD_NEXT,
      "class",
      "Mui-disabled"
    );

    //T30877
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SPECIFY_SCHEMA_INPUT,
      "Schema not displayed"
    );
  });
});
