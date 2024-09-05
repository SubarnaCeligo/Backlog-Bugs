import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C110486 Verify export of Big Query is having Celigo AI", () => {
  test("@Env-All @Zephyr-IO-T25480 C110486 Verify export of Big Query is having Celigo AI.", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Google BigQuery');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "BIGQUERY CONNECTION"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "BIGQUERY CONNECTION"
    );
    await io.flowBuilder.clickByTextByIndex("BIGQUERY CONNECTION", 0);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
  });
});