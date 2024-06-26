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

    //T30894
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.TABLE_ROWS,
      "Objects are not displayed"
    );
    //T30897
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.syncPagePO.SELECT_ALL_OBJECTS)).isChecked(),
      "Objects are not checked"
    );
    //T30896
    await io.flowBuilder.click(selectors.syncPagePO.SEARCH_OBJECTS);
    await io.flowBuilder.fill(
      selectors.syncPagePO.SEARCH_OBJECTS,
      "Item fulfillment"
    );
    await io.assert.verifyElementDisplayedByText(
      "Item Fulfillment",
      "Search is not working"
    );
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SEARCH_OBJECTS);

    //T30929
    const totalFields = (await io.flowBuilder.getText(selectors.syncPagePO.TOTAL_FIELDS)).toString();
    await io.assert.expectToBeValue("", totalFields, 'Total fields are displayed');
    const selectedFields = (await io.flowBuilder.getText(selectors.syncPagePO.SELECTED_FIELDS)).toString();
    await io.assert.expectToBeValue("", selectedFields, 'Selected fields are displayed');
    //T30911 T30901
    await io.sync.deselectAllObjects();
    await io.sync.selectMultipleObjects(["Account","Account History"]);
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_SELECTED);
    await io.assert.verifyElementDisplayedByText(
      "Account",
      "Account is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Account History",
      "Account History is not displayed"
    );
    //T30900 T30916
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_DROPDOWN);
    await io.assert.verifyElementDisplayedByText(
      "560",
      "count is incorrect"
    );
    await io.assert.verifyElementDisplayedByText(
      "2",
      "count is incorrect"
    );
    await io.assert.verifyElementDisplayedByText(
      "558",
      "count is incorrect"
    );
    //T30912
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_UNSELECTED);
    await io.assert.verifyElementDisplayedByText(
      "Accepted Event Relation",
      "Accepted Event Relation is not displayed"
    );
    //T30913
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_ALL);
    await io.assert.verifyElementDisplayedByText(
      "Accepted Event Relation",
      "Accepted Event Relation is not displayed"
    );


  });
});
