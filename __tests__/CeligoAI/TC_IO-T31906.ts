import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T31906 Verify Celigo AI is displayed in transformation2.0 tab", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-79512 @Zephyr-IO-T31906 @Zephyr-IO-T31907 @Zephyr-IO-T31908 @Zephyr-IO-T31909 @Zephyr-IO-T31910 @Author-SubarnaGhatak Verify Celigo AI is displayed in transformation2.0 tab", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('TC47946_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //TRANSFORMATION 2.0 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 1);
    //TRANSFORMATION 2.0 Celigo AI Not Displayed IO-T31907 
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RULES1);
    await io.flowBuilder.loadingTime();
    const isCeligoAINotVisibleInTransformation1 = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT));
    await io.assert.expectToBeTrue(isCeligoAINotVisibleInTransformation1, "Celigo AI Not Visible for Transformation 1.0");
    // //Verify Celigo AI are in collapsed state and disabled. IO-T31909
    await io.flowBuilder.clickByText('Rules 2.0');
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-expanded", "false", 1);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 1);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )

  });
  test("@Env-QA @Epic-IO-79512 @Zephyr-IO-T32427 @Author-SubarnaGhatak Verify auto transform Icon is added for transformation2.0", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('TC47946_DND');
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
    await io.flowBuilder.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT, 5);
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
  test("@Env-QA @Epic-IO-79512 @Zephyr-IO-T32449 @Author-SubarnaGhatak ", async ({ io, page }) => {
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
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.OPENACTIONSMENU, 2);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTOCREATE);
    //IO-T32449  Verify user is able to select single and multiple checkboxes
   
    await io.flowBuilder.addStep("verified auto-transform enabled after auto populating");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM );
     await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      0
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      1
    );
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      "class",
      "Mui-checked",
      0
    );


    await page.waitForTimeout(5000);
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      "class",
      "Mui-checked",
      1
    );
    //IO-T32450 IO-T32451  Verify when the parent field is selected, all child fields should automatically be selected and vice versa
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      6
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.EXPAND_ALL);
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      "class",
      "Mui-checked",
      7
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      "class",
      "Mui-checked",
      8
    );

    //IO-T32453  Verify when the output field is already mapped, the field selection should be disabled.

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM 
    );
    await io.flowBuilder.loadingTime();
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_CHECKBOX,
      "class",
      "Mui-disabled",
      0
    );
    await page.waitForTimeout(10000);
    await io.assert.verifyElementAttribute(
      selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER,
      "value",
      "$.name",
      0
    );
    await page.waitForTimeout(10000);
    await io.assert.verifyElementAttribute(
      selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER,
      "value",
      "$.age",
      1
    );
    await io.flowBuilder.loadingTime();
    //IO-T32459  Verify user is able to close the auto transformation panel
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CLOSE_AUTO_TRANSFORM_PANEL  
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    //IO-T32460  Verify user is able to map all fields using auto-transform icon
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM 
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM_SELECT_ALL_CHECKBOX
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTO_TRANSFORM_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await page.waitForTimeout(10000);
    await io.assert.verifyElementAttribute(
      selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER,
      "value",
      "$.isStudent",
      2
    );
   
    await page.waitForTimeout(5000);
    await io.assert.verifyElementAttribute(
      selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER,
      "value",
      "$.courses[*]",
      6
    );
});
});