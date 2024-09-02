import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30929_T30911_T30901", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30929 @Zephyr-IO-T30911 @Zephyr-IO-T30901 TC_T30929_T30911_T30901", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");

    //T30929
    // const totalFields = (await io.flowBuilder.getText(selectors.syncPagePO.TOTAL_FIELDS)).toString();
    // await io.assert.expectToBeValue("",totalFields,"Total fields are displayed");
    // const selectedFields = (await io.flowBuilder.getText(selectors.syncPagePO.SELECTED_FIELDS)).toString();
    // await io.assert.expectToBeValue("",selectedFields,"Selected fields are displayed");

    //T30911 T30901
    await io.sync.selectOrDeselectAllObjects();
    await io.sync.selectMultipleObjects(["Account", "Account History"]);
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_DROPDOWN);
    await io.flowBuilder.click(selectors.syncPagePO.OBJECTS_SELECTED);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Account",
      "Account is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Account History",
      "Account History is not displayed"
    );
  });
});
