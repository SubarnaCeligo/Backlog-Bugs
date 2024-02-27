import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119140 Verify the Reset template,query and script button in AFE windows", () => {
  test("C119140  Verify the Reset template,query and script button in AFE windows", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('Reset_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"Reset query is not displayed")
    const resetQuery = page.getByText('Reset query').first();
    await resetQuery.waitFor({ state: 'visible', timeout: 30000 });
    //Verify Reset query button disabled  C119141 C119140	
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get the customer details');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
     //Verify Reset Hover text  C119160 C119142
     resetQuery.hover();
     const queryHoverText = page.getByText('Click or tap to undo all changes and restore the last saved query.').first();
     await queryHoverText.waitFor({ state: 'visible', timeout: 30000 });
     const resetQueryEnabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE);
    expect(await resetQueryEnabled[0].getAttribute('class')).not.toContain('Mui-disabled');
    //C119143 C119144
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE);
    await expect(
      page.locator(selectors.flowBuilderPagePO.OPENAI.PROMPT_QUERY).filter({ hasText: "select *" }).first()
    ).toBeVisible({ timeout: 5000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    //EXPORT_FILTER 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"Reset script is not displayed")
    const resetScript = page.getByText('Reset script').first();
    await resetScript.waitFor({ state: 'visible', timeout: 30000 });
    //Verify Reset script button disabled
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await io.flowBuilder.clickByTextByIndex("Branching script", 1);
    const resetScriptEnabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE);
    expect(await resetScriptEnabled[0].getAttribute('class')).not.toContain('Mui-disabled');
     //Verify Reset Script text
     resetScript.hover();
     const scriptHoverText = page.getByText('Click or tap to undo all changes and restore the last saved script.').first();
     await scriptHoverText.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    //Reset Template
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE,1);
    const resetTemplate = page.getByText('Reset template').first();
    await resetTemplate.waitFor({ state: 'visible', timeout: 30000 });
    //Verify Reset template button disabled  C119141
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get the customer details');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
     //Verify Reset Hover text  C119160
     resetTemplate.hover();
     const tempateHoverText = page.getByText('Click or tap to undo all changes and restore the last saved template.').first();
     await tempateHoverText.waitFor({ state: 'visible', timeout: 30000 });
     const templateQueryEnabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE);
    expect(await templateQueryEnabled[0].getAttribute('class')).not.toContain('Mui-disabled');
    //C119144	
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE);
    await expect(
      page.locator(selectors.flowBuilderPagePO.OPENAI.PROMPT_QUERY).filter({ hasText: "hello" }).last()
    ).toBeVisible({ timeout: 5000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
     //Edit Branching
     await io.flowBuilder.click(selectors.flowBranchingPO.ROUTERS);
     await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
     await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
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
      await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
      //SQL Query Builder
      await io.flowBuilder.clickByText('SQL query builder');
      await io.flowBuilder.clickByText('Simple SQL query');
      await io.assert.verifyElementDisplayedByText('Reset query', 'Reset query Label is not displayed"');
      await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
      //Handelbars Editor
      await io.flowBuilder.clickByText('Handlebars editor');
      await io.flowBuilder.clickByTextByIndex('Simple JSON record',0);
      await io.assert.verifyElementDisplayedByText('Reset template', 'Reset template Label is not displayed"');
      await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
      //Form Builder
      await io.flowBuilder.clickByText('Form builder');
      await io.flowBuilder.clickByText('Simple form');
      await io.flowBuilder.clickByTextByIndex('Script',0);
      await io.assert.verifyElementDisplayedByText('Reset script', 'Reset script Label is not displayed"');
      await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE,"class","Mui-disabled");
  });
});