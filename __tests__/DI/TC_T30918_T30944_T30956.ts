import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30918_T30944_T30956", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30918 @Zephyr-IO-T30944 @Zephyr-IO-T30956 TC_T30918_T30944_T30956", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");

    //T30918
    // await io.flowBuilder.click(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    // );
    // await io.assert.verifyElementContainsText(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
    //   "text to be added"
    // );
    // await io.flowBuilder.clickByIndex(
    //   selectors.connectionsPagePO.HELPTEXT_CLOSE,
    //   0
    // );

    //T30944
    await io.sync.viewFieldsOfObject("Accepted Event Relation");
    await io.myAccountPage.loadingTime();
    await io.assert.expectToBeTrue(
      await (await page.$(selectors.syncPagePO.SELECT_ALL_FIELDS)).isChecked(),
      "Fields are not checked"
    );

    //T30956
    await io.sync.searchFields("Event Relation ID");
    await io.assert.verifyElementDisplayedByText(
      "Event Relation ID",
      "Search is not working"
    );
  });
});
