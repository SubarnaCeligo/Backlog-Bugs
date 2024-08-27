import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30894_T30897_T30896", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30894 @Zephyr-IO-T30897 @Zephyr-IO-T30896 TC_T30894_T30897_T30896", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
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
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Item Fulfillment",
      "Search is not working"
    );
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SEARCH_OBJECTS);
  });
});
