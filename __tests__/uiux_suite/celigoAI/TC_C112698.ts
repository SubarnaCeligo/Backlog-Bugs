import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112698 Verify Mapper2.0 is having Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C112698 Verify Mapper2.0 is having Celigo AI", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('TC47946_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //IMPORT_MAPPING 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();
    //IMPORT_MAPPING Mapper1.0 Celigo AI Not Displayed C112699
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    const isCeligoAINotVisibleInMapper1 = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT));
    await io.assert.expectToBeTrue(isCeligoAINotVisibleInMapper1, "Celigo AI Not Visible for Mapper 1.0");
    //Verify Celigo AI are in collapsed state and disabled. C112701 C112698 C112756
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-disabled', 'true');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    //C112704 at least one row has a destination field added without any source field
    await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(0).fill('id');
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.FORWINDOWCLICK)
    //Check CeligoHelpText is Aligned or not C112761
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT);
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW)).toHaveAttribute('data-popper-placement', 'top');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Auto-map populates known field mappings for destination fields that have not yet been configured. Auto-map doesn’t overwrite mapping values that you have already set up manually. For example, if you have already mapped firstName in the destination field, then auto-map will preserve your configuration for firstName and only add field mappings for the remaining destination fields.');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.HELPTEXT_CLOSE,0);
    await io.flowBuilder.clickByText('Celigo AI');
     //Placeholder C115221
     const placeholderText = page.getByText('Start typing a prompt that describes your mappings.').first();
     await placeholderText.waitFor({ state: 'visible', timeout: 30000 });
     await io.assert.verifyElementIsDisplayed(
       selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
       "Celigo AI Placeholder is not displayed"
     )
    //Rows output formats C112764
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
    await io.flowBuilder.clickByText("Create destination rows [ ] from source record { }");
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-disabled', 'true');
  });
});