import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT480 To verify all the new scripts are shown under ""Scripts"" accordion(Action: New)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T480 @Env-All C41599 To verify all the new scripts are shown under ""Scripts"" accordion(Action: New)`, async ({
    io,
  }) => {
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.addStep("*** Waiting for home page Search Bar ***")
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - TC_IOT480_DND');
    await io.homePage.addStep("*** Searching for Clone - TC_IOT480_DND ***")
    await io.flowBuilder.clickByTextByIndex("Clone - TC_IOT480_DND",0);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
    await io.myAccountPage.clickByText("Import records into destination application");
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP AMAZON CONNECTION');
    await io.flowBuilder.clickByTextByIndex('HTTP AMAZON CONNECTION', 0);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C28638_Connection');
    await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_NAME, 'Name');
    await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_VALUE, 'TC_C28638');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("*** Navigated to home Page Url ***")
    await io.homePage.loadingTime();
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT480_DND');
    await io.homePage.addStep("*** Searching for TC_IOT480_DND ***")
    await io.flowBuilder.clickByTextByIndex("TC_IOT480_DND",0);
    await io.homePage.addStep("*** Clicked on Integration TC_IOT480_DND ***")
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Revisions", 0);
    await io.homePage.addStep("*** Clicked on Revisions Tab ***")
    await io.assert.verifyElementIsDisplayed(
        selectors.integrationPagePO.CREATE_PULL,
        "Element is not displayed properly"
      );
    await io.homePage.addStep("*** Checking if Create Pull visible  on DOM ***")
    await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
    await io.homePage.addStep("*** Clicked on Create Pull Button ***")
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Clone - TC_IOT480_DND", 0);
    await io.integrationPage.fill(selectors.basePagePO.DESCRIPTION_INPUT, 'New pull');
    await io.homePage.addStep("*** Filled Description Input ***")
    await io.flowBuilder.click(selectors.integrationPagePO.NEXT);
    await io.homePage.addStep("*** Clicked on Next Button ***")
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
        "0 conflicts",
        "conflicts is not Displayed"
      );
      await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
      await io.homePage.loadingTime();
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Navigated to home Page Url ***")
      await io.flowBuilder.loadingTime();
      await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - TC_IOT480_DND');
      await io.homePage.addStep("*** Searching for Clone - TC_IOT480_DND ***")
      await io.flowBuilder.clickByTextByIndex("Clone - TC_IOT480_DND",0);
      await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU)
      await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
      await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
      await io.homePage.click(selectors.basePagePO.DELETE);
  });
});