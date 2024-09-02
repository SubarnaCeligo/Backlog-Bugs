import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112698 Verify Mapper2.0 is having Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T14690 C112698 Verify Mapper2.0 is having Celigo AI", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('Automapper_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //IMPORT_MAPPING 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();
    //IMPORT_MAPPING Mapper1.0 Celigo AI Not Displayed C112699
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    await io.flowBuilder.loadingTime();
    const isCeligoAINotVisibleInMapper1 = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT));
    await io.assert.expectToBeTrue(isCeligoAINotVisibleInMapper1, "Celigo AI Not Visible for Mapper 1.0");
    //Verify Celigo AI are in collapsed state and disabled. C112701 C112698 C112756
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false",1);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-disabled","true",1);
    // await io.assert.verifyElementIsDisplayed(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
    //   "Celigo AI is not displayed"
    // )
    //C112704 at least one row has a destination field added without any source field
    // await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(0).fill('studentName');
    await page.getByPlaceholder('Destination field').click();
    await io.flowBuilder.clickByText('studentName');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.FORWINDOWCLICK);
    await io.flowBuilder.loadingTime();
    //Check CeligoHelpText is Aligned or not C112761
    // await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT);
    // await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW)).toHaveAttribute('data-popper-placement', 'top');
    // await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Auto-map populates known field mappings for destination fields that have not yet been configured. Auto-map doesn’t overwrite mapping values that you have already set up manually. For example, if you have already mapped firstName in the destination field, then auto-map will preserve your configuration for firstName and only add field mappings for the remaining destination fields.');
    // await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.HELPTEXT_CLOSE,0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.flowBuilder.loadingTime();
     //Placeholder C115221
     const placeholderText = page.getByPlaceholder('Tell me about your mapping here... I will apply your request to the existing mapping unless you tell me to replace it').first();
     await placeholderText.waitFor({ state: 'visible', timeout: 30000 });
     await io.assert.verifyElementIsDisplayed(
       selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
       "Celigo AI Placeholder is not displayed"
     )
     //When all the fields are already mapped	C112767
     await io.flowBuilder.loadingTime();
     await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Map all the fields');
     await io.flowBuilder.loadingTime();
     await page.keyboard.press('Enter');
     await io.assert.verifyElementIsDisplayed(
       selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
       "Celigo AI Prompt Thinking is not displayed"
     )
     await io.flowBuilder.loadingTime();
     await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false",1);
     await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-disabled","true",1);
    //Rows output formats C112764
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Create destination rows [ ] from source record { }");
    await io.flowBuilder.loadingTime();
    await page.waitForTimeout(5000);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false",1);
  });
});