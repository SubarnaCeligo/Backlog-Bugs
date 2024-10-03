import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30920_T30937_T30923_T30945", () => {
  test("@Env-All  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30920 @Zephyr-IO-T30937 @Zephyr-IO-T30923 @Zephyr-IO-T30945 TC_T30920_T30937_T30923_T30945", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.viewFieldsOfObject("Accepted Event Relation");

    //T30920
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.TABLE_ROWS,
      "Fields are not displayed"
    );

    //T30937 T30923
    await io.sync.selectOrDeselectAllFields();
    await io.sync.selectMultipleFields(["Event Relation ID", "Event ID"]);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_SELECTED);
    await io.myAccountPage.loadingTime();

    //T30945
    await io.assert.verifyElementDisplayedByText(
      "Event Relation ID",
      "Event Relation ID is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Event ID",
      "Event ID is not displayed"
    );
  });
});
