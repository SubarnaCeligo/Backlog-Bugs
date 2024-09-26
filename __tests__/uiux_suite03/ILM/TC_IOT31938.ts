import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT31938 Verify if the user is able to restore the deleted Integration with ignore field configurations)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T31938 @Env-All  Verify if the user is able to restore the deleted Integration with ignore field configurations)`, async ({
    io,
    page
  }) => {
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.addStep("*** Waiting for home page Search Bar ***")
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
    await io.homePage.addStep("*** Searching for Automation Flows ***")
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.addStep("*** Clicked on Automation Flows ***")
    await io.flowBuilder.loadingTime();
      await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);
      await io.homePage.click(selectors.templatePagePO.FLOWS);
      await io.flowBuilder.loadingTime();
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
      await io.myAccountPage.clickByText("Import records into destination application");
      await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
      await io.homePage.loadingTime()
      await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
      // await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP MIVA CONNECTION');
      // await io.flowBuilder.clickByTextByIndex('HTTP MIVA CONNECTION', 0);
      await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP AMAZON CONNECTION');
      await io.flowBuilder.clickByTextByIndex('HTTP AMAZON CONNECTION', 0);
      await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C28638_Connection');
      await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
      await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
      await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_NAME, 'Name');
      await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_VALUE, 'TC_C28638');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.loadingTime()
      await io.homePage.click(selectors.importPagePO.IMPORT_NAME);
      await io.homePage.waitForElementAttached(selectors.basePagePO.CUSTOM_SETTING);
      // Validating able to save all headers values
      await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
      // Locate the textarea
      const textarea = await page.$(selectors.exportsPagePO.CUSTOM_SETTINGS_AREA);
      if (textarea) {
        // Click the textarea to focus on it
        await textarea.click();

        // Select all text and delete it
        await io.exportsPage.loadingTime();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Meta+A');
        await page.keyboard.press('Backspace');
      }
      await io.homePage.loadingTime()
      await io.exportsPage.fill(selectors.exportsPagePO.CUSTOM_SETTINGS_TEXT_AREA, '{"name" : "testfile","test": "Automatiom"}');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.addStep("Flow Settings");
      await io.flowBuilder.click(selectors.basePagePO.FLOWSETTING);
      await page.locator(selectors.basePagePO.ADD_NAME).getByRole('textbox').fill('TC_IOT4801');
      await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).click();
      await io.homePage.addStep('Hovering over "X" icon in header');
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);
      await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.integrationPagePO.REVISIONS);
    await io.homePage.addStep("*** Clicked on Revisions Tab ***")
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.integrationPagePO.IGNORE_Fields);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click("//input[@class='rc-tree-select-selection-search-input']");
    await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'settings');
    //IO-T31937 Verify the dropdown when its have parent and child objects
    await io.flowBuilder.click("//span[@class='rc-tree-select-tree-checkbox']");
    ///IO-T31939 Verify the dropdown when user deselect the parent
      await io.flowBuilder.click("//span[contains(@class, 'rc-tree-select-tree-checkbox-checked')]");
      await io.homePage.waitForElementAttached(selectors.basePagePO.SAVE);
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      ///IO-T31938 Verify the dropdown when user deselect the child
      await io.flowBuilder.click("//input[@class='rc-tree-select-selection-search-input']");
      await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'settings');
        //IO-T31934 Verify the custom setting fields on export and import are geting disaplyed under ignore field
      await io.flowBuilder.click("//span[@class='rc-tree-select-tree-checkbox']");
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      await io.flowBuilder.click("//input[@class='rc-tree-select-selection-search-input']");
      await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'settings');
      await io.flowBuilder.clickByIndex("//span[contains(@class, 'rc-tree-select-tree-checkbox-checked')]",1);
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      await io.flowBuilder.click(selectors.basePagePO.CLOSE);
      await io.flowBuilder.click(selectors.integrationPagePO.IGNORE_Fields);

  });
});