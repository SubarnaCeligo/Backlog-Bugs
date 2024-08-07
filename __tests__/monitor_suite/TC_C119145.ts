import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few_Ci_user.json";

test.describe("C119145 Verify the Reset template,query and script button in AFE windows for Monitor User", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T C119145  Verify the Reset template,query and script button in AFE windows for Monitor User", async ({ io, page }) => {
    const res = await io.api.processAshareData(testData);
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'C32362_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('C32362_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //EXPORT_FILTER
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "Reset script is not displayed")
    const resetScript = page.getByText('Reset script').first();
    await resetScript.waitFor({ state: 'visible', timeout: 30000 });
    //Verify Reset script button disabled
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    //PlayGround
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Playground");
    await io.flowBuilder.waitForElementAttached(
      selectors.playgroundPO.HANDLEBARS_EDITOR
    );
    await io.flowBuilder.clickByText('Script editor');
    await io.flowBuilder.clickByText('Simple JSON record');
    await io.assert.verifyElementDisplayedByText('Reset script', 'Reset script Label is not displayed"');
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    //SQL Query Builder
    await io.flowBuilder.clickByText('SQL query builder');
    await io.flowBuilder.clickByText('Simple SQL query');
    await io.assert.verifyElementDisplayedByText('Reset query', 'Reset query Label is not displayed"');
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    //Handelbars Editor
    await io.flowBuilder.clickByText('Handlebars editor');
    await io.flowBuilder.clickByTextByIndex('Simple JSON record', 0);
    await io.assert.verifyElementDisplayedByText('Reset template', 'Reset template Label is not displayed"');
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    //Form Builder
    await io.flowBuilder.clickByText('Form builder');
    await io.flowBuilder.clickByText('Simple form');
    await io.flowBuilder.clickByTextByIndex('Script', 0);
    await io.assert.verifyElementDisplayedByText('Reset script', 'Reset script Label is not displayed"');
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
  });
});