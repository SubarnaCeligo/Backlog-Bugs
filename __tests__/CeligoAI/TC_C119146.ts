import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119146 Verify the Error Panel in AFE windows", () => {
  test("@Env-All @Zephyr-IO-T18858 C119146 Verify the Error Panel in AFE windows", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("ErrorPanel_DND");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "Reset template is not displayed")
    //Verify Reset query button C119149
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    //C119158
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'xygz1234');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ARROW_DOWN, "arrowDownIcon is not displayed")
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL, "codePanel is not displayed")
    //C119146
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON, "closeIcon is not displayed")
    //C119148
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ARROW_DOWN);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ARROW_RIGHT, "arrowRightIcon is not displayed")
    await io.flowBuilder.loadingTime();
    const isErrorPanelCollapsed = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL));
    await io.assert.expectToBeTrue(isErrorPanelCollapsed, "Error Panel is not collapsed");
    //Default layout is vertical layout C119157
    await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    await io.assert.verifyElementIsDisplayed(
      selectors.playgroundPO.SELECTED_COLUMN_VIEW,
      "Default layout is not column view"
    );
    await io.flowBuilder.click(selectors.playgroundPO.SELECTED_COLUMN_VIEW);
    //C119147
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.assert.expectToBeTrue(isErrorPanelCollapsed, "Error Panel is not collapsed");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    //EXPORT_FILTER C119150 C119159 C119150
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBranchingPO.GROUP_RULE);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ARROW_DOWN, "arrowDownIcon is not displayed")
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL, "codePanel is not displayed")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    //Export TransFormation C119156
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ARROW_DOWN, "arrowDownIcon is not displayed")
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL, "codePanel is not displayed")
    //Profile Page AI Chatbot
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.PROFILE);
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.ENABLEAICHATBOT, "AI Chatbot is not displayed")
    await io.assert.verifyElementDisplayedByText('AI for Advanced field editors', 'AI Chatbot Label is not displayed"');
  });
});