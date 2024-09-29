import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT32594 Verify if the user is able to restore the deleted Integration with ignore field configurations)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T32594 @Env-All  Verify if the user is able to restore the deleted Integration with ignore field configurations)`, async ({
    io,
    page
  }) => {
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.addStep("*** Waiting for home page Search Bar ***")
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT480_DND');
    await io.homePage.addStep("*** Searching for TC_IOT480_DND ***")
    await io.flowBuilder.clickByTextByIndex("TC_IOT480_DND",0);
    await io.homePage.addStep("*** Clicked on Integration TC_IOT480_DND ***")  
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
      await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP MIVA CONNECTION');
      await io.flowBuilder.clickByTextByIndex('HTTP MIVA CONNECTION', 0);
      // await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP AMAZON CONNECTION');
      // await io.flowBuilder.clickByTextByIndex('HTTP AMAZON CONNECTION', 0);
      await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C28638_Connection');
      await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
      await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
      await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_NAME, 'Name');
      await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_VALUE, 'TC_C28638');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.loadingTime()
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
    await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'flow.name');
    await io.homePage.loadingTime();
    await io.homePage.addStep("*** Clicked on Checkbox ***")
    await io.flowBuilder.click("//span[@class='rc-tree-select-tree-checkbox']");
    await io.homePage.loadingTime();
    //IO-T31931 Verify the  Saveandclose buttons
    await io.homePage.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);
    await io.homePage.click(selectors.templatePagePO.FLOWS);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("TC_IOT4801");
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU)
    await io.flowBuilder.deleteFlow();
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.REVISIONS);
    await io.flowBuilder.click(selectors.integrationPagePO.REVISIONS);
    await io.homePage.addStep("*** Clicked on Revisions Tab ***")
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.IGNORE_Fields);
    await io.flowBuilder.click(selectors.integrationPagePO.IGNORE_Fields);
    // IO-T30610 Verify error notification for the case when a selected a field to ignore and then later deleted the resource(s) which has that field
    await io.assert.verifyElementDisplayedByText(
          "Remove the fields highlighted in red. These fields have been deleted from your integration and are not available.",
          "Text is not displayed"
        );
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.homePage.loadingTime();
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
      await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP MIVA CONNECTION');
      await io.flowBuilder.clickByTextByIndex('HTTP MIVA CONNECTION', 0);
      // await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP AMAZON CONNECTION');
      // await io.flowBuilder.clickByTextByIndex('HTTP AMAZON CONNECTION', 0);
      await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C28638_Connection');
      await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
      await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
      await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_NAME, 'Name');
      await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_VALUE, 'TC_C28638');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.loadingTime()
      await io.flowBuilder.addStep("Flow Settings");
      await io.flowBuilder.click(selectors.basePagePO.FLOWSETTING);
      await page.locator(selectors.basePagePO.ADD_NAME).getByRole('textbox').fill('TC_IOT4801');
      await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).click();
      await io.homePage.addStep('Hovering over "X" icon in header');
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);
      await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.integrationPagePO.REVISIONS);
        await io.flowBuilder.click(selectors.integrationPagePO.REVISIONS);
        await io.homePage.addStep("*** Clicked on Revisions Tab ***")
        await io.flowBuilder.click(selectors.integrationPagePO.IGNORE_Fields);
        await io.flowBuilder.click("//input[@class='rc-tree-select-selection-search-input']");
        //IO-T31933 Verify the suggestion when we enter the text
        await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'flow.name');
        const isDisplayed = await io.flowBuilder.isVisible(selectors.integrationPagePO.EXPAND_OPTION);
        if (isDisplayed) {
          await io.flowBuilder.click(selectors.integrationPagePO.EXPAND_OPTION);
          await io.flowBuilder.click("//span[contains(@class, 'rc-tree-select-tree-checkbox-checked')]");
        }
        else {
          await io.flowBuilder.click("//span[contains(@class, 'rc-tree-select-tree-checkbox-checked')]");
        }
      await io.homePage.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.loadingTime();
      await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);
      await io.homePage.click(selectors.templatePagePO.FLOWS);
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("TC_IOT4801");
      await io.flowBuilder.loadingTime();
      await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU)
      await io.flowBuilder.deleteFlow();

  });
});