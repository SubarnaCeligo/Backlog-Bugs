import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T31906 Verify Celigo AI is displayed in transformation2.0 tab", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Epic-IO-79512 @Zephyr-IO-T32427 @Author-SubarnaGhatak Verify auto transform Icon is added for transformation2.0", async ({ io, page }) => {
 
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('Automapper_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //TRANSFORMATION 2.0 AutoTransform
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 1);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM, "class", "Mui-disabled");
    await io.flowBuilder.addStep("Verified the autotransform icon");
    await io.flowBuilder.clickByText('Modify input record { }');
    await io.flowBuilder.clickByText('Create output record { } from input record { }');
    await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 2);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTOCREATE );
    await io.flowBuilder.addStep("verified auto-transform enabled after auto populating");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM );
    await io.assert.verifyElementDisplayedByText('Auto-transform', 'Not visible');
    await io.flowBuilder.addStep("Auto -transform option is displayed");
    await io.flowBuilder.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT, 6);
    await io.assert.verifyElementDisplayedByText('Auto-transform all selected un-mapped output fields i.e. the ones that do not have input field added. When auto-transform is clicked, all options that modify the existing output structure will be disabled. Close auto-transform to go back to mappings.', "Help text is not as expected");
    await io.flowBuilder.addStep("Verified the auto transform help text");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE );
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.MAPPER2SEARCH, "class", "Mui-disabled");
    await io.assert.verifyElementAttributeContainsText(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT, "class", "Mui-disabled");
    await io.flowBuilder.addStep("Verified the other buttons are disabled when auto transform is active");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM_SELECT_ALL_CHECKBOX,
      "Select all checkbox is not displayed"
    );
    //IO-T32452   Verify auto-transform option is disabled when none of the fields are selected
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM_BUTTON,
      "class",
      "Mui-disabled"
    );
    await io.homePage.loadingTime();

    
  });
  
});