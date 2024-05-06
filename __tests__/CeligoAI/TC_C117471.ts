import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117471 Verify the Celigo AI behaviour for IA's", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-IAQA @Zephyr-IO-T18816 C117471 Verify the Celigo AI behaviour for IA's", async ({ io, page }) => {
    await io.homePage.goToMenu("Home");
    await io.flowBuilder.clickByText('BigCommerce - NetSuite');
    await io.flowBuilder.clickByText('BigCommerce Customer to NetSuite Customer Add/Update [QA_Store_1]');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "Reset script is not displayed")
    const resetScript = await page.getByText('Reset script').nth(0);
    await resetScript.waitFor({ state: 'visible', timeout: 30000 });
    //Verify Reset script button disabled
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    //IA Filter CeligoAI disabled
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-expanded", "false", 1);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    //Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
    const resetTemplate = page.getByText('Reset template').first();
    await resetTemplate.waitFor({ state: 'visible', timeout: 30000 });
    //Verify Reset template button disabled  
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-expanded", "false", 9);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 9);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
     //EXPORT_TRANSFORMATION
     await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
     await io.flowBuilder.loadingTime();
     await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
     await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-expanded", "false", 1);
     await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 1);
     await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
     //Input Filter
     await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,1);
     await io.flowBuilder.click(selectors.basePagePO.INPUTFILTER);
     await io.flowBuilder.loadingTime();
     await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-expanded", "false", 1);
     await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
     await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,"placeholder","Tell me about your filter here... I will apply your request to the existing filter unless you tell me to replace it");   
  });
});