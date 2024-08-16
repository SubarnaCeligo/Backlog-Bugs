import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T27401 Verify auto mapper tool is added for mapper2.0 @Author-ladimanish", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("IO-T27401 Verify auto mapper tool is added for mapper2.0 @Epic-IO-69823 @Priority-P2 @Zephyr-IO-T27406 @Zephyr-IO-T27402 @Zephyr-IO-T27405 @Zephyr-IO-T27403 @Zephyr-IO-T27404 @Zephyr-IO-T27407 @Zephyr-IO-T27408 @Zephyr-IO-T27412 @Zephyr-IO-T27409 @Zephyr-IO-T27410 @Zephyr-IO-T27411 @Zephyr-IO-T27413 @Zephyr-IO-T27414 @Zephyr-IO-T27415 @Zephyr-IO-T27419 @Zephyr-IO-T27420 @Zephyr-IO-T27416 @Zephyr-IO-T27418 @Env-All", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Automapper_DND");
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,
      2
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.AUTO_POPULATE_MAPPINGS);
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAPPER_TOOL,
      "Auto mapper tool is not displayed"
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    //IO-T27406 Verify the checkboxes are not displayed when auto mapper tool is not selected
    const isCheckboxDisplayed = !(await io.flowBuilder.isVisible(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_SELECTALL_CHECKBOX
    ));
    await io.homePage.loadingTime();
    await io.assert.expectToBeTrue(isCheckboxDisplayed, "Checkbox is displayed");

    //IO-T27402 IO-T27405 Verify auto mapping option is displayed when clicked on auto mapper tool
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAPPER_TOOL
    );
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_BUTTON,
      "Auto map option is not displayed"
    );

    //IO-T27403 Verify the help text for the auto-mapping
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,
      7
    );
    await io.homePage.loadingTime();
    const value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP);
    const expectedvalue =
      "Auto-map all selected un-mapped destination fields i.e. the ones that do not have source field added. When auto-map is clicked, all options that modify the existing destination structure will be disabled. Close auto-map to go back to mappings.";
    const func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
    await io.flowBuilder.loadingTime();
    await io.homePage.loadingTime();

    //IO-T27404 Verify the other buttons are disabled when auto mapper is active
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.MAPPER2FILTER,
      "class",
      "Mui-disabled"
    );
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.MAPPER2SEARCH,
      "class",
      "Mui-disabled"
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    //IO-T27407 IO-T27408 Verify the checkboxes are displayed for all the fields when auto mapper is active
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_SELECTALL_CHECKBOX,
      "Select all checkbox is not displayed"
    );

    //IO-T27412 Verify auto map option is disabled when none of the fields are selected
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_BUTTON,
      "class",
      "Mui-disabled"
    );
    await io.homePage.loadingTime();

    //IO-T27409 Verify user is able to select single and multiple checkboxes
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

    //IO-T27410 IO-T27411 Verify when the parent field is selected, all child fields should automatically be selected and vice versa
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

    //IO-T27413 IO-T27414 IO-T27415 IO-T27419 Verify when the destination field is already mapped, the field selection should be disabled.

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTOMAP_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAPPER_TOOL
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
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      "value",
      "$.name",
      0
    );
    await page.waitForTimeout(10000);
    await io.assert.verifyElementAttribute(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      "value",
      "$.age",
      1
    );
    await io.flowBuilder.loadingTime();
    //close button IO-T27420
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAPPER_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    //IO-T27416 IO-T27418 Verify user is able to map all fields using auto map tool
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAPPER_TOOL
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.AUTOMAP_SELECTALL_CHECKBOX
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.AUTOMAP_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await page.waitForTimeout(10000);
    await io.assert.verifyElementAttribute(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      "value",
      "$.isStudent",
      2
    );
    await page.waitForTimeout(5000);
    await io.assert.verifyElementAttribute(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      "value",
      "$.courses[*]",
      6
    );
  });
});
