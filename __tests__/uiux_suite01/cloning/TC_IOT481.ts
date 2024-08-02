import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT481 To verify all the modified changes in existing scripts are shown under ""scripts"" accordion(Action: Update) by comparing source and clone scripts`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T481 @Env-All C41600 To verify all the modified changes in existing scripts are shown under ""scripts"" accordion(Action: Update) by comparing source and clone scripts`, async ({
    io,
  }) => {
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.addStep("*** Waiting for home page Search Bar ***")
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - TC_IOT481_DND');
    await io.homePage.addStep("*** Searching for Clone - TC_IOT481_DND ***")
    await io.flowBuilder.clickByTextByIndex("Clone - TC_IOT481_DND",0);
    await io.homePage.addStep("*** Clicked on Integration Clone - TC_IOT481_DND ***")
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
    await io.flowBuilder.clickByTextByIndex("TC_IOT481_DND", 0);
    await io.integrationPage.fill(selectors.basePagePO.DESCRIPTION_INPUT, 'New pull');
    await io.homePage.addStep("*** Filled Description Input ***")
    await io.flowBuilder.click(selectors.integrationPagePO.NEXT);
    await io.homePage.addStep("*** Clicked on Next Button ***")
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
        "Scripts",
        "Scripts accordian is not Displayed"
      );
  });
});