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
        "Scripts",
        "Scripts accordian is not Displayed"
      );
  });
});