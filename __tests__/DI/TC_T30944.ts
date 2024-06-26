import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1583 Verify Transfer Ownership notification shows the integration name", () => {
  test("@Env-All C1583 Verify Transfer Ownership notification shows the integration name", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    const integrationName = await io.sync.generateRandomIntegrationName();
    await io.sync.createNewIntegration(integrationName);
    await io.myAccountPage.loadingTime();
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    //T30918
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      0
    );
    //T30944
    await io.sync.viewFieldsOfObject("Account");
    await io.myAccountPage.loadingTime();
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.syncPagePO.SELECT_ALL_FIELDS)).isChecked(),
      "Fields are not checked"
    );
    //T30956
    await io.sync.searchFields("Account Name");
    await io.assert.verifyElementDisplayedByText(
      "Account Name",
      "Search is not working"
    );
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SEARCH_FIELDS);
    //T30920
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.TABLE_ROWS,
      "Fields are not displayed"
    );
    //T30937 T30923
    await io.sync.deselectAllFields();
    await io.sync.selectMultipleFields(["Account Name", "Account Type"]);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_SELECTED);
    //T30945
    await io.assert.verifyElementDisplayedByText(
      "Account Name",
      "Account Name is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Account Type",
      "Account Type is not displayed"
    );
    //T30935
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_DROPDOWN);
    await io.assert.verifyElementDisplayedByText("152", "count is incorrect");
    await io.assert.verifyElementDisplayedByText("2", "count is incorrect");
    await io.assert.verifyElementDisplayedByText("150", "count is incorrect");
    //T30946
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_UNSELECTED);
    await io.assert.verifyElementDisplayedByText(
      "Account ID",
      "Account ID is not displayed"
    );
    //T30947
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_ALL);
    await io.assert.verifyElementDisplayedByText(
      "Account ID",
      "Account ID is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Account Name",
      "Account Name is not displayed"
    );
    //T30921 T30922
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.MASK_BUTTON,
      "Mask button not displayed"
    );
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.MASK_BUTTON);
    //T30957
    await io.assert.verifyElementDisplayedByText(
      "String",
      "String is not displayed"
    );
    //T30934
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.FIELDS_CLOSE,
      "Mask button not displayed"
    );
    await io.flowBuilder.click(selectors.syncPagePO.FIELDS_CLOSE);
    //T30930
    await io.assert.verifyElementDisplayedByText("152", "count is incorrect");
  });
});
