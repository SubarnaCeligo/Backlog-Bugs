import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30900_T30916_T30912_T30913", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30900 @Zephyr-IO-T30916 @Zephyr-IO-T30912 @Zephyr-IO-T30913 TC_T30900_T30916_T30912_T30913", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.selectOrDeselectAllObjects();
    await io.sync.selectMultipleObjects(["Account", "Account History"]);
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_DROPDOWN);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_SELECTED);
    await io.myAccountPage.loadingTime();

    //T30900 T30916
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_DROPDOWN);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText("All objects (557)", "total count is incorrect");
    await io.assert.verifyElementDisplayedByText("Selected (2)", "selected count is incorrect");
    await io.assert.verifyElementDisplayedByText("Unselected (555)", "unselected count is incorrect");

    //T30912
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_UNSELECTED);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Accepted Event Relation",
      "Accepted Event Relation is not displayed"
    );
    //T30913
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_ALL);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Accepted Event Relation",
      "Accepted Event Relation is not displayed"
    );
  });
});
