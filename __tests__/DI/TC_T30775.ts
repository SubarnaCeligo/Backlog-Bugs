import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30775", () => {
  test("@Env-All  @pmcases @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30775 T30775", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.sync.selectExistingIntegration("DND_INTEGRATION");
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.clickOnNext();

    await io.assert.verifyElementAttributeContainsText(
      selectors.syncPagePO.DESTINATION_APP_NAME_INPUT,
      "class",
      "Mui-disabled"
    );
    const schemaName = await io.sync.generateRandomName("Schema");
    await io.sync.specifySchema(schemaName);
    await io.sync.clickOnNext();
    const syncName = await io.sync.generateRandomName("Sync");
    await io.sync.enterSyncName(syncName);
    await io.sync.selectFrequency("Once weekly");
    await io.flowBuilder.click(selectors.syncPagePO.SAVE_AND_CLOSE);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      syncName,
      "Created sync is not displayed"
    );
  });
});
