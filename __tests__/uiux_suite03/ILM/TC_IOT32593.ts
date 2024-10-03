import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT32593  Verify if the ignore configurations can be added from the revision routes)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T32593 @Zephyr-IO-T31928 @Zephyr-IO-T31929 @Zephyr-IO-T30611 @Zephyr-IO-T31930 @Zephyr-IO-T31936 @Zephyr-IO-T32595 @Zephyr-IO-T31941 @Zephyr-IO-T31940  @Zephyr-IO-T32595 @Zephyr-IO-T31942 @Env-All  To verify ILM ignore fields`, async ({
    io,
    page
  }) => {

    await io.flowBuilder.clickByText("Create");
    await io.homePage.addStep(`*** Clicked on Create Button ***`)
      await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
      await io.homePage.addStep(`*** Clicked on Create New Source Integration ***`)
      await io.flowBuilder.fill(
        selectors.basePagePO.INPUT_NAME_SELECTOR,
        "TC_IOT32593"
      );
      await io.homePage.addStep(`*** Filled integration name ***`)
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.addStep(`*** Clicked on Save and Close ***`)
        await io.flowBuilder.click(selectors.integrationPagePO.REVISIONS);
    await io.homePage.addStep("*** Clicked on Revisions Tab ***")
    //IO-T31928 Verify 'Ignore fields during pull' under revision tab
    await io.flowBuilder.click(selectors.integrationPagePO.IGNORE_Fields);
    //IO-T31929 Verify Select ignore fields during pull dropdown and helptext
    await io.importsPage.click(selectors.exportsPagePO. HELP_TEXT_ICLIENT );
    const Helptextvalue = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    const Helptextexpectedvalue = "Define which fields to ignore during a pull request. Any changes to these fields are ignored while the remaining changes are merged."
    const funcS = Helptextvalue.toString().includes(Helptextexpectedvalue);
    await io.assert.expectToBeTrue(funcS, "help text doesn't match");
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.HELPTEXT_CLOSE, 0);
    //IO-T30611 Verify collapse/expand functionality 
    await io.flowBuilder.click(selectors.integrationPagePO.COLLAPSE_OPTION);
    await io.flowBuilder.click(selectors.integrationPagePO.EXPAND_OPTION);
    await io.flowBuilder.click("//span[@class='rc-tree-select-tree-checkbox']");
    //IO-T31930 Verify chevron icon to open the options and add more fields
    await io.flowBuilder.click(selectors.integrationPagePO.CHEVRON_ICON);
    //IO-T31941 Verify the cross icon under text
    await io.flowBuilder.click(selectors.integrationPagePO.CLEAR_FIELDS);
    await io.flowBuilder.click("//input[@class='rc-tree-select-selection-search-input']");
    //IO-T31936 Verify the dropdown when user selects specific fields from parent child object values, instead of selecting all
    await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'integration');
    await io.flowBuilder.click("//span[@class='rc-tree-select-tree-checkbox']");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT)
    //IO-T31940  Verify the cross icon under clip
    await io.flowBuilder.click(selectors.integrationPagePO.CLOSE_INTEGRATION_NAME);
    await io.flowBuilder.click("//input[@class='rc-tree-select-selection-search-input']");
    await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'ssss');
    //IO-T32595 Verify the error if we add the field which is not present for ignore field
    await io.assert.verifyElementDisplayedByText(
        "Your search didn't return any matching results ",
        "Text is not displayed"
      );
      //IO-T31942 Verify the ignore guide
      const articleUrl = await page.getByText("Ignore guide").getAttribute("href");
      await io.assert.expectToBeValue(
        articleUrl,
        "https://docs.celigo.com/hc/en-us/articles/24882734892571",
        "Incorrect article URL"
      );
       // IO-T32593 Verify if the ignore configurations can be added from the revision routes on the Empty Integration with out any flows  
      await io.integrationPage.fill("//input[@class='rc-tree-select-selection-search-input']", 'integration');
      await io.flowBuilder.click("//span[@class='rc-tree-select-tree-checkbox']");
      await io.flowBuilder.loadingTime();   
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Naviagated to Home page ***")
      await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      await io.homePage.addStep("*** Waiting for home page Search Bar ***")

      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT32593');
      await io.homePage.addStep("*** Searching for TC_IOT32593 ***")
      await io.flowBuilder.clickByTextByIndex("TC_IOT32593",0);
      await io.homePage.addStep("*** Clicked on Integration TC_IOT32593 ***")
      await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
      await io.homePage.addStep("*** Clicked on Delete Source Integration ***")
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.homePage.addStep("*** Clicked on Delete Button ***")
  });
});
