import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C29053 Account Dashboard - Completed flows - Verify When the Integration filter is opened, I can see the list of Integration and its child integrations (if the integration has child integration).", () => {
  test("C29053 Account Dashboard - Completed flows - Verify When the Integration filter is opened, I can see the list of Integration and its child integrations (if the integration has child integration).", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.goToMenu("account-dashboard");
      await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
      await io.homePage.waitForElementAttached('thead tr th');
      await io.homePage.clickByIndex('thead tr th button', 0);
      await io.assert.verifyElementDisplayedByText('All integrations', 'All integrations not visible');
      await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.INTEGRATION_LIST, 'The integration list is not visible');
  });
});