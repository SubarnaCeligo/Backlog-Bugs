import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30935_T30946_T30947", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30935 @Zephyr-IO-T30946 @Zephyr-IO-T30947 TC_T30935_T30946_T30947", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.viewFieldsOfObject("Account");
    await io.sync.selectOrDeselectAllFields();
    await io.sync.selectMultipleFields(["Account Name", "Account Type"]);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_SELECTED);

    //T30935
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText("152", "count is incorrect");
    await io.assert.verifyElementDisplayedByText("2", "count is incorrect");
    await io.assert.verifyElementDisplayedByText("150", "count is incorrect");
    //T30946
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_UNSELECTED);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Account ID",
      "Account ID is not displayed"
    );
    //T30947
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_ALL);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Account ID",
      "Account ID is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Account Name",
      "Account Name is not displayed"
    );
  });
});
